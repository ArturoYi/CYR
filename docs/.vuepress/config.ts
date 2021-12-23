const { path } = require('@vuepress/utils')
import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

export default defineUserConfig<DefaultThemeOptions>({
    // module.exports = {
    host: 'localhost', // ip
    port: 8099, //端口号
    title: 'IUUI', // 设置网站标题
    description: 'IUUI',
    base: '/', //默认路径
    lang: 'zh-CN',
    head: [
        // 设置 favor.ico，docs/.vuepress/public 下
        [
            'link', { rel: 'icon', href: '/images/dark-logo.png' }
        ],
        /**
         *  [
            'script', {type: 'text/javascript', src: '/js/base.js'}
        ]
         */
    ],
    themeConfig: {// 主题设置
        //
        repo: '540765',
        /**
         * 下面很多都要你自己配置
         */
        nextLinks: true,//下一页
        prevLinks: true,//上一页
        search: true,//搜索框
        editLink: false,//全局编辑此页
        // displayAllHeaders: true,//
        logo: '/images/logo.png',// 注意图片放在 public 文件夹下
        navbar: [
            {// 右上导航航条 docs/.vuepress/README.md
                text: '首页',
                link: '/'
            },
            {
                text: '前端',
                children: [
                    { text: 'vue', link: '/web/vue/text1.md' }, // 可不写后缀 .md
                    { text: 'html', link: '/web/html/text1.md' },// 外部链接
                    { text: 'css', link: 'https://www.baidu.com/' },// 外部链接
                    { text: 'JavaScript', link: 'https://www.baidu.com/' },// 外部链接
                    { text: 'ES6', link: 'https://www.baidu.com/' },
                ]
            },
            {
                text: '其它',
                children: [
                    {
                        text: '唯鸡汤', link: '/guide/鸡汤/text.md'
                    },
                    {
                        text: '教程', link: '/guide/教程/text.md'
                    },
                    {
                        text: '面试', link: '/guide/面试/text.md'
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
            '/guide/面试/': [
                {
                    text: '面试',
                    children: [
                        '/guide/面试/text.md'
                    ],
                },
            ],
            '/web/vue/': [
                {
                    text: '标题',
                    children: [
                        '/web/vue/text2.md',
                        '/web/vue/text1.md'
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