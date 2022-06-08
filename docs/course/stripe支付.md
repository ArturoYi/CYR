---
lang: zh-CN
title: stripe支付
description: stripe支付
---

# stripe支付

前端`flutter`
後端`spring boot`

## 前端出發支付

```dart
if (paymentMethod == 'visa') {
    //信用卡支付
    sc.makeFacilityVisaPayment(id);
  } else if (paymentMethod == 'alipay') {
    //支付寶支付
    sc.makeFacilityAlipayPayment(id);
   }
```

## 拆分信用卡支付

```dart
//設施使用信用卡支付
  void makeFacilityVisaPayment(int id) async {
    try {
      paymentIntentData =
          await createFacilityPaymentIntent(id, 'PAY_STRIPE_CARD');
      print(paymentIntentData);

      await Stripe.instance.initPaymentSheet(
        paymentSheetParameters: SetupPaymentSheetParameters(
          customFlow: false,
          paymentIntentClientSecret: paymentIntentData!['client_secret'],
          applePay: true,
          googlePay: true,
          style: ThemeMode.dark,
          merchantCountryCode: 'HK',
          merchantDisplayName: 'Facility Booking Fee',
        ),
      );

      await displayPaymentSheet();
      await confirmResultFromServer('facility');
    } on StripeException catch (e) {
      print(e.toString());
      handleFacilityStripeExecption(e);
    } catch (e) {
      print(e.toString());
    }
  }
```

1. 預支付信息應該
   
```dart
//闖入設施ID，支付方式
createFacilityPaymentIntent(int id, String channel)async{
    //主要代碼，try正常情況
    try{
        var response = await apiService.requestFacilityPaymentIntent(id, channel);
        return json.decode(response.data);
    }
}
```

2. 發送給號段獲取`client_secret`

請求路徑：` "/iris-base/api/facility/booking/pay-stripe"`
   
```dart
  //Stripe支付發送facility paymentIntent
  Future<dynamic> requestFacilityPaymentIntent(int id, String channel) async {
    return await BaseNetWork.instance.dio.post(Apis.FACILITY_PAY_STRIPE,
        data: {'booking_id': id, 'pay_type': channel});
  }
```

3. 後端處理前端獲取`client_secret`的請求

```java
@PostMapping("/booking/pay-stripe")
@AppLogin
public UnifyResponseVO bookingPayStripe(@LoginUid Long uid, @RequestBody FacilityBookingPayDTO form) {
    //三個參數：設施ID，用戶ID，支付方式
    PaymentIntent intent = this.bookingService.prepayByStripe(form.getBookingId(), uid, form.getPayType());
    return new UnifyResponseVO(new StripePaymentIntentResponse(intent.getId(), intent.getClientSecret()));
}
```

4. 開始處理支付業務

```java
/*關聯代碼
private final FacilityBookingService bookingService;
其繼承PayableService
*/
public class FacilityBookingService extends PayableService<FacilityBooking>{
    /**
     * stripe 支付三件套
     */
    public PaymentIntent prepayByStripe(Long parentBookingId, Long userId, PayType channel) {
        // 獲取該設施所有未支付的設施列表
        List<FacilityBooking> bookingList = bookingRepository.findByBookingIdAndStatus(parentBookingId, UNPAID);
        // 當前用戶發起支付的設施訂單
        FacilityBooking parentBooking = bookingList.stream()
                .filter(b -> b.getId().equals(parentBookingId)).findFirst()
                .orElseThrow(() -> new NotFoundException(4024));
        // 如果userid對應上就是這個訂單，否則不給支付，返回服務錯誤
        if (!parentBooking.getPayUserId().equals(userId)) {
            throw new ServerErrorException(3002);
        }
        // 獲取該用戶信息，IrisUser
        IrisUser user = this.userService.userOrException(userId);
        // 調用父類方法
        return super.prepayByStripe(bookingList, user, channel);
    }
}
```

4. 處理該設施的當前訂單

```java
public PaymentIntent prepayByStripe(List<T> payableList, IrisUser user, PayType channel) {
  //如果payableList中有支付中的账单。
  // 如果已支付的，就要将已支付的更改状态，如果未支付的，就将paymentIntent取消掉。
  List<T> actualPayableList = cancelOldPaymentIntent(payableList);
      if (actualPayableList.size() == 0) {
            return null;
        }

        //1. 计算总价，并且把总价转成成分
        BigDecimal totalPrices = actualPayableList.stream().map(PayableEntity::getTotalPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal totalPricesInCents = totalPrices.multiply(new BigDecimal(100));
        Map<String, String> map = new HashMap<String, String>();
        map.put("source", actualPayableList.get(0).getCurrentRelateType().toString());

        PaymentIntent intent = null;
        try {
            intent = stripeService.prePay(
                    totalPricesInCents.longValue(),
                    channel.convertToStripeChannel(), map);
        } catch (StripeException e) {
            throw new ServerErrorException(6000, simpleMessage(e));
        }
        for (T item : actualPayableList) {
            item.prePay(user, channel, intent);
        }
        this.saveAll(actualPayableList);
        this.sendStripeMessage(actualPayableList);
        return intent;
}
```

5. 避免支付中的賬單重複支付

```java
    public List<T> cancelOldPaymentIntent(List<T> payableList) {
      // 篩選出支付中的賬單payingPaymentIds
        List<String> payingPaymentIds = payableList.stream()
                .filter(item -> item.getStatus().equals(PAYING))
                .map(PayableEntity::getPaymentId)
                .collect(Collectors.toList());
        List<String> paidPaymentIds = new ArrayList<>();
        for (String paymentId : payingPaymentIds) {
            try {
                PaymentIntent intent = this.stripeService.retrieveOriginalPaymentIntent(paymentId);
                if (intent.getStatus().equals("succeeded")) {
                    this.notifySuccessFromStripe(paymentId);
                    paidPaymentIds.add(paymentId);
                } else {
                    intent.cancel();
                }
            } catch (StripeException e) {
                e.printStackTrace();
            }
        }

        return payableList.stream().filter(p -> !paidPaymentIds.contains(p.getPaymentId()))
                .collect(Collectors.toList());
    }
```

