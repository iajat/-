# 项目名称

selectClass -- Vue.js

后端：（后端不是我写的，和我一起合作的人写的）----我只会一点点spring-boot,嘿嘿
https://github.com/Daren-star/sscm   ---汤达人


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

bash
Copy code
npm run serve
访问 http://localhost:8080 即可开始使用系统。

项目结构
css
Copy code
selectClass--vue/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── router/
│   ├── services/
│   ├── views/
│   ├── App.vue
│   └── main.js
├── screenshot.png           项目截图
└── README.md                项目文档
注意事项
该项目为示例项目，仅包含基本的功能和样式，未考虑实际数据和后端服务。
在实际项目中使用前，请根据实际需求进行适当的修改和扩展。