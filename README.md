##### 说明：

该vue项目是我自己自学编写的第一个项目，存在许多问题，使用不是很灵活，存在冗余部分；

本库的内容是论坛的前端部分，另外一个论坛库中有完整的前后端系统，包含后端代码以及打包好的前端代码。（完整前后端不分离项目库地址：https://github.com/linkayfe/school-s-forum---java  ）

前端使用的是vue-cli搭建的框架，使用组件化的方式编写页面，复用性高，此外样式较多是bootstrap，一小小部分使用了element-ui。

##### 关于保存用户的登录状态：

我使用了vuex的Store将登录的状态保存到sessionStorage中，需要判断登录状态时可以从中取出数据进行判断，登录后取出的数据应当是账号，如未登录则为默认值-1。详细配置内容可见vuex/store.js

##### 路由的使用：

路由的配置文件在router/index.js中，通过uri的内容展示相应的组件内容，真的很方便

##### 组件说明：

| 组件名           | 描述                                           |
| ---------------- | ---------------------------------------------- |
| App              | 最外层的组件，所有组件都在该组件中展示         |
| Home             | 展示首页内容的组件                             |
| Carousel         | 轮播图（能轮播，但只能看看图片，没有连接帖子） |
| Expression       | 发帖或回贴时用到的表情框                       |
| Form             | 用户登录组件                                   |
| BackToTop        | 回到顶部组件                                   |
| ListGroup        | 首页轮播图右侧帖子列表组件                     |
| Login            | 登录模态框，Form组件在其内部                   |
| Navbar           | 选择版块的导航栏组件                           |
| OthersPersonal   | 展示他人个人信息的组件                         |
| PersonalInfo     | 展示个人信息的组件                             |
| PersonalPrivacy  | 个人主页组件                                   |
| PostPlate        | 添加版块的组件                                 |
| PromotionModal   | 修改用户权限的组件                             |
| PublishForum     | 发表帖子的组件                                 |
| SimplePost       | 简要帖子的组件，可复用于展示帖子的简要部分     |
| SuperController  | 管理员界面                                     |
| Title            | 位于页面页头的组件                             |
| UpdatePass       | 修改密码的组件                                 |
| UpdatePlateModal | 修改版块的组件                                 |

