const { path } = require('@vuepress/utils')

export const plugins = [
  ['@vuepress/back-to-top'],
  [
    '@vuepress/plugin-register-components',
    {
      componentsDir: path.resolve(__dirname, './components')
    }
  ],
  [
    '@vuepress/plugin-search',
    {
      locales: {
        '/': {
          placeholder: '搜索',
        },
      },
    },
  ]
]
