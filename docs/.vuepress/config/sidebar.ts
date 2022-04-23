export const sidebar = {
  '/web/vue/': [
    {
      text: 'VUE2.x',
      children: [
        '01.md',
        '02vue指令.md',
        '03全局API.md',
      ],
    },
  ],
  '/web/Flutter/': [
    {
      text: 'Flutter',
      children: [
        '01.md',
        '02.Dart语法.md',
        '09.一切都是widget.md',
      ],
    },
  ],
  '/web/html/': [
    {
      text: 'HTML',
      children: [
        '/web/html/01-html.md',
      ],
    },
  ],
  '/web/TypeScript/': [
    {
      text: 'TypeScript学习',
      children: [
        '01.md',
        '02.变量声明.md',
      ]
    }
  ],
  '/web/JavaScript/': [
    {
      text: '《JavaScript教程》',
      children: [
        '入门导论.md',
        '数据类型与运算符.md',
        '语法基础.md',
        '内置对象.md',
      ]
    }
  ],
  '/course/': [
    {
      text: '教程',
      children: [
        'README.md',
        'elementui在表格中插入图片.md',
        'vscode常用插件.md',
        'utils.md'
      ],
    }
  ],
  '/guide/interview/': [
    {
      text: '面试',
      children: [
        'interview.md',
        'JSinterview.md',
        'VUEinterview.md'
      ]
    }
  ],
  // fallback 侧边栏被最后定义
  '/': [''], //不能放在数组第一个，否则会导致右侧栏无法使用 
}
