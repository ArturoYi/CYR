---
home: true，
heroImage: /images/logo.png
heroText:  null
tagline: 
# actions:
#   - text: 快速上手
#     link: /zh/guide/getting-started.html
#     type: primary
#   - text: 项目简介
#     link: /guide/
#     type: secondary
features: 
- title: Markdown
  details: 少的配置多写作
- title: vuepress2.x
  details: 高效和灵活的插件
- title: vite
  details: 轻、快且功能丰富
footer: MIT Licensed | Copyright © 2020-柒-IU
---



<style>
.anchor-down {
  display: block;
  margin: 12rem auto 0;
  bottom: 45px;
  width: 20px;
  height: 100px;
  font-size: 34px;
  text-align: center;
  animation: bounce-in 5s 1s infinite;
  /* position: absolute; */
  left: 50%;
  bottom: 30%;
  /* margin-left: -10px; */
  margin-bottom:120px;
  cursor: pointer;
}
@-webkit-keyframes bounce-in{
  0%{transform:translateY(0)}
  20%{transform:translateY(0)}
  50%{transform:translateY(-20px)}
  80%{transform:translateY(0)}
  to{transform:translateY(0)}
}
.anchor-down::before {
  content: "";
  width: 20px;
  height: 20px;
  display: block;
  border-right: 3px solid rgb(116, 146, 135);
  border-top: 3px solid rgb(116, 146, 135);
  transform: rotate(45deg);
  position: absolute;
  bottom: 77px;
}
.anchor-down::after {
  content: "";
  width: 20px;
  height: 20px;
  display: block;
  border-right: 3px solid rgb(116, 146, 135);
  border-top: 3px solid rgb(116, 146, 135);
  transform: rotate(-135deg);
}
</style>

<script>
export default {
  mounted () {
    const ifJanchor = document.getElementById("JanchorDown"); 
    ifJanchor && ifJanchor.parentNode.removeChild(ifJanchor);
    let a = document.createElement('a');
    a.id = 'JanchorDown';
    a.className = 'anchor-down';
    document.getElementsByClassName('hero')[0].append(a);
    let targetA = document.getElementById("JanchorDown");
    targetA.addEventListener('click', e => { // 添加点击事件
      this.scrollFn();
    })
  },

  methods: {
    scrollFn() {
      // const windowH = document.getElementsByClassName('hero')[0].clientHeight; // 获取窗口高度
      // document.documentElement.scrollTop = windowH; // 滚动条滚动到指定位置
    }
  }
}
</script>
