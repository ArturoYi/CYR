const { path } = require('@vuepress/utils')
import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
import { navbar } from './config/navbar'
import { sidebar } from './config/sidebar'
// import { plugins } from './config/plugins'

export default defineUserConfig<DefaultThemeOptions>({
  // module.exports = {
  // host: 'localhost', // ip
  lang: 'zh-CN',
  port: 8999, //端口号
  title: 'IUUI', // 设置网站标题
  description: 'IUUI',
  base: '/', //默认路径
  debug: true,
  head: [
    // 设置 favor.ico，docs/.vuepress/public 下
    [
      'link', { rel: 'icon', href: '/images/favicon.ico' }
    ],
  ],
  themeConfig: {// 主题设置
    /**
     * 下面很多都要你自己配置
     */
    nextLinks: true,//下一页
    prevLinks: true,//上一页
    search: true,//搜索框
    editLink: false,//全局编辑此页
    // displayAllHeaders: true,//
    logo: '/images/favicon.ico',// 注意图片放在 public 文件夹下
    navbar: navbar,
    // 侧边栏数组
    // 所有页面会使用相同的侧边栏
    sidebarDepth: 2,
    sidebar: sidebar,

    //
  },
  plugins: [
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
  ],
}
)