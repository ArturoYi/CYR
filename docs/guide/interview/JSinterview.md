---
# lang: zh-CN
title: JS面试集锦
lastUpdated: true
prev: true
next: true
date: 2022-01-02
tags:
  - 面试
  - 其他
---

# JS面试

不分顺序

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

## 5.宏任务和微任务（Event Loop ）

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