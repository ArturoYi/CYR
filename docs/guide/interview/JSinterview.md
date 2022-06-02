---
# lang: zh-CN
title: JS面试
lastUpdated: true
prev: true
next: true
date: 2022-01-02
tags:
  - 面试
  - 其他
---

<!-- <style>
table
{
    margin: auto;
}
img {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
}
</style> -->
# JS面试

> **不分顺序，忠告：JS的面试题很多，现在每个面试官都试图问出不一样的问题，但知识点都是接近的，所以应该花更多时间在学习上，祝好运**。

## 1.延迟加载JS的方式有哪些

重点：`async`、`defer`

图解说明：

![LpwDYt.jpg](https://s6.jpg.cm/2022/01/24/LpwDYt.jpg)

1. 正常情况下的`script`脚本执行：

正常情况下，浏览器会顺序执行代码，遇到`script`脚本时，HTML会停止解析，先下载`script`脚本，然后执行它（一般是我们外部引入的脚本）,然后再继续解析HTML。下面代码：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- 模拟文件 -->
  <script src="./11.js" defer="defer"></script>
</head>
<body>
  <div><p></p></div>
</body>
</html>
```

![LpoRAX.jpg](https://s6.jpg.cm/2022/01/24/LpoRAX.jpg)

2. defaer属性

`defaer`在解析页面时会同时下载脚本，加载完页面后再执行脚本。

重点：在HTML解析完后，`defaer`引入的脚本(JS)之间也是顺序执行的。

![Lpo6fS.jpg](https://s6.jpg.cm/2022/01/24/Lpo6fS.jpg)

3. async属性

`asyns`在解析页面的时候会同步下载脚本，但执行时会暂停解析HTML。

重点：`async`和HTML同步解析，但不是顺序执行脚本（JS）,谁先加载完谁先执行。

![LpoVZW.jpg](https://s6.jpg.cm/2022/01/24/LpoVZW.jpg)

4. 其它方法

- 使用jQuery的getScript()方法
- 动态创建DOM方式
- 使用setTimeout延迟方法
- 让JS最后加载（JS放在文件页面底部）

## 2.js的数据类型和NaN

1. 基本类型

`string`,`number`,`boolean`,`undefined`,`null`,`symbol`

2. 引用类型

`object`

3. NaN

`NaN`是一个数值类型，但不是一个具体的数据

## 3.null 和 undefined

我的理解：两者都表示`无`但：

- `undefined`表示未定义（无的初始值）,转换为数值时为NaN。
- `null`表示空（无的对象或空对象指针），转化为数值时为`0`(问题所在)。


上面差不多了，更多：

- `null` 和 `undefined` 的值相等，但类型不等：`undefined`的类型(`typeof`)是`undefined`；`null`的类型(`typeof`)是`object`。
- 先有`null`后有`undefined`,为了弥补null有时会被隐式转换为0的坑。

## 4.==和===有什么不同？

`==`：比较两个值是否相等。

```js
string == number || boolean || number ....都会隐式转换。
// 通过ValueOf()方法隐式（默认自动执行，不会显示）转换，所以不推荐使用。
```

`===`：比较值和数据类型是否相等。

## 5.宏任务和微任务（Event Loop/事件循环 ）

1. js是单线程语言。
2. 同一个时间只能做一件事，js执行顺序：同步执行-->事件循环。
2. 事件循环包括：宏任务、微任务

4. 宏任务：setTimeout...
5. 微任务：promise.then...

6. 重要：要执行宏任务前提是清空`当前`所有微任务。

## 6.作用域

拓展到ES6：

1. ES5只有函数有作用域，var为全局变量，ES6中有了let变量（只在当前作用域有效）和const常量（一旦声明，常量的值就不能改变）。
2. 作用域链（作用域的集合）：内部可以访问外部，但是外部不能访问内部的变量。

- 注意：如果内部有，优先使用内部，内部没有则查找外部。

3. 注意声明变量是用var还是没有写（window.）
4. 注意：JS有变量提升机制（变量悬挂声明）
5. 优先级：声明变量（有值） > 声明函数 > 参数 > 变量提升
6. 注意：我发现，参数 > 声明变量（即使有值），所以上面应该是互相不同的，不是简单的上下级关系。即：

- 声明变量（有值） > 声明函数
- 声明函数 > 参数
- 参数 > 声明变量（有值）
- 三者 > 变量提升

```js
   function a(){
     var b = 1;
     function c(){
       console.log(b);//undefined
      //  由于下面有var b，导致变量提升。
      //  类似于：
      //  var b;
      //  b = 2;
      //  如果去掉下面var b = 2;上面会输出父级var b = 1;
       var b = 2;
       console.log(b);//2
     }
     c()
     console.log(b)//1
   }
   a();
   //  思考，如果给a传参数优先级怎么样
```

## 7.JS对象（new发生了上面？）

对象注意点：

1. 对象通过new操作符构建出来，所以对象之间不相等（除了引用外）；
2. 注意：对象引用类型（共同一个地址）；
3. 对象的key都是字符串类型；
4. 对象找属性或方法

先在对象本身找 ————> 构造函数中找 ————> 对象原型中找 ————> 构造函数原型中找

我们学习一下：

1. 什么是prototype、__proto__与constructor？

例子开始：


<CodeGroup>
  <CodeGroupItem title="ES5" active>

```js:no-line-numbers
function Foo() {...};
let f1 = new Foo();
```

  </CodeGroupItem>

  <CodeGroupItem title="ES6">

```js:no-line-numbers
class Foo(){...};
let f1 = new Foo();
```

  </CodeGroupItem>
</CodeGroup>

以上代码表示创建一个构造函数Foo()，并用new关键字实例化该构造函数得到一个实例化对象f1。这里稍微补充一下new操作符将函数作为构造器进行调用时的过程：函数被调用，然后新创建一个对象，并且形成了函数的上下文（也就是此时函数内部的this是指向该新创建的对象，这意味着我们可以在构造器函数内部通过this参数初始化值），最后返回该新对象的引用

下图别纠结额，简单看看，后面一步步剖析：

![](https://s2.loli.net/2022/01/25/wrAWi8gkNh3Havd.png)

说明：

右下角为图例，红色箭头表示__proto__属性指向、绿色箭头表示prototype属性的指向、棕色实线箭头表示本身具有的constructor属性的指向，棕色虚线箭头表示继承而来的constructor属性的指向；蓝色方块表示对象，浅绿色方块表示函数（这里为了更好看清，Foo()仅代表是函数，并不是指执行函数Foo后得到的结果，图中的其他函数同理）。图的中间部分即为它们之间的联系，图的最左边即为例子代码。

1. __ proto __ 属性（原型）

我们牢牢记住两点：

1. ①__proto__和constructor属性是对象所独有的；
2. prototype属性是函数所独有的。但是由于JS中函数也是一种对象，所以函数也拥有__proto__和constructor属性,这点是致使我们产生困惑的很大原因之一。

![](https://s2.loli.net/2022/01/25/vVsFScDaEryJlgM.png)

根据上图总结：

1. 它是`对象所独有`的，可以看到__proto__属性都是由一个对象指向一个对象，即指向它们的原型对象（也可以理解为父对象），，那么这个属性的作用是什么呢？它的作用就是当访问一个对象的属性时，如果该对象内部不存在这个属性，那么就会去它的__proto__属性所指向的那个对象（可以理解为父对象）里找，如果父对象也不存在这个属性，则继续往父对象的__proto__属性所指向的那个对象（可以理解为爷爷对象）里找，如果还没找到，则继续往上找…直到原型链顶端null（可以理解为原始人。。。），再往上找就相当于在null上取值，会报错（可以理解为，再往上就已经不是“人”的范畴了，找不到了，到此结束，null为原型链的终点），由以上这种通过__proto__属性来连接对象直到null的一条链即为我们所谓的原型链。

我们平时调用的字符串方法、数组方法、对象方法、函数方法等都是靠__proto__继承而来的。

2. prototype属性（原型）

![](https://s2.loli.net/2022/01/25/niXe41DhUfdWk8g.png)

prototype属性，别忘了一点，就是我们前面提到要牢记的两点中的第二点，它是函数所独有的，它是从一个函数指向一个对象。它的含义是函数的原型对象，也就是这个函数（其实所有函数都可以作为构造函数）所创建的实例的原型对象，由此可知：f1.__proto__ === Foo.prototype，它们两个完全一样。那prototype属性的作用又是什么呢？它的作用就是包含可以由特定类型的所有实例共享的属性和方法，也就是让该函数所实例化的对象们都可以找到公用的属性和方法。任何函数在创建的时候，其实会默认同时创建该函数的prototype对象。

3. constructor属性（构造器）

![](https://s2.loli.net/2022/01/25/q8LbzI2VapCKUSw.png)

constructor属性也是对象才拥有的，它是从一个对象指向一个函数，含义就是指向该对象的构造函数，每个对象都有构造函数（本身拥有或继承而来，继承而来的要结合__proto__属性查看会更清楚点，如下图所示），从上图中可以看出Function这个对象比较特殊，它的构造函数就是它自己（因为Function可以看成是一个函数，也可以是一个对象），所有函数和对象最终都是由Function构造函数得来，所以constructor属性的终点就是Function这个函数。

“每个对象都有构造函数”这句话。这里的意思是每个对象都可以找到其对应的constructor，因为创建对象的前提是需要有constructor，而这个constructor可能是对象自己本身显式定义的或者通过__proto__在原型链中找到的。而单从constructor这个属性来讲，只有prototype对象才有。每个函数在创建的时候，JS会同时创建一个该函数对应的prototype对象，而函数创建的对象.__proto__ === 该函数.prototype，该函数.prototype.constructor===该函数本身，故通过函数创建的对象即使自己没有constructor属性，它也能通过__proto__找到对应的constructor，所以任何对象最终都可以找到其构造函数（null如果当成对象的话，将null除外）。如下：

![](https://s2.loli.net/2022/01/25/q8LbzI2VapCKUSw.png)

总结：

1. 我们需要牢记两点：①__proto__和constructor属性是对象所独有的；② prototype属性是函数所独有的，因为函数也是一种对象，所以函数也拥有__proto__和constructor属性。
2. __proto__属性的作用就是当访问一个对象的属性时，如果该对象内部不存在这个属性，那么就会去它的__proto__属性所指向的那个对象（父对象）里找，一直找，直到__proto__属性的终点null，再往上找就相当于在null上取值，会报错。通过__proto__属性将对象连接起来的这条链路即我们所谓的原型链。
3. prototype属性的作用就是让该函数所实例化的对象们都可以找到公用的属性和方法，即f1.__proto__ === Foo.prototype。
4. constructor属性的含义就是指向该对象的构造函数，所有函数（此时看成对象了）最终的构造函数都指向Function。

实现继承的例子：

```js
// 1
```

## 8.给定一个数组，去除重复元素

给定下面数组：

```js
let arr = [1,2,3,1,2,1,1,4,5,6,7,8,7,6]
```

- 方法一、Array.from与set（ES6）去重

```js
function unique(arr){
  if(!Array.isArray(arr)){
    return
  }
  return Array.from(new Set(arr))
}
 //new 一个 Set 对象，将数组作为参数传递进去
  //Set对象的数据不会重复
  //自动实现去重，Array.from() 将其转化为数组
  // 注意这个方法不能去除空对象（''）
```

- 方法二、双重for循环去重

```js
Array.prototype.unique = function(){
  let newArray = [];  //要返回的新数组
  let isRepeat; //当前元素是否重复
  let oldArrayLength = this.length;
  for(let i = 0;i<oldArrayLength;i++){
    isRepeat = false;
    for(let j = i+1;j<oldArrayLength;j++){
      if(this[i]==this[j]){
        isRepeat = true;
        break;
      }
    }
    if(!isRepeat){
      newArray.push(this[i]);
    }
  }
  return newArray;
}
```

- 方法三、indexOf检测元素

```js
Array.prototype.unique = function(){
  return this.filter((item,index)=>{
    return this.indexOf(item) === index;
  })
}
//filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
//数组中每个元素的位置(index)和其第一次出现的下标(indexof)对应,如果不对应，说明是重复元素
```

## 9.事件冒泡和事件委托

1. 事件冒泡和事件捕获

 - 事件冒泡：当前元素触发的事件目标一级一级完上传递，依次触发，知道document为止。（子级事件会传递给父级）
 - 事件捕获：从document开始触发事件，一级一级往下传递，直到真正事件目标为止。（在父级捕获子级的事件）
 - 事件委托：通过监听父元素，来给不同子元素绑定事件，减少监听次数，从而提升速度。

 2. 阻止事件冒泡

 ```js
 // 阻止冒泡
    event.stopPropagation();
```

3. 例子

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <style type="text/css">
        #box1 { width: 300px; height: 300px; background: blueviolet; }
        #box2 { width: 200px; height: 200px; background: aquamarine; }
        #box3 { width: 100px; height: 100px; background: tomato; }
        div { overflow: hidden; margin: 50px auto; }
    </style>
    <body>
        <div id="box1">
            <div id="box2">
                <div id="box3"></div>
            </div>
        </div>
        <script>
            function sayBox3() {
                console.log('你点了最里面的box');
            }
            function sayBox2() {
                console.log('你点了最中间的box');
            }
            function sayBox1() {
                console.log('你点了最外面的box');
            }
            // 事件监听，第三个参数是布尔值，默认false，false是事件冒泡，true是事件捕获
            document.getElementById('box3').addEventListener('click', sayBox3, false);
            document.getElementById('box2').addEventListener('click', sayBox2, false);
            document.getElementById('box1').addEventListener('click', sayBox1, false);

        </script>
    </body>
</html>
```

## 10.手写Promise

1. Promise:用来操作异步信息。
2. Promise对象不受外界影响，有三种状态：
 - pending:初始状态，不是成功或失败，通常是你不做任何处理的时候。
 - fulfilled:操作成功完成。
 - rejected:操作失败。

 ```js
 //创建一个Promise实例
 let promise = new Promise((resolve,reject)=>{
   //异步处理
  // 处理结束后、调用resolve（解析） 或 reject（拒绝）
 })
 ```

3. Promise.all

Promise.all接受多个 Promise 任务同时执行，如果全部成功执行，则以数组的方式返回所有 Promise 任务的执行结果。 `如果有一个 Promise 任务 rejected，则只返回 rejected 任务的结果`。

```js
const p = Promise.all([p1, p2, p3]);
//p1,p2,p3都是Promise实例
```

- （1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
- （2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。
- （3）如果作为参数的 Promise 实例，自己定义了catch方法，那么它一旦被rejected，并不会触发Promise.all()的catch方法（返回一个新的Promise）。如果其没有自己的catch方法，就会调用Promise.all()的catch方法。


4. 手写Promise.all

```js
Promise._all = function(arr){
  return new Promise((resolve,reject)=>{
    if(!Array.isArray(arr)){
      return reject(new Error('非数组'))
    }
    const result = []
    let counter = 0  //设置一个计数器
    for(let i=0;i<arr.length;i++){
      arr[i].then((data)=>{
        result[i] = data
        counter++
        if(counter === arr.length){
          resolve(result)
        }
      },reject)
    }
  })
}

Promise.all([p1,p2,p3])
```

## 11.this指向

1. 全局环境输出this，指向全局对象（Windows）。

2. 全局函数中的this，指向全局对象。

3. 内部函数中的this，指向全局对象。

4. 方法中的this，指向调用方法的对象。

5. 事件中的this，指向触发事件的DOM对象。

6. 构造函数中的this，指向new创建的对象。

7. 箭头函数中的this，指向函数上下文的this。

- 箭头函数严格来说没有this
- 普通函数谁调用就指向谁

8. 使用闭包，var获取dom的索引。

## 12.call,apply,bind

先说结论：

作用都是改变函数执行上下文的this指向。
call 、bind 、 apply 这三个函数的第一个参数都是 this 的指向对象，主要区别在第二参数；


- 说明：下面`xxx`为第一个参数，即`this.xxx`的对象。

| 方法   |      参数      |  返回值 |
|----------|:-------------:|------:|
| call() | call(xxx,'1','1'),参数逐个传递  | 立即执行，返回结果 |
| apply() |   apply(xxx,['1','1']),参数传递一个数组    |   立即执行，返回结果 |
| bind() | bind(xxx,'1','1')(),参数逐个传递 |    bind 返回的是一个新的函数，你必须调用它才会被执行 |



## 13. 闭包

概念：函数嵌套函数，内部函数就是闭包

- 注：要理解闭包要先理解作用域
- 正常情况下：函数执行完会被销毁
- 闭包特点：内部函数没有执行完成，变量不会销毁。


## 14.对象拷贝（深浅拷贝）

- 原始类型：数值、字符串、布尔、null、undefined
- 引用类型：对象（Object）

- 栈内存：存储原始类型
- 堆内存：存储引用类型

深拷贝和浅拷贝是只针对Object和Array这样的引用数据类型的。

----------------------------------------------------

浅拷贝：

| 方法   |      返回值      |  说明 |
|:----------:|:-------------:|:------:|
| Object.assign() | 返回目标对象  | 拷贝的是对象的属性的引用，而不是对象本身 |
| Array.prototype.concat() |   不修改原数组，只会返回一个浅复制了原数组中的元素的一个新数组    |  修改新对象会改到原对象  |
| Array.prototype.slice() | 不修改原数组，只会返回一个浅复制了原数组中的元素的一个新数组 |   修改新对象会改到原对象  |


深拷贝：

| 方法   |      返回值      |  说明 |
|----------|:-------------:|------:|
| JSON.parse(JSON.stringify()) | 返回新对象  | ,但不能处理函数 |
| 手写递归方法 |       |   遍历对象、数组直到里边都是基本数据类型，然后再去复制，就是深度拷贝 |
| 一些函数库 |  |   使用别人写好的 |

## 15. 防抖和节流

1. 防抖：对于频繁触发，只要最后一次触发

```js
let t = null;
function(){
  if(t !== bull){
    //频繁触发时去掉上一次触发，重新计时
    clearTimeout(t)
  }
  t = setTimeout(()=>{
    //要实现防抖的操作
  },500)
}
```

2. 节流：控制执行次数,频繁操作时减少次数

```js
let flag = true;
function(){
  if(flag){
    setTimeout(()=>{
      //执行
      flag = true;
    },500)
  }
}
```

## 16. 原型

1. 每一个对象都有它的原型对象，它可以使用自己原型对象上的所有属性和方法

2. 获取原型的方法
- 1. 通过对象的_proto_获取
- 2. 通过构造函数的prototype属性拿到原型

3. 原型对象的作用：比如统一时间格式，可以在Date.prototype在原型上定义原型方法。

## 17.类与继承

```js
// ES6
class Cat(name,age){

}

let cat = new Cat('喵喵','吃鱼')
```

- 使用场景：管理员和普通用户都继承自用户类，但两者还有自己的权限

#### 17.2. 原型链继承和原型链

#### 17.3 构造继承

#### 17.4 借用构造函数继承

#### 17.5 组合继承

## 18. 状态码（200、400等）

1. 100：信息性状态码，原因：接收的请求正在处理

| 状态码      | 说明 | 
| :------:        |   :------: |
| 100      | 表明目前为止，所有的请求内容都是可行的，客户端应该继续请求，如果完成，则忽略它。       | 
| 101   | 该状态码是响应客户端Upgrade标头发送的，并且指示服务器也正在切换协议。        | 
| 103   | 主要用于与Link链接头一起使用，以允许用户代理在服务器仍在准备响应时开始预加载资源。        | 

2. 200：请求成功状态码，请求正常处理完毕

- GET：资源已被提取并在消息正文中传输
- HEAD：实体标头位于消息正文中
- POST：描述动作结果的资源在消息体中传输
TRACE：消息正文包含服务器收到的请求信息。（方法不安全，一般不用)

| 状态码      | 说明 | 
| :------:        |   :------: |
| 201      | 请求已经成功，并因此创建了一个新的资源。这通常是在PUT或POST请求之后发送的响应。       | 
| 202   |请求已经接收到，但是没有响应，没有结果。意味着不会有一个异步的响应去表明当前请求的结果，预期另外的进程和服务去处理请求，或者批处理。        | 
| 204   | 服务器成功处理了请求，但不需要返回任何实体内容，并且希望返回更新了的元信息。遇到复杂请求时候，浏览器会发送一个OPTION方法进行预处理返回响应。        | 
| 205   | 服务器已经成功处理了请求，但是没有返回任何内容。与204响应不同，返回此状态码的响应要求请求者重置文档视图。        | 

3. 300：重定向状态码，需要进行附加操作以完成请求

| 状态码      | 说明 | 
| :------:        |   :------: |
| 301      | 被请求的资源已永久移动到新位置，并且将来任何对此资源的引用都应该使用响应返回的若干个URI之一。       | 
| 302   |请求的资源现在临时从不同的URI响应请求。由于这样的重定向是临时的，客户端应当继续向原有地址发送以后的请求。只有在Cache-Control或Expires中进行了指定的情况下，这个响应才是可缓存的。请求的资源现在临时从不同的URI响应请求。由于这样的重定向是临时的，客户端应当继续向原有地址发送以后的请求。只有在Cache-Control或Expires中进行了指定的情况下，这个响应才是可缓存的。      | 
| 303   | 对当前的请求的响应可以在另一个URI上被找到，而且客户端应该采用GET的方式访问那个链接。这个方法的存在主要是为了允许由脚本激活的POST请求输出重定向到一个新的资源。       | 
| 304   | 如果客户端发送了一个带条件的 GET 请求且该请求已被允许，而文档的内容（自上次访问以来或者根据请求的条件）并没有改变，则服务器应当返回这个状态码。304 响应禁止包含消息体，因此始终以消息头后的第一个空行结尾。请求的时候一般结合If-Modified-Since头部使用。        |
| 307   | 307的意义如上302。与历史上302不同的是在重新发出原始请求时不允许更改请求方法。比如，使用POST请求始终就该用POST请求。        |

4. 400：客户端错误，服务器无法处理请求

| 状态码      | 说明 | 
| :------:        |   :------: |
| 401      |    这意味着你的登录凭证无效。服务器不知道你是谁，这时，你需要尝试重新登录。    | 
| 403      |    服务器已经理解请求，但是拒绝执行它。与401不同，403知道是你登录了，但是还是拒绝了你。    | 
| 404      |    说明服务器端无法找到所请求的资源。返回该响应的链接通常称为坏链（broken link）或死链（dead link），它们会导向链接出错处理    | 
| 405      |    表明服务器禁止了使用当前 HTTP 方法的请求。需要注意的是，GET 与 HEAD 两个方法不得被禁止，当然也不得返回状态码 405。    | 
| 406      |    表示服务器端不支持 Accept、Accept-Charset、Accept-Encoding、 Accept-Language header 所要求的。   | 
| 409      |    表示请求与服务器端目标资源的当前状态相冲突。    | 
| 410      |    被请求的资源在服务器上已经不再可用，而且没有任何已知的转发地址。    | 

5. 500：服务器错误，服务器处理请求出错

| 状态码      | 说明 | 
| :------:        |   :------: |
| 500      |    表示所请求的服务器遇到意外的情况并阻止其执行请求。    | 
| 501      |    表示request header 里的 method 或 Content-* 时不被服务器支持，无法被处理。另，服务器必须支持的方法（即不会返回这个状态码的方法）只有 GET 和 HEAD。501 响应默认是可缓存的。    | 
| 502      |    表示作为网关或代理角色的服务器，从上游服务器（如tomcat、php-fpm）中接收到的响应是无效的。    | 
| 503      |    表示服务器尚未处于可以接受请求的状态。    | 
| 504      |    网关超时，服务器未能快速的做出反应。    | 

## 19. 输入URL到页面显示的过程？

先简单来说有下面过程：

1. DNS解析：将域名解析成IP地址
2. TCP连接：TCP三次握手
3. 发送HTTP请求
4. 服务器处理请求并返回HTTP报文
5. 浏览器解析渲染页面
6. 断开连接：TCP四次握手

展开：

## 20. ES6新特性

1. let和const

let和const都是用于命名局部变量，都是块级作用域；

- let:let 关键词声明的变量不具备变量提升
- const:const 在声明时必须被赋值，否则会报错,一旦声明就不可再进行修改。(对象的值可以修改)

2. 模板字符串

- ${}来写入需要引用到的JS，他会被编译

3. 箭头函数

需要注意的点：

- 不需要用关键字function来定义函数；
- 一般情况下可以省略return；
- 在箭头函数内部，this并不会跟其他函数一样指向调用它的对象，而是继承上下文的this指向的对象。

4. Spreas/Reat操作符

- Rest运算符用于获取函数调用时传入的参数
- Spread运算符用于数组的构造，析构，以及在函数调用时使用数组填充参数列表

5. 二进制和八进制字面量

- ES6支持二进制和八进制的字面量，通过在数字前面增加0o或者0O可以将数字转换为八进制。

6. 允许在对象中使用super方法

super方法应该都不陌生，在java中用来代表调用父类的构造函数。由于js不是面向对象语言，所以也没有继承这以说法。但是在ES6中，可以通过调用setPrototypeOf()方法来设置一个对象的prototype对象，与面向对象语言中的继承有相似之处，所以也可以理解成这是js中用来实现继承的方法。

7. 迭代器iterator、for...of和for...in

建议先去了解一下iterator，作用如下：

- 为各种数据提供统一的，简便的访问接口
- 使数据结构的成员能按某种次序排列
- 主要供for...of用

- for…in 语句以原始插入顺序迭代对象的可枚举属性，简单理解就是for...in是用来循环遍历属性，遍历出的是自身和原型上的可枚举非symbol属性，但是遍历不一定按照顺序（tips：for...in在ES5中就已经出现了）
- for…of 语句遍历可迭代对象定义要迭代的数据，也就是说，for...of只可以循环可迭代对象的可迭代属性，不可迭代属性在循环中被忽略了。（tips：for...of是ES6才提出来的）

8. Module

在ES6的module之前，比较流行的模块加载方案有:CommonJS和AMD，前者用于服务器（node)，后者用于浏览器。

区别：

- CommondJS和AMD是运行时加载的。
- module是编译时加载的。
- CommondJS输出的是值的复制，而ES6输出的是值的引用

其中命令有：export、import 、export default

- export用于对外输出本模块（一个文件可以理解为一个模块）变量的接口，通过export方式导出，在导入时要加{ }，export default则不需要
- import用于在一个模块中加载另一个含有export接口的模块。
- 使用export default命令，为模块指定默认输出，这样就不需要知道所要加载模块的变量名（可自定义引用）。