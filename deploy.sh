# 确保脚本抛出遇到的错误
set -e

# 生成静态文件_
npm run docs:build

#验证你是否关联仓库
# deploy to github
if [ -z "$GITHUB_TOKEN" ]; then
  msg='deploy'
  githubUrl=git@github.com:540765/CYR.git
else
  msg='来自github actions的自动部署'
  githubUrl=https://540765:${GITHUB_TOKEN}@github.com/540765/CYR.git
  git config --global user.name "540765"
  git config --global user.email "3062995371@qq.com"
fi
git init
git add .
git commit -m '更新'
#这里我没有再去关联仓库，需要的请手动补上，
# git remote add origin https://[用户名]:[密码]@gitee.com/540765/CYR.git
git push -u origin master -f
git push -u origin master

#git push -f git@gitee.com:chen_qi/chen_qi.git master:gh-pages


cd - # 退回开始所在目录
rm -rf docs/.vuepress/dist