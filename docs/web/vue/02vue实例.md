---
lang: zh-CN
title: vue实例起步
description: vue描述
---
# vue2.x

##  引入vue

[官网下载](https://cn.vuejs.org/v2/guide/installation.html):
 - 开发版本：包含完整的警告和调试模式
 - 生产版本：删除了警告，进行了压缩

## vue实例

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello World</title>
    <script src="../vue.js"></script>
    <!-- <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script> -->
</head>
<body>
    <div id="app">
        {{ message }}
    </div>
</body>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            message: 'Hello World'
        }
    })
</script>
</html>
```

上面就是一个完整的vue实例，每个 `Vue` 应用都是通过用 `Vue` 函数创建的。<br>
即`new Vue`。

**你可能会问(但是还不需要懂)**：
1. `el`:提供一个在页面上已存在的 `DOM` 元素作为 `Vue` 实例的挂载目标。可以是 `CSS` 选择器，也可以是一个 `HTMLElement` 实例。
2. `data`:`Vue `实例的数据对象。`Vue` 会递归地把 `data` 的 `property` 转换为 `getter/setter`，从而让 `data` 的 `property` 能够响应数据变化。(有印象，别深究。)

## 插值与指令

### v-if、v-else、v-show

**1. `v-if`用来判断是否加载`html`的`DOM`。**

```html
<!-- 主要代码 -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>v-if</title>
    <script src="../vue.js"></script>
</head>
<body>
    <div id="app">
        <p>请看下面：</p>
        <h2 v-if="seeing">YES</h2>
        <h2 v-else>NO</h2>
    </div>
</body>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            seeing: false,
        }
    })
</script>
</html>
```

上面例子表示了`v-if`通过判断`seeing`的`boolean`值决定了创建`‘YES’`或`‘NO’`的`h2`元素：

![](https://s2.loli.net/2022/01/07/7JZNMSI3aP4lFnb.png)

- `v-if`可以单独使用，同时也因为它是操作`DOM`元素，所以官方不建议频繁切换时使用`v-if`；
- `v-else`一般搭配在`v-if`一起使用，当`v-if`判断`boolean`值为`false`时才会创建`v-else`，还可以嵌套使用，类似`if-else-if`;

**2. `v-show`是调整`css`中`display`属性，`DOM`已经加载，只是`CSS`控制没有显示出来。**
核心代码：

```html
<h2 v-show="seeing">YES</h2>
```

```js
  seeing: false,
```

![](https://s2.loli.net/2022/01/07/bsaDd2G4N5ljXpT.png)

通过查看`DOM`元素可以发现`DOM`已经加载，但是通过`v-show`判断`seeing`为`false`时添加了`display: none;`属性，虽然不可见，但依然存在。

::: tip v-if和v-show的区别
- v-if： 判断是否加载，可以减轻服务器的压力，在需要时加载。
- v-show：调整css dispaly属性，可以使客户端操作更加流畅。
:::

### v-for

可以解决模板循环问题，即循环渲染一组data中的数组。常用与一系列的类似数据展示（列表等）。

`v-for` 指令需要使用 `item in items` 形式的特殊语法，其中 `items` 是源数据数组，而 `item` 则是被迭代的数组元素的别名。

对照下面模板核心写法简单理解就是：
- `items`:源数据数组名称。
- `item`:被迭代的数组里的元素名称。

模板核心写法：
```html
<ul>
  <li v-for="item in items" :key="item">
    {{ item }}
  </li>
</ul>
```
```js
var app=new Vue({
     el:'#app',
     data:{
         items:[20,23,18,65,32,19,54,56,41]
     }
})
```