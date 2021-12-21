const { path } = require('@vuepress/utils')
module.exports = {
    host: 'localhost', // ip
    port: '8099', //端口号
    title: '我的标题', // 设置网站标题
    description: '描述',
    base: '/', //默认路径
    head: [
        // 设置 favor.ico，docs/.vuepress/public 下
        // [
        //     'link', { rel: 'icon', href: '/images/logo.png' }
        // ]
    ],
    themeConfig: {// 主题设置
        // logo: '/images/logo.png',// 注意图片放在 public 文件夹下
        navbar: [
            {// 右上导航航条 docs/.vuepress/README.md
                text: '首页',
                link: '/'
            },
            {
                text: 'Vue',
                children: [
                    { text: '笔记', link: '/guide/vue/text02.md' }, // 可不写后缀 .md
                    { text: '其它链接', link: 'https://www.baidu.com/' }// 外部链接
                ]
            },
        ],
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
                    '/zh/': {
                        placeholder: '搜索',
                    },
                },
            },
        ]
    ],
}