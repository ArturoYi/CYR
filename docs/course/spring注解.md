---
lang: zh-CN
title: spring
description: 12a
---

#  spring

## models

从狭义上讲，Model就是个key-value集合。数据会存放到Model对象中，当需要生成HTML的时候，模板引擎会根据名字来定位数据

```java
@Entity
//@Entity表示这是一个实体类，意思是指定对应数据库中的表
@Getter
@Setter
//代表get和set方法，不用重复书写
@NoArgsConstructor
//@NoArgsConstructor在类上使用，它可以提供一个无参构造器
@Table(name = "`iris_activity`")
// @Table指定对应的数据库的表名，优先级比@Entity更高
@Where(clause = "delete_time is null")
//查询时避开delete_time 字段为 null的数据
@SQLDelete(sql = "update iris_activity set delete_time = now() where id=?")
//假删除，删除时只添加delete_time
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
//@JsonNaming批注用于为序列化中的属性选择命名策略，覆盖默认设置
// 例如这里会将名为beanName的属性序列化为bean_name

//......
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
/*
@Id表示主键，必须有
@GeneratedValue：用主键自增的时候就用这个，如果不是自增就可以不用这个了，@GeneratedValue(strategy = GenerationType.IDENTITY)
*/
//......
@Enumerated(EnumType.STRING)
private ActivityType type;
//当我需要持久化一个枚举类字段的时候，就可以用@Enumerated来标注枚举类型
@OneToMany(mappedBy = "activity", cascade = CascadeType.ALL, orphanRemoval = true)
/*
一对多
mappedBy的值应该为一的一方的表名(即一对多中的一)
cascade属性： 指定级联操作的行为(可多选),CascadeType.ALL：级联所有操作
orphanRemoval=true配置表明删除无关联的数据。级联更新子结果集时此配置最关键
*/
@JsonIgnore
private List<ActivityEnroll> enrollments;
//此注解是类注解，作用是json序列化时将java bean中的一些属性忽略掉，序列化和反序列化都受影响
```

## VO层

VO层的存在就是方便前端获取数据，后端将前端的需要的数据做一个整合，打包成一个类

value object 值对象 / view object 表现层对象

1. 主要对应页面显示(web页面/swt、swing界面)的数据对象。

2. 可以和表对应，也可以不，这根据业务的需要。

```java
```

## DTO层

Data Transfer Object 数据传输对象

1. 用在需要跨进程或远程传输时，它不应该包含业务逻辑。
2. 比如一张表有100个字段，那么对应的PO就有100个属性(大多数情况下，DTO内的数据来自多个表)。但view层只需显示10个字段，没有必要把整个PO对象传递到client，这时我们就可以用只有这10个属性的DTO来传输数据到client，这样也不会暴露server端表结构。到达客户端以后，如果用这个对象来对应界面显示，那此时它的身份就转为VO。


## Controller

@Controller 注解是专门用于处理 Http 请求处理的，是以 MVC 为核心的设计思想的控制层。@RestController 则是 @Controller 的衍生注解。

```java
@RestController
//处理请求	@RestController	@Controller 的衍生注解
@RequestMapping("/cms/activity")
//路由请求	@RequestMapping	路由请求 可以设置各种操作方法
@PermissionModule(value = "活動管理")
//应该是权限吧
@Validated
// @Validated是只用Spring Validator校验机制使用
// @Validated：用在类型、方法和方法参数上。但不能用于成员属性（field）
// @Validated：提供分组功能，可以在参数验证时，根据不同的分组采用不同的验证机制
@RequiredArgsConstructor
/*
会生成一个包含常量，和标识了NotNull的变量的构造方法。生成的构造方法是私有的
*/ 
// ......

@GetMapping("/list")
// 路由请求	@GetMapping	GET 方法的路由
@GroupRequired
// 拦截非已有权限分组用户	用户加入分组后，再为分组分配权限，该用户才能访问权限接口
@PermissionMeta(value = "活動管理")
// 接口需要 PermissionMeta 注解来将其纳入权限系统，并且需要开启auth.enabled配置才能 在开启权限拦截。

@RequestParam(name = "condo_id") Long condoId,
@RequestParam(name = "status", defaultValue = "") String status,
// 请求参数	@RequestParam	处理问号后面的参数

Pageable pageable = PageRequest.of(page, count);
// 没有排序的分页,要在结果集中仅应用分页，我们将创建Pageable没有任何Sort信息的对象。
Page<Activity> result = activityService.search(condoId, status, type, happenStartTime, happenEndTime, keyword, pageable);
// 查询数据的结果集activityService为service层

List<ActivityListVO> list= result.getContent().stream().map(ActivityListVO::new).collect(Collectors.toList());
// 处理为list
/*
getContent()：返回此URL引用的资源的内容
stream().map()方法用于映射每个元素到对应的结果
语法糖ActivityListVO::new，每次返回一个new ActivityListVO
collect(Collectors.toList());转换成list集合
*/ 
return new UnifyResponseVO(PageUtil.build(result, list));
// 返回对象数据
```

## Service

```java
@Service
// @Service注解用于类上，标记当前类是一个service类，加上该注解会将当前类自动注入到spring容器中，不需要再在applicationContext.xml文件定义bean了。
public class ActivityService extends BaseService<Activity> {
// ......
public Page<Activity> search(Long condoId, String status, String type, Long happenStartTime, Long happenEndTime, String keyword, Pageable pageable) {

    Specification spec = this.getActivitySpecification(condoId, status, type, happenStartTime, happenEndTime, keyword);
    // 结合筛选条件筛选
    // @Nullable 注解可以使用在方法、属性、参数上，分别表示方法返回可以为空、属性值可以为空、参数值可以为空。
     return activityRepository.findAll(spec, pageable);
}
    // ......
        private Specification<Activity> getActivitySpecification(Long condoId, String status, String type, Long happenStartTime, Long happenEndTime, String keyword) {
        Specification spec = (Specification<Activity>) (root, criteriaQuery, criteriaBuilder) -> {
        // 我们可以简单的理解为，Specification构造的就是查询条件。对于JpaSpecificationExecutor，这个接口基本是围绕着Specification接口来定义的。
            /*
                *   root    ：Root接口，代表查询的根对象，可以通过root获取实体中的属性
                *   query   ：代表一个顶层查询对象，用来自定义查询
                *   cb      ：用来构建查询，此对象里有很多条件方法
            */ 
            List<Predicate> list = new ArrayList<Predicate>();
            // 初始化一个为10的空列表
            // <Predicate>不知道，这里认为Predicate接口主要用来判断一个参数是否符合要求
            list.add(criteriaBuilder.equal(root.get("condoId").as(Long.class), condoId));
            // condoId查询。equal为精准匹配
            SpecUtil.addLongPredicate(list, criteriaBuilder, root, "condoId", condoId);
            SpecUtil.addStringPredicate(list, criteriaBuilder, root, "type", type );
            // 同下,类似与精准查询吧应该
            /*
                public static void addStringInPredicate(List<Predicate> list, CriteriaBuilder criteriaBuilder,
                                          Root root, String tag, String content) {
             if (content.length() > 0) {
                List<String> types = Arrays.asList(content.split(","));
                // 使用该方法 可以将一个变长参数或者数组转换成List
                CriteriaBuilder.In<String> inClause = criteriaBuilder.in(root.get(tag).as(String.class));
                for (String title : types) {
                   inClause.value(title);
                 //通过循环，把数组中的每个值依次添加到in的查询规则中
                }
                list.add(inClause);
                //把查询结果添加进数组吧？
               }
              }
            */ 
            if (status.length() > 0) {
                ActivityStatus activityStatus = ActivityStatus.valueOf(status);
                switch (activityStatus) {
                    case BEFORE_ENROLL:
                        list.add(criteriaBuilder.greaterThan(root.get("enrollStartTime"), new Date()));
                        break;
                    case ENROLLING:
                        list.add(criteriaBuilder.lessThan(root.get("enrollStartTime"), new Date()));
                        // lessThan：小于某参数
                        list.add(criteriaBuilder.greaterThan(root.get("enrollEndTime"), new Date()));
                        // greaterThan：大于某参数，结束时间
                        break;
                    case BEFORE_HAPPEN:
                        list.add(criteriaBuilder.lessThan(root.get("enrollEndTime"), new Date()));
                        list.add(criteriaBuilder.greaterThan(root.get("happenTime"), new Date()));
                        break;
                    case HAPPENING:
                        list.add(criteriaBuilder.lessThan(root.get("happenTime"), new Date()));
                        list.add(criteriaBuilder.greaterThan(root.get("happenEndTime"), new Date()));
                        break;
                    case AFTER_HAPPEN:
                        list.add(criteriaBuilder.lessThan(root.get("happenEndTime"), new Date()));
                        break;
                }
            }
            if (happenStartTime > 0 && happenEndTime > 0) {
                list.add(criteriaBuilder.greaterThan(root.get("happenTime"), new Date(happenStartTime)));
                list.add(criteriaBuilder.lessThan(root.get("happenTime"), new Date(happenEndTime)));
            }
            if (keyword.length() > 0) {
                list.add(criteriaBuilder.like(root.get("name"), "%" + keyword + "%"));
                // like：模糊查询
            }

            Predicate[] p = new Predicate[list.size()];
            // Predicate：
            /*
            Predicate.BooleanOperator getOperator();
            // 
            */ 
            criteriaQuery.where(criteriaBuilder.and(list.toArray(p)));
            // criteriaQuery.where，条件查询
            // and()，拼接筛选条件
            // toArray() 方法将 Arraylist 对象转换为数组。
            criteriaQuery.orderBy(criteriaBuilder.desc(root.get("createTime")));
            return criteriaQuery.getRestriction();
            // getRestriction()得到所有的查询条件，还是已经是查询结果
        };

        return spec;
    }

    // ......
}
```