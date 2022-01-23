---
lang: zh-CN
title: vue指令
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

完整例子（循环普通数组）

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <!-- 此为vue.js外链，可更换 -->
  <script src="https://unpkg.com/vue/dist/vue.js"></script>
</head>

<body>
  <h1>v-for指令用法</h1>
  <hr>
  <div id="app">
    数组：items:[20,23,18,65,32,19,54,56,41]
    <ul>
      <li v-for="(item,i) in items">
        items 第 {{i}} 项 —— {{item}}
      </li>
    </ul>
  </div>

  <script type="text/javascript">
    var app = new Vue({
      el: '#app',
      data: {
        items: [20, 23, 18, 65, 32, 19, 54, 56, 41]
      }
    })
  </script>
</body>

</html>
```

使用`v-for`还可以循环输出对象，对象数组等。

```注意到上面例子的i字段了吗？```。再进一步，看下面例子：

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="https://unpkg.com/vue/dist/vue.js"></script>
</head>

<body>
  <h1>v-for指令用法</h1>
  <hr>
  <div id="app">
    <ul>
      <li v-for="(val,key,i) in user">
        值是{{val}}——————键是{{key}}————索引是{{i}}
      </li>
    </ul>
  </div>

  <script type="text/javascript">
    var app = new Vue({
      el: '#app',
      data: {
        user:{
          id:1,
          name:'大哥',
          gender:'男'
        }
      }
    })
  </script>
</body>

</html>
```

上面在遍历`对象`身上的键值的时候，除了有（val,key）,在第三个位置还有一个索引值，类似：(val,key,i)。

 注意：

- v-for循环的时候，key属性只能使用number或String。
- key在使用的时候，必须使用v-bind属性绑定的形式，指定key的值。
- 在组件中使用v-for循环的时候，或者在一些特殊情况中，如果v-for有问题，必须在使用v-for的同时，指定唯一的 字符串/数字 类型 :key值。

### v-text 、v-html

使用`{{ }}`展示数据这种情况是有弊端的，就是当我们网速很慢或者`javascript`出错时，会暴露我们的`{{}}`里面的属性。`Vue`给我们提供的`v-text`,就是解决这个问题的。如果在`javascript`中写有`html`标签，用`v-text`是输出不出来的，这时候我们就需要用`v-html`标签了。 

下面是

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="https://unpkg.com/vue/dist/vue.js"></script>
</head>
<body>
  <div id="app">
    <div id="div1"></div>
    <br>
    <div id="div2"></div>
  </div>
  <hr>
  <div id="vueapp">
    <div v-html="mes1" id="div3"></div>
    <br>
    <div v-text="mes2" id="div4"></div>
  </div>
</body>
<script>
  //传统js的innerText和innerHTML
  window.onload = function () {//加载时候出发的函数
    document.getElementById("div1").innerText = "<h1>hello</h1>"//不会解析
    document.getElementById("div2").innerHTML = "<h1>hello</h1>"//会被解析
  }
  /*vue新式innerText和innerHTML*/
  new Vue({
    el: "#vueapp",
    data: {
      mes1: "<h1>hello</h1>",
      mes2: "<h1>hello</h1>"
    }
  })
</script>
</html>
```

总结：
- `v-text`和`{{}}`表达式渲染数据，不解析标签。
- ` v-html`不仅可以渲染数据，而且可以解析标签。　

::: danger 注意
在生产环境中动态渲染`HTML`是非常危险的，因为容易导致`XSS`攻击。所以只能在可信的内容上使用`v-html`，永远不要在用户提交和可操作的网页上使用。
:::

### v-on

`v-on` 就是监听事件，可以用`v-on`指令监听`DOM`事件来触发一些`javascript`代码。

加减案例：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="https://unpkg.com/vue/dist/vue.js"></script>
</head>
<body>
  <div id="app">
    {{count}}<br />
    <button v-on:click="jia">加</button>
    <button v-on:click="jian">减</button>
  </div>
</body>
<script>
  new Vue({
    el: "#app",
    data: {
      count: 0,
    },
    methods: {
      jia() {
        this.count++;
      },
      jian() {
        this.count--;
      },
    },
  })
</script>
</html>
```

`v-on`还提供了一个简单写法,就是用@代替：

```js
v-on:click = jia //方法也可以写成jia()
//等同于
@click = jia //方法也可以写成jia()
```
其实，除了绑定`click`之外，我们还可以绑定其它事件，比如键盘回车事件`v-on:keyup.enter`:

```html
<input type="text" v-on:keyup.enter="onEnter">
```

### v-bind

`v-bind`用于绑定数据和元素属性(动态绑定)

例如：

1. 绑定a标签的href属性

```html
<div class="app">
    <a v-bind:href="url">百度一下</a>
</div>  
```

```js
var app = new Vue({
    el:'.app',
    data:{
        url:"https://www.baidu.com",
    }
});
```

上面例子使用`v-bind`绑定了`a`标签的`href`属性，当`a`标签被点击时，会根据对应vue中的对应的url数据进行跳转到`https://www.baidu.com`

2. 不光是`href`属性可以被`v-bind`指令绑定，大部分属性都可以被绑定

下面例子绑定`class`也是可以的：

```html
<a v-bind:href="url" v-bind:class="klass">click me</a>
```

还可以用于绑定样式等等。

由于使用频繁，通常将`v-bind:属性名=" "`的格式简写成`:属性名=" "`:

```js
<a v-bind:class="{active:isActive}">click me</a>
// 等同于
<a :class="{active:isActive}">click me</a>
```

同时，上面例子也说明了，`v-bind`还可以绑定一个对象。用法很多，可以自己试试。

### v-model

说在前头，`v-model`不好理解，建议网上看看视频。

下面是结合网上的一些解释：

1. `v-model`指令，我理解为绑定数据源。就是把数据绑定在特定的表单元素上，可以很容易的实现双向数据绑定。
2. `v-model`本质上是一个语法糖。如下代码`<input v-model="test">`本质上是`<input :value="test" @input="test = $event.target.value">`
3. 思考一下MVVM框架的思想，`v-model`把双向数据绑定，类似`↔` ，注意不是`⇆`,二者有区别。

看一个完整例子：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="https://unpkg.com/vue/dist/vue.js"></script>
</head>
<body>
  <div id="app">
    <input type="text" v-model="name">
    <p>{{name}}</p>
  </div>
</body>
<script>
  new Vue({
    el: "#app",
    data: {
      name: '输入一些数据看看',
    },
  })
</script>
</html>
```

同时还有`v-model`的修饰符：

1. `.lazy`: 在默认情况下，`v-model`在每次`input`事件触发后将输入框的值与数据进行同步，`input` 的原生 `DOM` 事件中还有一个`change` 事件，该事件是在输入框失去焦点时 或 按下回车键时 执行的。比如上述的"x"在添加修饰符`v-model.lazy`之后，"x"就不会实时改变的，而是在失焦或按回车时才更新。
2. `.number`: 可以将输入转换为`Number`类型，否则虽然你输入的是数字，但它的类型其实是`String`
3. `.trim`: 可以自动过滤输入的首尾空格

### v-pre、v-cloak、v-once

#### `v-pre`

在模板中跳过`vue`的编译，直接输出原始值。就是在标签中加入`v-pre`就不会输出`vue`中的`data`值了。

```js
<div v-pre>{{message}}</div>

//直接在网页中显示{{message}}
```

#### `v-cloak`

在`vue`渲染完指定的整个`DOM`后才进行显示。它必须和`CSS`样式一起使用。解决：
解决闪烁问题,防止网速慢页面会出现{{ }}的问题

```css
[v-cloak] {
  display: none;
}
```

<!-- ```html
<div v-cloak>
  {{ msg }}
</div>
``` -->

#### `v-once`

在第一次DOM时进行渲染，渲染完成后视为静态内容，跳出以后的渲染过程。
