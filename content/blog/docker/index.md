---
title: "从零开始学docker"
date: "2019-01-09"
description: "从零使用docker构建一个web应用并发布到阿里云"
---
> 这篇文章是一篇发布web应用的实战文章，不会详细介绍docker原理、优缺点等。因为我刚开始学，还没有get到。
## docker简介
docker是一个开源的应用容器引擎，可以为我们提供安全、可移植、可重复的自动化部署的方式。docker采用虚拟化的技术来虚拟化出应用程序的运行环境。如上图一样。docker就像一艘轮船。而轮船上面的每个小箱子可以看成我们需要部署的一个个应用。使用docker可以充分利用服务器的系统资源，简化了自动化部署和运维的繁琐流程,减少很多因为开发环境中和生产环境中的不同引发的异常问题。从而提高生产力。
  docker三个核心概念如下：

- 镜像（images）：一个只读的模板，可以理解为应用程序的运行环境，包含了程序运行所依赖的环境和基本配置。相当于上图中的每个小箱子里面装的东西。

- 仓库（repository）：一个用于存放镜像文件的仓库。可以看做和gitlab一样。

- 容器（container）：一个运行应用程序的虚拟容器，他和镜像最大的区别在于容器的最上面那一层是可读可写的。 相当于上图中的每个小箱子里。

## 构建web应用
我们前端的web应用基本是单页应用，以我搭建博客为例子。我使用的是vuepress(一个很好的以vue为基础的工具)。
在根目录创建一个`dockerfile`文件并搭配nginx。其配置如下：
```Dockerfile
From node:alpine

# 设置环境变量
ENV NODE_ENV product

# 缓存node_modules
COPY package*.json /app/

# 工作目录
WORKDIR /app

# 安装依赖
RUN npm install -registry=https://registry.npm.taobao.org

# 拷贝源代码到工作目录
COPY . /app

# 打包
RUN npm run build

# 暴露端口
EXPOSE 80

# 启动nginx，关闭守护式运行，否则容器启动后会立刻关闭
CMD ["nginx", "-g", "daemon off;"]
```

```nginx
server {
    listen      80;
    server_name localhost;

    location / {
        # web应用的内容
        root    /app/docs/.vuepress/dist;
        index   index.html index.htm;
        try_files   $uri $uri/ /index.html;
    }

    error_page  500 502 503 504 /50x.html;
    location = /50x.html {
        root    /usr/share/nginx/html;
    }
}

```


- 构建镜像  
  ```docker build -t hanxy/vuepress_blog .```,使用docker images就能看到如下：

  ![docker镜像](../../static/docker-images.png)

新建的镜像版本都是latest,这时我们若需要管理版本，则可以使用docker tag功能
```docker tag imageId hanxy/vuepress_blog:v1.0```,镜像名称后面跟随的就是版本号



- 启动容器
  ```docker run -d --name vuepress_blog -p 8080:80 hanxy/vuepress_blog```
  参数说明：
  - -d
  -  --name给容器创建名称
  -  -p应用访问的端口对应docker暴露端口，-P对应的是随机端口

  创建完容器后，使用docker ps就可以看到正在运行的容器，此时打开页面http://localhost:8080就能看到我们构建的应用。
  停止应用：docker stop containerId,启动容器docker start containerId

- 创建自己的镜像并推送dockerhub
   dockerhub是一个类似npm的仓库管理工具，我们可以托管自己的镜像。例如我想要使用mysql这个镜像，我们使用docker search查找想要的镜像，使用docker pull拉去对用的镜像到本地，免去繁琐的mysql安装。我们推送自己的镜像也是很容易的：
   1. 首先我们得创建自己的docker账号
   2. docker login输入自己的账号和密码
   3. docker push 用户名/容器名，比如我的上面的容器：hanxy/vuepress_blog

- 发布阿里云服务器
  1. 首先要在阿里云服务器上创建docker工具，安装方法大家自行搜索
  2. 从自己的dockerhub上拉去镜像运行即可

## 总结
以上我只是我刚入门到发布自己的博客的实践过程，内容是相当简陋，算是给大家入门介绍一点东西。docker还是比较深东西比较多，后续还有k8s这些，想要更深入了解还🉐️靠大家自己多摸索实践。

## 参考
- [写给前端工程师看的Docker教程-实战篇](https://zhuanlan.zhihu.com/p/84894157)
- [阿里云CentOS 7上安装配置Docker](https://yq.aliyun.com/articles/336442)
- [Docker从入门到实战](https://yeasy.gitbooks.io/docker_practice/install/centos.html)