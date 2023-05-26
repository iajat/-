# 项目名称

selectClass -- Vue.js

后端：（后端不是我写的，和我一起合作的人写的）----我只会一点点spring-boot,嘿嘿

https://github.com/Daren-star/sscm   


## 项目简介

这是一个基于 Vue.js 的课程选择系统的示例项目。该项目实现了一个简单的学生选课系统，包括学生登录、课程浏览和选课功能，有一个老师端和院长的后台。

该项目使用 Vue.js 框架构建用户界面，通过模拟数据实现前端功能，不涉及后端服务和数据库。

## 功能特点

- 学生登录：学生可以通过提供用户名和密码进行登录，并获取访问系统的权限。
- 课程浏览：学生可以浏览系统中提供的课程列表，查看每门课程的详细信息。
- 选课功能：学生可以选择感兴趣的课程进行选课。
- 老师登录：老师可以通过提供用户名和密码进行登录，并获取访问系统的权限。
- 课程详细：老师可以查看自己所教的课的情况，选择人数以及课程剩于人数
- 成绩打分：老师可以给学生打分，以平时成绩和期末成绩组成最终成绩
- 后台功能：有一切权限，可以对任何课程老师学生进行crud（你懂的）
## 技术栈

- Vue.js
- Vue Router
- Axios
- Element UI

## 环境要求

- Node.js 12+

## 快速开始

1. 克隆项目到本地：

   ```bash
   git clone https://github.com/iajat/selectClass--vue.git
进入项目目录：

bash
Copy code
cd selectClass--vue
安装依赖：

bash
Copy code
npm install
启动开发服务器：

## 项目结构

```plaintext
selectClass--vue/
├── public/                 # 公共资源目录
├── src/                    # 源代码目录
│   ├── assets/             # 静态资源
│   ├── components/         # 组件
│   ├── router/             # 路由配置
│   ├── services/           # 服务（API 请求等）
│   ├── views/              # 视图组件
│   ├── App.vue             # 根组件
│   └── main.js             # 入口文件
├── screenshot.png           # 项目截图
└── README.md                # 项目文档


public/：存放公共资源文件的目录，如 HTML 模板、图片等。
src/：项目的源代码目录。
assets/：存放静态资源，如图片、样式表等。
components/：包含各种可复用的组件。
router/：存放路由相关的配置文件。
services/：提供服务的模块，如 API 请求等。
views/：存放视图组件，每个组件对应一个页面。
App.vue：根组件，作为应用的主入口。
main.js：应用的入口文件，用于初始化 Vue 实例和加载所需的插件等。