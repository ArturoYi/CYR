# 确保脚本抛出遇到的错误
set -e

#进入根目录打包
var1=10

cd ../
#打包上传倒计时
  while [ $var1 -gt 0 ]
do 
   echo -ne "$var1后开始打包，你现在还可以退出——Ctrl-C"
   (( var1-- ))       
   sleep 1
   echo -ne "\r   \r" #清空行
done

# 生成静态文件_
npm run docs:build
# 进入生成的文件夹


#验证你是否关联仓库，github需要密钥推送
# deploy to github
msg=`date +%Y-%m-%d`
githubUrl=git@github.com:540765/CYR.git

if [ -z "$GITHUB_TOKEN" ] 
then
  echo "有GITHUB_TOKEN"
else
  echo "无GITHUB_TOKEN"
  git config --global user.name "540765"
  git config --global user.email "3062995371@qq.com"
  git init
  git remote add origin $githubUrl
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
done && \
# cd - # 退回开始所在目录
# rm -rf docs/.vuepress/dist
