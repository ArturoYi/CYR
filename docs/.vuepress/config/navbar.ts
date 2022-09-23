export const navbar = [
  {
    // 右上导航航条 docs/.vuepress/README.md
    text: "首页",
    link: "/",
  },
  {
    text: "后端",
    children: [
      { text: "《JavaSE》", link: "/java/《java入门》/01.基础介绍.md" },
      { text: "《Java多線程》", link: "/java/《java多线程》/01.概述.md" },
      // { text: "《计算机导论》", link: "/" },
      // { text: "《计算机网络》", link: "/" },
      // { text: "《MySQL 数据库》", link: "/" },
      // { text: "《Java Web》", link: "/" },
      // { text: "《SSM》", link: "/" },
      // { text: "《SpringBoot 2》", link: "/" },
    ],
  },
  {
    text: "前端",
    children: [
      { text: "《html》", link: "/web/html/01-html.md" },
      { text: "《JavaScript》", link: "/web/JavaScript/入门导论.md" },
      { text: "《CSS》", link: "/web/css/01-css.md" },
      { text: "《TypeScript》", link: "/web/TypeScript/01.md" },
    ],
  },
  {
    text: "笔记",
    children: [
      {
        text: "前端",
        children: [
          {
            text: "Vue2",
            link: "/web/vue/01.md",
          },
          {
            text: "Vue3",
            link: "/web/vue3/01.md",
          },
          {
            text: "WebPack",
            link: "/web/webpack/webpack.md",
          },
          {
            text: "Git",
            link: "/java/git/01.git版本控制.md",
          },
          {
            text: "Flutter",
            link: "/web/Flutter/01.md",
          },
        ],
      },
      {
        text: "后端",
        children: [
          {
            text: "MySQL",
            link: "/java/mysql/01.mysql.md",
          },
          {
            text: "Jenkins",
            link: "/web/Jenkins/01.md",
          },
          { text: "SpringBoot", link: "/java/springboot/01.springboot.md" },
        ],
      },
      {
        text: "Linux运维",
        children: [
          {
            text: "Linux",
            link: "/java/Linux/01.Linux入门.md",
          },
        ],
      },
    ],
  },
  {
    text: "其它",
    children: [
      {
        text: "教程",
        link: "/guide/教程/text.md",
      },
      {
        text: "面试",
        link: "/guide/interview/interview.md",
      },
      {
        text: "随笔",
        link: "/guide/随笔/reflection.md",
      },
      {
        text: "故事",
        link: "/guide/故事/story.md",
      },
    ],
  },
  {
    text: "项目实战",
    link: "/actualCombat/README.md",
  },
];
