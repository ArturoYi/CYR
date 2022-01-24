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


```js

```



