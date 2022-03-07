---
title: VUE面试
lastUpdated: true
prev: true
next: true
date: 2022-01-02
tags:
  - 面试
  - 其他
---

# VUE面试

## 1.vue的生命周期

#### 1.1各个生命周期

1. beforeCreate（创建前）:组件实例被创建之初，组件的属性生效之前。
2. created（创建后）:组件实例已经完全创建，属性也绑定，但真实dom还没渲染。$el不可用。
3. beforeMount（挂载前）:在挂载开始之前被调用：相关的render函数首次被调用。
4. mounted（挂载后）:在el被新创建的vm.$el替换，并挂载到实例上去之后调用该钩子。
5. beforeUpdate（更新前）:组件数据更新之前调用，真实dom还没被更新渲染。
6. update（更新后）:组件数据更新后。
7. activated（激活前）:keey-alive专属，组件被激活时调用。
8. deactivated（激活后）:keey-alive专属，组件被销毁时调用。
9. beforeDestory（销毁前）:组件销毁时调用。
10. destoryed（销毁后）:组件销毁前调用。

#### 1.2组件执行顺序

你看完上面应该知道生命周期函数大概执行顺序了吧。这里只说父子组件关系其生命周期的执行顺序。

- ```加载渲染过程```：beforeCreate(父) —> created(父)—>beforeMount(父)—>beforeCreate(子)—>created(子)—>beforeMount(子)—>mounted(子)—>mounted(父)
- beforeCreate(父) —> created(父)—>beforeMount(父)—>beforeCreate(子)—>created(子)—>beforeMount(子)—>mounted(子)—>mounted(父)
- 销毁过程：beforeDestory(父) —> beforeDestory(子) —> destoryed(子) —> destoryed(父)


#### 1.3每个生命周期详解

下面是极简写法，甚至忽略一些东西：

1. beforeCreate：new一个vue实例，啥都没有。
2. created：data和methods初始化完成，但是没有el。
3. beforeMount:虚拟dom已经编译好，但还没挂载到页面上。
4. mouted：页面初始化完成。

上面为重点

5. beforeUpdate：此时data是更新后的数据，但页面还是旧的，还没有同步。
6. update：更新页面和data数据保存同步。
7. beforeDestory：销毁阶段，此时data和methods依然可用。
8. destory：组件销毁，不可用。

#### 1.4 keey-alive的activated和deactivated

- 如果加入keey-alive:
第一次加载时，会额外执行activated。
后续再进入：只执行activated

#### 1.5 谈谈你对keey-alive的理解

作用：缓存组件达到提高性能，但你重新打开组件时，它会缓存上一次打开时的状态。

例如：列表菜单点击会跳转详情页，当你缓存时它可以减少重复请求信息。

## 2.v-if和v-show的区别

v-if：控制dom是否创建，频繁切换时不推荐频繁更新dom。
v-show：dom元素会创建，只是控制display:none(不可见),blok(显示)。

## 2.v-if和v-for的优先级

v-for优先级比v-if高

## 3.ref是什么？

ref类似于一个关键字，用来获取dom。（通过`this.refs.关键字`来获取dom元素）

## 4.nextTick是什么？

dom更新后的回调函数。主要作用于获取更新后的数据（异步）。

## 5.scoped原理

作用：使用scoped让CSS只作用于当前组件元素。

- 原理：给HTML的DOM节点加一个不重复data属性(形如：data-v-2311c06a)来表示他的唯一性。
- 在每句css选择器的末尾（编译后的生成的css语句）加一个当前组件的data属性选择器的哈希特征值（如[data-v-2311c06a]）来私有化样式。

## 6.Vue中如何做样式穿透

引入外部组件而且使用了scoped时需要更改样式时使用。

1.scss样式穿透

```css
父元素 /deep/子元素
```

2.stylus样式穿透

```css
父元素 /deep/子元素
/* stylus一般用下面 */
父元素 >>> 子元素
```

## 7.组件之间的通信

#### 7.1父传子

```js

// 父组件
<template>
<子组件 :msg='msg'></子组件>
</template>

//子组件
props:['msg']
//或者
props:{
  msg:数据类型(如：String)
}
```

#### 7.2子传父

```js
// 子组件
this.$emit('在父组件的事件名称','要传给父组件的数据')

// 父组件
  <子组件 @在父组件的事件名称='getVal'></子组件>
</template>
......
metnods(){
    getVal(msg){
      cosolo.log('传过来的值:'+msg)
    }
}
```

#### 7.2兄弟组件传值

1. 中转站bus.js 模块

```js
// bus.js导入Vue模块，并导出一个Vue实例对象
import Vue from 'vue'
export default new Vue() 

// 在各个兄弟组件中，导入 bus.js 模块
import bus from '@/bus.js'


// 使用 bus.$emit(‘事件名称’, 要发送的数据) 来向外发送参数
      bus.$emit('xxx', '保护费')

// 接受事件
 bus.$on('xxx', msg => {
      // console.log(msg) //保护费
      // 把数据给dt接收
      this.dt = msg
    })
```

## 8.computed、methods、watch

1. computed:性能比methods好，据依赖关系进行缓存的计算，并且只在需要的时候进行更新,一个数据受多个数据影响 ----  购物车结算 受到单价 数量 还有是否被选中的影响。

2. methods:没有缓存，methods 里面是用来定义函数的，它需要手动调用才能执行。

3. watch:watch中的函数有两个参数，前者是newVal，后者是oldVal。watch中的函数是不需要调用的。watch只会监听数据的值是否发生改变，而不会去监听数据的地址是否发生改变。也就是说，watch想要监听引用类型数据的变化，需要进行深度监听,一个数据影响多个数据  ---  应用场景：搜索框、表单输入、异步更新、动画。

更多：computed能做的，watch都能完成，反之不成立，watch可处理异步。

## 9.props和data优先级谁高

默认优先级：

props  >  methods  >  data  >  computed  >  watch

## 10.VueX

#### 10.1 VueX是什么，有哪些属性？

全局状态管理模式；

1. state：类似于组件的data，存放数据
2. getters：类似于组件的computer计算属性，有缓存
3. mutations：类似于组件中的methods，其是同步事务。
4. actions：提交更改给mutations，一般用于异步事务。
5. modules：模块化拆分，可以实现自定义别名导出模块，更好管理。

#### 10.2 VueX是单向数据流

不能之间修改VueX的值

#### 10.3 VueX不是持久化存储

刷新数据丢失，重要数据可以存在localStorage保存


## 11. Vue设置代理（vue.config.js）

## 12. Vue路由

#### 12.1. 路由模式

- history:不明地址会发送请求，使用其会有空白页
- hash（默认）:不明地址不会发送请求

#### 12.2. 路由传值

#### 12.3. 路由守卫

1. 全局路由守卫：
- 前置守卫：beforeEach((to, from, next))
- beforeResolve
- 后置钩子：afterEach((to, from, next))
2. 导航路由守卫：
3. 组件内路由守卫：


## 13. 介绍一下SPA以及其优缺点。

SPA是的页面应用；
缺点：
1. SEO（多页面）优化不好
2. 性能不是特别好

## 14. v-model原理

通过Object.defineProperty劫持数据发生的改变，在set中赋值的，触发update方法进行更新节点内容，从而实现双向绑定。

这里学一下`Object.defineProperty()`

```js
let person = {
  name:'张三',
}

Object.defineProperty(person,'age',{
  value:18;
  // 这就是使用这个方法的原因，方便控制元素
  enumerable:true,//控制属性是否可以枚举
  writable:true,//控制属性是否可以被修改
  configurable:true;//控制属性是否可以被删除

  // 这个就是原理，值绑定,访问器,简称（getter）
  get(){
    return number
  },

  // 当有人修改值，值修改绑定.
  set(value){
    number = value;
  }
})
```

这里学习一下数据代理

```js
// 通过new Vue的实例代理data中属性的操作
```

## 15. data劫持

1. 给vue实例对象赋值，来自data
2. data中的属性值与实例对象保持双向（数据劫持）

```js
proxyData(){
  for(let key in this.$data){
    Object.defineProperty(this,key,{
      get(){
        return this.$data[key];
      },
      set(val){
        this.$data[key] = val;
      }
    })
  }
}
```

## 16. diff算法

虚拟dom（把dom数据化，便于操作）

diff算法的本质是找出两个对象之间的差异，目的是尽可能复用节点。此处说到的对象其实就对应 vue中的 virtual dom,即使用 js 对象来表示页面中的 dom 结构。

特点:
 - 比较只会在同层级进行, 不会跨层级比较
 - 在diff比较的过程中，循环从两边向中间比较

 比较方式:

 - diff整体策略为：深度优先，同层比较