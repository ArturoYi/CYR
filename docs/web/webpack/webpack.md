---
title: webpack介绍
description: webpack介绍
---

## webpack入坑

Webpack在实际中真的接触少之又少，本人第一次接触是在面试中你敢信？

**em...🎵 最怕空气突然安静**

本人被迫无奈，选择从面试题下手。

> 问：Webpack 配置中用过哪些 Loader ？都有什么作用？

> 问：Loader 和 Plugin 有什么区别？

> 问：Webpack 打包流程是怎样的？

> 问：Webpack 打包中 Babel 插件是如何工作的？


对于半路出家，参考网络的教学后得出三个阶段：

1. 基础 -- 会配置
2. 进阶 -- 能优化
3. 深入 -- 懂原理（暂时开玩笑）

::: details 可以跳过的拓展（没必要点开）
:see_no_evil:
一些webpack的核心配置概念：
| 概念       | 说明          | 
| ------------- |:-------------:| 
| **入口(`entry`)**      | 入口起点(`entry point`) 指示 `webpack` 应该使用哪个模块，来作为构建其内部 依赖图(dependency graph) 的开始。默认值是 `./src/index.js`。 | 
| **输出(`output`)**      | `output` 属性告诉 `webpack` 在哪里输出它所创建的 bundle,默认放置在 `./dist` 文件夹中。      | 
| `loader` | `loader` 让 `webpack` 能够去处理其他类型的文件，并将它们转换为有效 模块，以供应用程序使用      | 
| **插件(`plugin`)** | 插件可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量。      | 
| **模式(`mode`)** | 通过选择 `development`, `production` 或 `none` 之中的一个，来设置 `mode` 参数，你可以启用 `webpack` 内置在相应环境下的优化。其默认值为 `production`。   |
:::

## webpack基础

### 快速上手

从零开始，先先本地安装一下 webpack 以及 webpack-cli

```shell
npm install webpack webpack-cli -D # 安装到本地依赖(不推荐：-G是全局依赖)
```

如果安装完成会在`package.json`看到如下： ✅
```js
 "devDependencies": {
    "webpack": "^5.65.0",
    "webpack-cli": "^4.9.1"
  }
```

``webpack ``在 4 以后就说支持 0 配置打包，我们可以测试一下：

1. 新建 ./src/index.js 文件，写一段简单的`js`代码（随便写）

如：
```js
const a = 'Hello ITEM'
console.log(a)
module.exports = a;
```

此时目录结构：

![](https://s2.loli.net/2022/01/09/jdNbqRSmMQpGge8.png)

2. 直接运行 `npx webpack`，启动打包：
![](https://s2.loli.net/2022/01/09/YxpAlO2DWXt9cPd.png)

打包完成，我们看到日志上面有一段提示：`The 'mode' option has not been set,...`

意思就是，我们没有配置 `mode`（模式）。


> `模式`： 供 mode 配置选项，告知 webpack 使用相应模式的内置优化，默认值为 `production`，另外还有 `development`、`none`，他们的区别如下



怎么配置？看下面：

```js
//1.只需在配置对象中提供 mode 选项：
module.exports = {
  mode: 'development',
};
//2.从 CLI 参数中传递：
$ webpack --mode=development
```

一般用下面配置文件方式配置：

### 配置文件

在实际中，我们一般都要使用配置文件来满足项目需求：

1. 根路径下新建一个配置文件 `webpack.config.js`
2. 新增基本配置信息
```js
const path = require('path')
module.exports = {
  mode: 'development', // 模式
  entry: './src/index.js', // 打包入口地址
  output: {
    filename: 'bundle.js', // 输出文件名
    path: path.join(__dirname, 'dist') // 输出文件目录
  }
}
```
上面是基本的配置，需要我记住。许多修改都是基于上面进行。

### Loader

当我们把入口改成 CSS 文件，可能打包结果会如何：

1. 新增 ./src/main.css
```css
body {
  margin: 0 auto;
  padding: 0 20px;
  max-width: 800px;
  background: #f4f8fb;
}
```

2. 修改 entry 配置
```js
const path = require('path')

module.exports = {
  mode: 'development', // 模式
  entry: './src/main.css', // 打包入口地址
  output: {
    filename: 'bundle.css', // 输出文件名
    path: path.join(__dirname, 'dist') // 输出文件目录
  }
}
```

3. 运行打包命令：npx webpack

![](https://s2.loli.net/2022/01/09/3qpNyQVMrt9TLiJ.png)

报错！
因为webpack 默认支持处理 JS 与 JSON 文件，其他类型都处理不了，这里必须借助 Loader 来对不同类型的文件的进行处理。

4. 安装 `css-loader` 来处理 CSS

```bash
npm install css-loader -D
```

5. 配置资源加载模块

```js
const path = require('path')

module.exports = {
  mode: 'development', // 模式
  entry: './src/main.css', // 打包入口地址
  output: {
    filename: 'bundle.css', // 输出文件名
    path: path.join(__dirname, 'dist') // 输出文件目录
  },
  module: { 
    rules: [ // 转换规则
      {
        test: /\.css$/, //匹配所有的 css 文件
        use: 'css-loader' // use: 对应的 Loader 名称
      }
    ]
  }
}
```

6. 重新运行打包命令 npx webpack
![](https://s2.loli.net/2022/01/09/xHuTnfdtWLPIYo2.png)

打包成功，查看dist的结果：

```bash
dist           
└─ bundle.css  # 打包得到的结果
```

查看到bundle.css会有错误，这里这是尝试，入口文件还是需要改回 ./src/index.js。

::: tip 总结
Loader 就是将 Webpack 不认识的内容转化为认识的内容
:::

### 插件（plugin）

与 Loader 用于转换特定类型的文件（单一原则）不同，**插件（Plugin）可以贯穿 Webpack 打包的生命周期，执行不同的任务影响输出结果（针对整个流程执行广泛的任务）**

例子上手：
1. 新建 `./src/index.html` 文件

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>
```

如果我想打包后的资源文件，例如：js 或者 css 文件可以自动引入到 Html 中，就需要使用插件 [html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin)来帮助你完成这个操作

2. 本地安装 `html-webpack-plugin`

```bash
npm install html-webpack-plugin -D
```

3. 配置插件

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development', // 模式
  entry: './src/index.js', // 打包入口地址
  output: {
    filename: 'bundle.js', // 输出文件名
    path: path.join(__dirname, 'dist') // 输出文件目录
  },
  module: { 
    rules: [
      {
        test: /\.css$/, //匹配所有的 css 文件
        use: 'css-loader' // use: 对应的 Loader 名称
      }
    ]
  },
  plugins:[ // 配置插件
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}
```

4. 运行一下打包`npx webpack`，打开 dist 目录下生成的 index.html 文件

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
<script defer src="bundle.js"></script></head>
<body>
    
</body>
</html>
```

可以看到它自动的引入了打包好的 `bundle.js` ，非常方便实用

### 自动清空打包目录

这个内容本来属于插件（plugin）的范畴，但一般比较常用；

每次打包的时候，打包目录都会遗留上次打包的文件，为了保持打包目录的纯净，我们需要在打包前将打包目录清空

有两个方法：

**第一、webpack5新特性（clean:true）**

```js {4}
    output: {
        filename: 'bundle.js', // 输出文件名
        path: path.join(__dirname, 'dist'), // 输出文件目录
        clean:true,// 自动清空打包目录
    },
```

使用时需要注意版本号；

**第二、插件**

我们还可以使用插件 [clean-webpack-plugin](https://www.npmjs.com/package/clean-webpack-plugin) 来实现

1. 安装

```bash
$ npm install clean-webpack-plugin -D
```

2. 配置

```js {12}
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 引入插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
//
module.exports = {
  // ...
  plugins:[ // 配置插件
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin() // 引入插件
  ]
}
```

### 区分环境

本地开发和部署线上，肯定是有不同的需求

本地环境：

- 需要更快的构建速度
- 需要打印 debug 信息
- 需要 live reload 或 hot reload 功能
- 需要 sourcemap 方便定位问题
- ...

生产环境：

- 需要更小的包体积，代码压缩+tree-shaking
- 需要进行代码分割
- 需要压缩图片体积
- ...

同样也有不同方法：

**第一种：**

1. 创建`webpack.dev.js` 开发环境配置文件
2. 创建`webpack.prod.js` 生产环境配置文件
3. 在`webpack.config.js`区分打包

**第二种：**

1. 本地安装 [cross-env](https://www.npmjs.com/package/cross-env)

```bash
npm install cross-env -D
```

2. 配置启动命令

打开 ./package.json

```js
"scripts": {
    "dev": "cross-env NODE_ENV=dev webpack serve --mode development", 
    "test": "cross-env NODE_ENV=test webpack --mode production",
    "build": "cross-env NODE_ENV=prod webpack --mode production"
  },
```

3. 在 Webpack 配置文件中获取环境变量
核心代码：
![](https://s2.loli.net/2022/01/09/9hGRxgpONyz2VjY.png)

4. 测试

- 执行 `npm run build`

```js
//输出
process.env.NODE_ENV= prod
argv.mode= production
```

- 执行 `npm run test`

```js
//输出
process.env.NODE_ENV= prod
argv.mode= production
```

- 执行 `npm run dev`

```js
//输出
process.env.NODE_ENV= prod
argv.mode= production
```

这样我们就可以不同的环境来动态修改 Webpack 的配置

### 使用devServer

1.安装 webpack-dev-server

```bash
npm intall webpack-dev-server@3.11.2 -D || npm intall webpack-dev-server
```
::: danger 注意
⚠️注意：若使用的 webpack-dev-server 版本是 3.11.2，当版本 version >= 4.0.0 时，需要使用 devServer.static 进行配置，不再有 devServer.contentBase 配置项。
:::

:::: code-group
::: code-group-item version = @3.11.2
```js
// webpack.config.js
const config = {
  // ...
  devServer: {
    contentBase: path.resolve(__dirname, 'public'), // 文件目录
    compress: true, //是否启动压缩 gzip
    port: 8080, // 端口号
    // open:true  // 是否自动打开浏览器
  },
 // ...
}

```
:::
::: code-group-item version >= 4.0.0
```js
// webpack.config.js
const config = {
  // ...
  devServer: {
    static: './index.html', // 静态文件目录
    //compress: true, //是否启动压缩 gzip
    //port: 8080, // 默认端口号
    // open:true  // 是否自动打开浏览器
  },
 // ...
}

```
:::
::::

为什么要配置 contentBase 或 static ？

因为 `webpack` 在进行打包的时候，对静态文件的处理，例如图片，都是直接 copy 到 dist 目录下面。但是对于本地开发来说，这个过程太费时，也没有必要，所以在设置 `contentBase` 之后，就直接到对应的静态目录下面去读取文件，而不需对文件做任何移动，节省了时间和性能开销。

