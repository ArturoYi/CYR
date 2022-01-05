# 确保脚本抛出遇到的错误
set -e


# 获取当前时间

# # 生成静态文件_
npm run docs:build

# # 进入生成的文件夹


#验证你是否关联仓库
# deploy to github
msg=`date +%Y-%m-%d`
end=10
githubUrl=git@github.com:540765/CYR.git

if [ -a "$GITHUB_TOKEN" ] 
then
  echo "有$GITHUB_TOKEN"
else
  git config --global user.name "540765"
  git config --global user.email "3062995371@qq.com"
  git init
  git add .
  git commit -m "更新"
  git remote add origin @github.com:540765/CYR.gi
  git push -u origin master
fi
if [ "$?"=0 ]
then
  echo "无错误"
else
  git config --global user.name "540765"
  git config --global user.email "3062995371@qq.com"
  git add .
  git commit -m "更新"
  git push -u origin master
fi
var1=10
while [ $var1 -gt 0 ]
do 
   echo -ne $var1
   (( var1-- ))       
   sleep 1
   echo -ne "\r   \r" #清空行
done
# git init
# git add .
# git commit -m "更新"
# #这里我没有再去关联仓库，需要的请手动补上，
# # git remote add origin @github.com:540765/CYR.git
# git push -u origin master

# cd - # 退回开始所在目录
# rm -rf docs/.vuepress/dist
