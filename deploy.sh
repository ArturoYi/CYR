# 确保脚本抛出遇到的错误
set -e

# # 生成静态文件_
npm run docs:build
# # 进入生成的文件夹


#验证你是否关联仓库，github需要密钥推送
# deploy to github
msg=`date +%Y-%m-%d`
var1=10
githubUrl=git@github.com:540765/CYR.git

if [ -z "$GITHUB_TOKEN" ] 
then
  echo "有GITHUB_TOKEN"
  val=`expr 1 + 1`
else
  echo "无GITHUB_TOKEN"
  val=`expr 2 + 2`
  git config --global user.name "540765"
  git config --global user.email "3062995371@qq.com"
fi
  git init
  git add .
  git commit -m "$msg更新"
  git push -u origin master
  while [ $var1 -gt 0 ]
do 
   echo -ne $var1
   (( var1-- ))       
   sleep 1
   echo -ne "\r   \r" #清空行
done
# cd - # 退回开始所在目录
# rm -rf docs/.vuepress/dist
