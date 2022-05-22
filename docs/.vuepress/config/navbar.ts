export const navbar = [
  {// 右上导航航条 docs/.vuepress/README.md
    text: '首页',
    link: '/'
  },
  {
    text: '前端',
    children: [
      { text: '《html》', link: '/web/html/01-html.md' },
      { text: '《JavaScript》', link: '/web/JavaScript/入门导论.md' },
      { text: '《CSS》', link: '/web/css/01-css.md' },
      { text: '《TypeScript》', link: '/web/TypeScript/01.md' },
    ]
  },
  {
    text: '笔记',
    children: [
      {
        text: 'vue2',
        link: '/web/vue/01.md',
      },
      {
        text: 'Flutter',
        link: '/web/Flutter/01.md',
      },
      {
        text: 'WebPack',
        link: '/web/webpack/webpack.md',
      },
      {
        text: 'vue3',
        link: '/web/vue3/01.md',
      },
      {
        text: 'Jenkins',
        link: '/web/Jenkins/01.md',
      }
    ],
  },
  {
    text: '其它',
    children: [
      {
        text: '教程', link: '/course/README.md'
      },
      {
        text: '面试', link: '/guide/interview/interview.md'
      },
      {
        text: '随笔', link: '/guide/随笔/reflection.md'
      },
      {
        text: '故事', link: '/guide/故事/story.md'
      },
    ]
  },
  {
    text: '项目实战',
    link: '/actualCombat/README.md'
  }
]