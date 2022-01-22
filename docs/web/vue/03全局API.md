---
lang: zh-CN
title: vue全局API 
description: vue全局API
---

# vue全局API

全局API并不在构造器里，而是先声明全局变量或者直接在Vue上定义一些新功能，Vue内置了一些全局API，说的简单些就是，在构造器外部用Vue提供给我们的API函数来定义新的功能。


## Vue.directive自定义属性 :100:

上一篇我们学了那些`指令`,我们也可以自定义指令。

直接例子演示：

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
    <p v-my="color" id="demo">
      {{num}}
    </p>
    <div>
      <button @click="add">Add</button>
    </div>
  </div>
</body>

</html>
<script>
  Vue.directive('my', function (el, binding, vnode) {
    el.style = 'color:' + binding.value;
  })
  var app = new Vue({
    el: "#app",
    data: {
      num: 10,
      color: 'red'
    },
    methods: {
      add: function () {
        this.num++;
      }
    },
  })
</script>
```

上面例子实现了自定义属性，其中：

#### 自定义属性传递的三个参数

1. el: 指令所绑定的元素，可以用来直接操作DOM。
2. binding: 一个对象，包含指令的很多信息。
3. vnode: Vue编译生成的虚拟节点。

#### 自定义指令的生命周期

自定义指令有五个生命周期（也叫钩子函数），分别是 `bind`,`inserted`,`update`,`componentUpdated`,`unbind`。

1. `bind`:只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个绑定时执行一次的初始化动作。
2. `inserted`:被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于`document`中）。
3. `update`:被绑定于元素所在的模板更新时调用，而无论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新。
4. `componentUpdated`:被绑定元素所在模板完成一次更新周期时调用。
5. `unbind`:只调用一次，指令与元素解绑时调用。

使用：

```js
//基于上面例子
 Vue.directive('my', {
    function(el, binding, vnode) {
      el.style = 'color:' + binding.value;
    },
    bind: function () {//被绑定
      console.log('1 - bind');
    },
    inserted: function () {//绑定到节点
      console.log('2 - inserted');
    },
    update: function () {//组件更新
      console.log('3 - update');
    },
    componentUpdated: function () {//组件更新完成
      console.log('4 - componentUpdated');
    },
    unbind: function () {//解绑
      console.log('1 - bind');
    }
  })
```

## Vue.extend构造器

可以理解为创建一个Vue的子类,`Vue.extend` 返回的是一个“扩展实例构造器”,也就是预设了部分选项的·实例构造器。经常服务于`Vue.component`用来生成组件。

#### 自定义无参数标签

这是基础用法，想象一个需求，要在博客页面多处显示作者的网名，并在网名上直接有链接地址。我们希望在html中只需要写<author></author>，这和自定义组件很像，但是他没有传递任何参数，只是个静态标签。

完整实现：

```js
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
  <h1>vue.extend-扩展实例构造器</h1>
  <hr>
  <author></author>
  <script type="text/javascript">
    var authorExtend = Vue.extend({
      template: "<p><a :href='authorUrl'>{{authorName}}</a></p>",
      data: function () {
        return {
          authorName: 'baidu',
          authorUrl: 'http://www.baidu.com'
        }
      }
    });
    // 扩展实例构造器是需要挂载的
    new authorExtend().$mount('author');
  </script>
</body>
</html>
```

可以看到`authorExtend`扩展实例构造器是需要挂载的。即：

`new authorExtend().$mount('author');`

#### 挂载到元素上

还可以通过`HTML`标签上的`id`或者`class`来生成扩展实例构造器，`Vue.extend`里的代码是一样的，只是在挂载的时候，我们用类似`jquery`的选择器的方法，来进行挂载就可以了。

例如：

```js
new authorExtend().$mount('#author');
//挂载到#author
```

## Vue.set全局操作

`Vue.set `的作用就是在构造器（data）外部操作构造器(data)内部的数据、属性或者方法。因为构造器外（data外）定义的值更新时，会发现页面上并不会渲染更改后的值。这个问题原因就是添加新的值之后并不会将添加的值双向绑定，此时虽然更新了，但是页面并不会渲染（一般构造器外会有这种情况）。

说明： 

```js
//在构造器外部声明数据
 var outData={
    count:1,
    goodName:'car'
};
var app=new Vue({
    el:'#app',
    //引用外部数据
    data:outData
})
```

我们在外部改变数据：

1. 用Vue.set

```js
function add(){
       Vue.set(outData,'count',4);
 }
```

2. 用Vue对象的方法添加

```js
app.count++;
```

3. 直接操作外部数据

```js
outData.count++;
```

完整代码：

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
  <h1>Vue.set 全局操作</h1>
  <hr>
  <div id="app">
    <ul>
      <li v-for=" aa in arr">{{aa}}</li>
    </ul>

  </div>
  <button onclick="add()">外部</button>

  <script type="text/javascript">

    function add() {
      console.log("我已经执行");
      // app.arr[1] = '4';
      // console.log(app.arr);
      Vue.set(app.arr,1,'4');
      console.log(app.arr);
    }
    var outData = {
      arr: ['1', '2', '3']
    };
    var app = new Vue({
      el: '#app',
      data: outData
    })
  </script>

</html>
```

可以看到，上面方法都可以改变数据，但是只有`Vue.set`方法改变的数据会自动更新视图。这就是`Vue.set`存在的原因。

## Vue生命周期(钩子函数)

网上有许多关于Vue生命周期的讲解：

演示：

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
  <h1>构造器的声明周期</h1>
  <hr>
  <div id="app">
    {{message}}
    <p><button @click="jia">加分</button></p>
  </div>
  <button onclick="app.$destroy()">销毁</button>

  <script type="text/javascript">
    var app = new Vue({
      el: '#app',
      data: {
        message: 1
      },
      methods: {
        jia: function () {
          this.message++;
        }
      },
      beforeCreate: function () {
        console.log('1-beforeCreate 初始化之后');
      },
      created: function () {
        console.log('2-created 创建完成');
      },
      beforeMount: function () {
        console.log('3-beforeMount 挂载之前');
      },
      mounted: function () {
        console.log('4-mounted 被创建');
      },
      beforeUpdate: function () {
        console.log('5-beforeUpdate 数据更新前');
      },
      updated: function () {
        console.log('6-updated 被更新后');
      },
      activated: function () {
        console.log('7-activated');
      },
      deactivated: function () {
        console.log('8-deactivated');
      },
      beforeDestroy: function () {
        console.log('9-beforeDestroy 销毁之前');
      },
      destroyed: function () {
        console.log('10-destroyed 销毁之后')
      }

    })
  </script>
</body>

</html>
```

我们可以看到10个生命周期钩子函数：

1. beforeCreate（创建前） ：组件实例被创建之初，组件的属性生效之前
2. created（创建后） ：组件实例已经完全创建，属性也绑定，但真实 dom 还没有生成，$el 还不可用
3. beforeMount（挂载前） ：在挂载开始之前被调用：相关的 render 函数首次被调用
4. mounted（挂载后） ：在el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子
5. beforeUpdate（更新前） ：组件数据更新之前调用，真实DOM还没被渲染
6. update（更新后） ：组件数据更新之后
7. activated（激活前） ：keep-alive专属，组件被激活时调用
8. deactivated（激活后） ：keep-alive专属，组件被销毁时调用
9. beforeDestory（销毁前） ：组件销毁前调用
10. destoryed（销毁后） ：组件销毁前调用


![](https://s2.loli.net/2022/01/22/HqwDSUOWx8ePMmb.png)

生命周期钩子函数用法很多。





