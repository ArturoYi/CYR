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

`v-if`用来判断是否加载`html`的`DOM`。

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
        <h2 v-if="seeing">能看见吗</h2>
    </div>
</body>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            message: 'Hello World',
            seeing:true,
        }
    })
</script>
</html>
```