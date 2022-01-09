const { path } = require('@vuepress/utils')
import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

export default defineUserConfig<DefaultThemeOptions>({
    // module.exports = {
    // host: 'localhost', // ip
    lang: 'zh-CN',
    port: 9779, //端口号
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
        navbar: [
            {// 右上导航航条 docs/.vuepress/README.md
                text: '首页',
                link: '/'
            },
            {
                text: '前端',
                children: [
                    { text: '《html》', link: '/web/html/text1.md' },
                    { text: '《JavaScript教程》', link: '/web/JavaScript/入门导论.md' },
                    { text: '《CSS》', link: 'https://www.baidu.com/' },
                ]
            },
            {
                text:'笔记',
                children:[
                    {
                        text:'vue2',
                        link: '/web/vue/01.md',
                    },
                    {
                        text: 'WebPack',
                        link: '/web/webpack/webpack.md',
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
                        text: '面试', link: '/guide/面试/interview.md'
                    },
                    {
                        text: '随笔', link: '/guide/随笔/text.md'
                    },
                ]
            }
        ],
        // 侧边栏数组
        // 所有页面会使用相同的侧边栏
        sidebarDepth: 2,
        sidebar: {
            '/web/vue/': [
                {
                    text: '标题',
                    children: [
                        '01.md',
                        '02vue实例.md',
                        'text2.md',
                    ],
                },
            ],
            '/web/html/': [
                {
                    text: '标题',
                    children: [
                        '/web/html/text2.md',
                        '/web/html/text1.md'
                    ],
                },
            ],
            '/web/JavaScript/':[
                {
                    text:'《JavaScript教程》',
                    children:[
                        '入门导论.md',
                        '数据类型与运算符.md',
                        '语法基础.md',
                        '内置对象.md',
                    ]
                }
            ],
            '/course/':[
                {
                    text:'教程',
                    children:[
                        'README.md',
                        'elementui在表格中插入图片.md',
                        'vscode常用插件.md',
                    ],
                }
            ],
            // fallback 侧边栏被最后定义
            '/': [''], //不能放在数组第一个，否则会导致右侧栏无法使用 
        },

        //
    },
    plugins: [
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