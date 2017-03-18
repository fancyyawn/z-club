# koa2重写Node.js实战中的N-club

## step1 package.json， 依赖管理

```
config-lite: 多环境配置
crypto: md5
gravatar: 用于根据邮箱获取头像
koa: web框架
koa-bodyparser: ctx.request.body
koa-flash: 用于跳转时记录信息
koa-generic-session: 会话通用框架
koa-generic-session-mongo: 会话存储在mongodb
koa-gzip: 压缩
koa-router: 路由，注意用koa2命令来安装npm i -S koa-router@next
koa-logger: 框架日志
koa-scheme: 验证和过滤
koa-static: js，css等
koa-views: hbs，ejs等模板解析
markdown-it: md转html
moment: 日期格式化
mongoose: mongodb存储
validator: 验证条件
```

## step2 app.js, koa组件配置
1. logger
2. bodyparser
3. static
4. session
5. flash
6. gzip
7. scheme
8. viewData
9. views
10. router
11. errorHandler
12. app.listen

## step3 routes，路由配置
* / -> /topics
* users
    * login
    * logout
    * signup
* topics
    * create
    * :id
    * :id/comment
    * /
    * user/:name

## step4 views, 视图设计
到这一步结束，应该能将所有的主流程走一遍
* header & footer
* login
* signup
* topic
    * create
    * list
    * detail
    * comment
    * users-list   
    
## step5 service, 服务配置

* user
    * addUser
    * getUserById
    * getUserByName
* topic
    * addTopic
    * getTopicById
    * getTopicsByTab
    * getTopicsByName
    * incCommentById
    * getNoReplyTopics
    * getTopicsCount
* comment
    * addComment
    * getCommentsByTopicId

## step6 models, 领域设计和Mongodb存储

* User
* Topic
* Comment


## step7 完善每个流程

* 注册流程
* 登录流程
* 话题列表
* 创建话题
* 话题详情
* 添加评论
