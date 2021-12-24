<h1 align="center">IU</h1>

基于vuepress.2x构建，很多朋友会选择更快速的 Gitee Pages 部署项目，但是它不像 GitHub Pages 那样，一提交代码就能自动更新 Pages，这里你可以参考[yanglbme](https://github.com/yanglbme)开发的[Gitee Pages Action](https://github.com/marketplace/actions/gitee-pages-action)，注：首次需要**手动**登录 Gitee ，点击“启动”进行 Gitee Pages 服务的部署。
## 构键
你可以从一个主题入手：先构键自己的项目。
这里推荐你两个主题(点击logo查看)：
<p align="center">
<a href="https://vuejs.org" target="_blank" rel="noopener noreferrer"><img width="150" src="https://i.loli.net/2020/01/13/TPKA1wp6s4ufSm2.png" alt="Vue logo">
</a>
</p>

<p align="center">
<a href="https://xugaoyi.com/" target="_blank" rel="noopener noreferrer"><img width="180" src="https://cdn.jsdelivr.net/gh/xugaoyi/image_store/blog/20200409124835.png" alt="logo">
</a>
</p>

使用感受：<br/>
1.[vuepress-theme-reco](https://github.com/vuepress-reco/vuepress-theme-reco)，是一款优秀且活跃的主题，如果你喜欢动手，非常值得尝试，自定义程度高，相信不少人都在此主题上魔改，此主题作者也一直在更新，紧跟vuepress2.x的2.x尝鲜版本也已经可以体验，冲冲冲。<br/>
2.[vuepress-theme-voding](https://github.com/xugaoyi/vuepress-theme-vdoing)，支持个性化博客配置，可能首次使用比较慢，但你弄懂后会发现它十分完善且功能齐全，适合开箱即用。但如果你想基于此主题增加自定义修改会相对困难。
## 你想开箱即用

<p align="center">
  <a href="https://github.com/yanglbme/gitee-pages-action">
    <img src="https://cdn.jsdelivr.net/gh/yanglbme/gitee-pages-action@main/images/logo.png">
  </a>
</p>

###  1.创建工作流

在你的 GitHub 项目`.github/workflows/`文件夹下创建一个`.yml`文件，如`sync.yml`，内容如下：

```yml
名称：同步
上：
  推：
    分支：[主要]
  工作流调度：
工作：
  构建：
    运行：ubuntu-latest
    步骤：
      -名称：同步到 Gitee
        用途：wearerequired/git-mirror-action@master
        环境：
          #注意在 Settings->Secrets 配置 GITEE_RSA_PRIVATE_KEY
          SSH_PRIVATE_KEY : ${{ secrets.GITEE_RSA_PRIVATE_KEY }}
        与：
          #注意替换为你的GitHub源仓库地址
          源代码库：git@github.com:doocs/leetcode.git
          #注意替换为你的Gitee目标仓库地址
          目的地回购：git@gitee.com：Doocs / leetcode.git
      -名称：构建 Gitee 页面
        用途：yanglbme/gitee-pages-action@main
        与：
          #注意替换为你的Gitee用户名
          gitee-用户名：yanglbme
          #注意在 Settings->Secrets 配置 GITEE_PASSWORD
          gitee-密码：${{secrets.GITEE_PASSWORD }}
          #注意替换为你的Gitee仓库，名认真地大小写，请及时填写，否则会出错
          gitee-repo : doocs/leetcode
          #要开发的分支，默认是master，其他分支，则需要指定（指定分支的必须存在）
          分支：主要
```

## 根据需要修改参数

| 参数 | 描述 | 是否必传 | 默认值 | 示例 |
| ---------------- | ----------------------------- | -------- | -------- | ------------------------------- |
| `gitee-用户名` | Gitee 用户名 | 是| - | `yanglbme` |
| `gitee-密码` | Gitee 密码 | 是| - | `${{secrets.GITEE_PASSWORD }}` |
| `gitee-repo` | Gitee 仓库（严格范围大小写） | 是| - | `doocs/leetcode` |
| `分支` | 要开发的分支（必须存在） | 否 | `大师` | `主要` |
| `目录` | 要部署的分支上的目录| 否 | | `src` |
| `https` | 必须强制使用HTTPS | 否 | `真实` | `假` |

先使用[ wearerequired/git-mirror-action ](https://github.com/wearerequired/git-mirror-action)将GitHub仓库同步到Gitee仓库，再使用[ yanglbme/gitee-pages-action ](https: //github.com/yanglbme/gitee-pages-action) 实现Gitee Pages的自动部署。


###  2.配置密码

密钥的配置步骤如下（可展开看示例图）：

<details>
<summary>a. 在命令行终端或 Git Bash 使用命令 <code>ssh-keygen -t rsa -C "youremail@example.com"</code> 生成 SSH Key，注意替换为自己的邮箱。生成的 <code>id_rsa</code> 是私钥，<code>id_rsa.pub</code> 是公钥。(⚠️注意此处不要设置密码，生成的公私钥用于下面 GitHub / Gitee 的配置，以保证公私钥成对，否则从 GitHub -> Gitee 的同步将会失败。)</summary>
<img src="https://cdn.jsdelivr.net/gh/yanglbme/gitee-pages-action@main/images/gen_ssh_key.png" alt="gen_ssh_key">
</details>
<details>
<summary>b. 在 GitHub 项目的「Settings -> Secrets」路径下配置好命名为 <code>GITEE_RSA_PRIVATE_KEY</code> 和 <code>GITEE_PASSWORD</code> 的两个密钥。其中：<code>GITEE_RSA_PRIVATE_KEY</code> 存放 <code>id_rsa</code> 私钥；<code>GITEE_PASSWORD</code> 存放 Gitee 帐号的密码。</summary>
<img src="https://cdn.jsdelivr.net/gh/yanglbme/gitee-pages-action@main/images/add_secrets.png" alt="add_secrets">
</details>
<details>
<summary>c. 在 GitHub 的个人设置页面「<a href="https://github.com/settings/keys">Settings -> SSH and GPG keys</a>」配置 SSH 公钥（即：<code>id_rsa.pub</code>），命名随意。</summary>
<img src="https://cdn.jsdelivr.net/gh/yanglbme/gitee-pages-action@main/images/add_ssh_key_github.png" alt="add_ssh_key_github">
</details>
<details>
<summary>d. 在 Gitee 的个人设置页面「<a href="https://gitee.com/profile/sshkeys">安全设置 -> SSH 公钥</a>」配置 SSH 公钥（即：<code>id_rsa.pub</code>），命名随意。</summary>
<img src="https://cdn.jsdelivr.net/gh/yanglbme/gitee-pages-action@main/images/add_ssh_key_gitee.png" alt="add_ssh_key_gitee">
</details>

###  3.运行结果

如果一切配置正常，并成功触发 [Gitee Pages Action](https://github.com/marketplace/actions/gitee-pages-action) ，Gitee Pages Action 会打印出成功的结果。并且，我们会在 Gitee 公众号收到一条登录通知。这是 Gitee Pages Action 程序帮我们登录到 Gitee 官网，并为我们点击了项目的部署按钮。

```bash
Run yanglbme/gitee-pages-action@main
  with:
    gitee-username: yanglbme
    gitee-password: ***
    gitee-repo: doocs/leetcode
    branch: main
    https: true
/usr/bin/docker run --name e28490f27de0ee43bb49109a40cea0e43202d2_d4911a --label e28490 --workdir /github/workspace --rm -e INPUT_GITEE-USERNAME -e INPUT_GITEE*** INPUT_GITEE-REPO -e INPUT_BRANCH -e INPUT_DIRECTORY -e INPUT_HTTPS -e HOME -e GITHUB_JOB -e GITHUB_REF -e GITHUB_SHA -e GITHUB_REPOSITORY -e GITHUB_REPOSITORY_OWNER -e GITHUB_RUN_ID -e GITHUB_RUN_NUMBER -e GITHUB_RETENTION_DAYS -e GITHUB_RUN_ATTEMPT -e GITHUB_ACTOR -e GITHUB_WORKFLOW -e GITHUB_HEAD_REF -e GITHUB_BASE_REF -e GITHUB_EVENT_NAME -e GITHUB_SERVER_URL -e GITHUB_API_URL -e GITHUB_GRAPHQL_URL -e GITHUB_REF_NAME -e GITHUB_REF_PROTECTED -e GITHUB_REF_TYPE -e GITHUB_WORKSPACE -e GITHUB_ACTION -e GITHUB_EVENT_PATH -e GITHUB_ACTION_REPOSITORY -e GITHUB_ACTION_REF -e GITHUB_PATH -e GITHUB_ENV -e RUNNER_OS -e RUNNER_ARCH -e RUNNER_NAME -e RUNNER_TOOL_CACHE -e RUNNER_TEMP -e RUNNER_WORKSPACE -e ACTIONS_RUNTIME_URL -e ACTIONS_RUNTIME_TOKEN -e ACTIONS_CACHE_URL -e GITHUB_ACTIONS=true -e CI=true -v "/var/run/docker.sock":"/var/run/docker.sock" -v "/home/runner/work/_temp/_github_home":"/github/home" -v "/home/runner/work/_temp/_github_workflow":"/github/workflow" -v "/home/runner/work/_temp/_runner_file_commands":"/github/file_commands" -v "/home/runner/work/leetcode/leetcode":"/github/workspace" e28490:f27de0ee43bb49109a40cea0e43202d2
[2021-11-27 20:16:30] Welcome to use Gitee Pages Action ❤
📕 Getting Started Guide: https://github.com/marketplace/actions/gitee-pages-action
📣 Maintained by Yang Libin: https://github.com/yanglbme
[2021-11-27 20:16:34] Login successfully
[2021-11-27 20:16:35] Rebuild Gitee Pages successfully
[2021-11-27 20:16:35] Success, thanks for using @yanglbme/gitee-pages-action!
```

<img src="https://cdn.jsdelivr.net/gh/yanglbme/gitee-pages-action@main/images/action.png" alt="action_result">

<img src="https://cdn.jsdelivr.net/gh/yanglbme/gitee-pages-action@main/images/wechat_notification.jpg" alt="add_ssh_key_gitee" style="width: 750px; height: 1334px;" />

## 错误及解决方案
| #   | 错误 |              解决方案            |
| --- | ----------- | ------------|
| 1   | Error: Wrong username or password, login failed .  | 帐号或密码错误，请检查参数 `gitee-username`、`gitee-password`是否准确配置。  |
| 2   | Error: Need captcha validation, please visit https://gitee.com/login, login to validate your account.   | 需要图片验证码校验。可以手动登录 Gitee 官方，校验验证码。  |
| 3   | Error: Need phone captcha validation, please follow wechat official account "Gitee" to bind account to turn off authentication.                                                                                                                                                                                                                        | 需要短信验证码校验。可以关注 Gitee 微信公众号，并绑定 Gitee 帐号，接收登录提示。[#6](https://github.com/yanglbme/gitee-pages-action/issues/6)           |
| 4   | Error: Do not deploy frequently, try again one minute later.                                                                                                                                                                                                                                                                                           | 短期内频繁部署 Gitee Pages 导致，可以稍后再触发自动部署。                                                                                               |
| 5   | Error: Deploy error occurred, please check your input `gitee-repo`.                                                                                                                                                                                                                                                                                    | `gitee-repo` 参数格式如：`doocs/leetcode`，并且严格区分大小写，请准确填写。[#10](https://github.com/yanglbme/gitee-pages-action/issues/10)              |
| 6   | Error: Unknown error occurred in login method, resp: ...                                                                                                                                                                                                                                                                                               | 登录出现未知错误，请在 [issues](https://github.com/yanglbme/gitee-pages-action/issues) 区反馈。                                                         |
| 7   | Error: Rebuild page error, status code: xxx                                                                                                                                                                                                                                                                                                            | 更新 Pages 时状态码异常，请尝试再次触发 Action 执行。也可能为 gitee pages 未初始化，第一次需要手动部署 gitee pages。                                    |
| 8   | Error: HTTPSConnectionPool(host='gitee.com', port=443): Read timed out. (read timeout=6)<br><br>Error: HTTPSConnectionPool(host='gitee.com', port=443): Max retries exceeded with url: /login (Caused by ConnectTimeoutError(<urllib3.connection.HTTPSConnection object at 0x7f6c889d42e8>, 'Connection to gitee.com timed out. (connect timeout=6)')) | 网络请求出错，请尝试 Re-run jobs 。[#27](https://github.com/yanglbme/gitee-pages-action/issues/27)                                                      |
| 9   | git@github.com: Permission denied (publickey).<br>fatal: Could not read from remote repository.<br>Please make sure you have the correct access rights and the repository exists..                                                                                                                                                                     | SSH 公私钥配置有问题，或是使用了带密码的私钥，请参照上文提及的密钥配置步骤进行相应配置。[#29](https://github.com/yanglbme/gitee-pages-action/issues/29) |
| 10  | Hexo Gitee Pages 自动部署站点问题。                                                                                                                                                                                                                                                                                                                    | [@No5972](https://github.com/No5972) 详细给出了一种解决方案。[#34](https://github.com/yanglbme/gitee-pages-action/issues/34)                            |
| ...... | ......   |......|
## 自动打包部署

这个文件非必须，完成上面部署你只需要要很简单就可以完成部署，下面是更进一步。
在你项目根目录下新建文件：`deploy.sh`,


```yml
# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

#验证你是否关联仓库,如果你已经成功尝试上面github同步到gitee，你可以不用重新关联仓库
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
```
