export const sidebar = {
  "/java/git/": [
    {
      text: "git",
      children: ["01.git版本控制.md"],
    },
  ],
  "/java/Docker/": [
    {
      text: "Docker",
      children: ["01.簡介和安裝.md", "02.基本命令.md","03.Docker练习.md"],
    },
  ],
  "/java/mysql/": [
    {
      text: "MySql",
      children: [
        "01.mysql.md",
        "02.mysql數據管理.md",
        "03.mysql事務.md",
        "04.JDBC.md",
      ],
    },
  ],
  "/java/springboot/": [
    {
      text: "springboot",
      children: [
        "01.springboot.md",
        "02.springboot启动原理.md",
        "03.springboot自动配置.md",
      ],
    },
  ],
  "/web/vue/": [
    {
      text: "VUE2.x",
      children: ["01.md", "02vue指令.md", "03全局API.md"],
    },
  ],
  "/web/vue3/": [
    {
      text: "VUE3.x",
      children: ["01.md", "02.组件编写.md"],
    },
  ],
  "/web/Flutter/": [
    {
      text: "Flutter",
      children: [
        "01.md",
        "02.Dart语法.md",
        "03.widget.md",
        "04.路由管理.md",
        "05.基础组件.md",
      ],
    },
  ],
  "/web/html/": [
    {
      text: "HTML",
      children: ["/web/html/01-html.md"],
    },
  ],
  "/web/TypeScript/": [
    {
      text: "TypeScript学习",
      children: ["01.md", "02.变量声明.md", "03.接口.md", "04.类.md"],
    },
  ],
  "/web/JavaScript/": [
    {
      text: "《JavaScript教程》",
      children: [
        "入门导论.md",
        "数据类型与运算符.md",
        "语法基础.md",
        "内置对象.md",
      ],
    },
  ],
  "/course/": [
    {
      text: "教程",
      children: [
        "README.md",
        "elementui在表格中插入图片.md",
        "vscode常用插件.md",
        "utils.md",
        "spring注解.md",
      ],
    },
  ],
  "/guide/interview/": [
    {
      text: "面试",
      children: ["interview.md", "JSinterview.md", "VUEinterview.md"],
    },
  ],
  "/actualCombat/Flutter工程实战/01.起步.md/": [
    {
      text: "《Flutter工程实战》",
      children: ["01.起步.md"],
    },
  ],
  // fallback 侧边栏被最后定义
  "/": [""], //不能放在数组第一个，否则会导致右侧栏无法使用
};
