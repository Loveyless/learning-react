# Dockerfile

# 第一步：选择基础镜像 (选定一个标准化的空集装箱作为起点)
# 我们不需要从零开始造轮子，我们基于官方的 Nginx 镜像来构建。
# 'alpine' 版本是一个极度轻量化的 Linux，让我们的最终镜像非常小。
FROM nginx

# 第二步：将你的文件复制到镜像中 (把你的家具搬进集装箱)
# 'COPY' 指令有两个参数：源路径 和 目标路径。
# 源路径 '.' 代表 Dockerfile 所在的当前目录。
# 目标路径 '/usr/share/nginx/html' 是 Nginx 镜像中默认存放网页文件的目录。
# 这行命令的意思是：“把当前文件夹里的所有东西，复制到镜像里 Nginx 的网站根目录去。”
# COPY . /usr/share/nginx/html
# 不再使用 'COPY . ...'，而是明确指定复制 index.html
# 这样更精确，可以避免把 Dockerfile 本身也复制进去
COPY ./index.html /usr/share/nginx/html/index.html



# 就这么简单！ 这个 Dockerfile 告诉 Docker 两件事：

# 1. 去找一个官方的、轻量级的 Nginx 镜像。
# 2. 把我们本地的 index.html 文件（以及 Dockerfile 自己，虽然没什么用）复制进去，覆盖掉 Nginx 原来的默认欢迎页面。

# 3. 构建镜像 (让建筑队开工！)
# 现在，蓝图和材料都准备好了。我们在 my-first-docker-app 文件夹里，打开终端（命令行），然后运行下面的命令：
# docker build -t sandbox-website .

# 我们来拆解这个新命令：
# docker build: 告诉 Docker，我们要“构建”一个新镜像。
# -t sandbox-website: -t 代表 tag (标签)，给你的新镜像打个标签，也就是取个名字。我们叫它 sandbox-website。
# .: 这个点非常重要！ 它代表“构建上下文 (Build Context)”。
# 意思是：“Docker 你好，请在当前目录下寻找 Dockerfile 作为蓝图，并把当前目录下的所有文件都作为构建材料。”

# 4. 查看镜像
# 现在，你的 Dockerfile 已经构建好了，你可以用下面的命令来查看它：
# docker images

# 5. 运行镜像
# 现在，你的 Dockerfile 已经构建好了，你可以用下面的命令来运行它：
# docker run --name my-sandbox-website -p 8888:80 -d sandbox-website
# --name my-site: 给容器取名叫 my-site。
# -p 8888:80: 我用了 8888 端口，以防跟你之前运行的 8080 端口冲突。意思是把主机的 8888 端口映射到容器的 80 端口。
# -d: 后台运行。
# sandbox-website: 这里用的是我们刚刚构建的镜像的名字！

# 现在，再次打开你的浏览器，访问 http://localhost:8888。
# 你看到的不再是 Nginx 的默认欢迎页，而是我们自己编写的、显示 “Hello from My First Docker Image!” 的漂亮页面！