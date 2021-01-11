## 一、项目目标

* 理解 RESTful API 的 6 个限制和若干最佳实践
* 掌握 Koa2、Postman、MongoDB、JWT 等技术
* 运用上述技术搭建仿知乎 RESTful API
* 掌握阿里云线上部署方法

## 二、REST

### what

* 万维网软件架构风格
* 用来创建网络服务

### Why

* **Re**presentational **S**tate **T**ransfer   -  数据在互联网传输时的表现形式
* Representational 数据的表现形式(JSON、XML...)
* State 当前的状态或者数据
* Transfer 数据传输

### 6个限制

#### 1. 客户端-服务端（Client-Server）

* 关注点分离
* 服务端专注数据存储，提升了简单性
* 前端专注于用户界面，提升了可移植性

#### 2. 无状态

* 所有用户会话信息都保存在客户端
* 每次请求必须包括所有信息，不能依赖上下文信息
* 服务端不用保存会话信息，提升了简单性、可靠性、可见性

#### 3. 缓存

* 所有服务端响应都要被标为可缓存或不可缓存
* 减少前后端交互，提升了性能

#### 4. 统一接口（重要）

* 接口设计尽可能统一通用，提升了简单性、可见性
* 接口与实现解耦，使前后端可以独立开发迭代

#### 5. 分层系统

* 每层只知道相邻的一层，后面隐藏的就不知道了
* 客户端不知道是和代理还是真实服务器通信
* 其它层：安全层、负载均衡层、缓存层等

#### 6. 按需代码（可选）

* 客户端可以下载运行服务端传来的代码（比如 JS 代码，通过 eval 执行）
* 通过减少一些功能，简化了客户端

### 统一接口的限制

#### 1. 资源的标识

* 资源是任何可以命名的事物，比如用户、评论等
* 每个资源可以通过 URI 被唯一的标识

#### 2. 通过表述来操作资源

* 表述是 Representation，比如 JSON、XML等
* 客户端不能直接操作（比如通过 SQL）服务端资源
* 客户端应该通过表述（比如 JSON）来操作资源

#### 3. 自描述消息

* 每个消息（请求或响应）必须提供足够的信息让接受者理解
* 媒体类型（application/json、application/xml）
* HTTP 方法：GET（查）、POST（增）、DELETE（删）
* 是否缓存（Cache-Control）

#### 4. 超媒体作为应用状态引擎

* 点击链接跳转到另一个网页

### RESTful API

#### 1. 组成

* 基本的 URI
* 标准的 HTTP 方法，如 GET、POST、PUT等
* 传输的数据的媒体类型，如 JSON、XXML

#### 2. 设计规范

* URI 使用名词，尽量用复数，如 /users
* URI 使用嵌套表示关联关系，如 /users/12/repos/5
* 使用正确的 HTTP 方法，如 GET/POST/PUT/DELETE
* 不符合 CRUD 的情况：POST+动词/action/子资源

#### 3. 响应设计规范

* 查询，可通过参数限定数据范围
* 分页
* 字段过滤，可通过指定字段限定返回哪些字段
* 状态码
* 错误处理信息
* 增删改查返回响应：(最佳实践)
  * 查 - 查找的内容
  * 增、改 - 增、改的内容
  * 删 - 204状态码

#### 4. 安全

* HTTPS
* 鉴权，通过登录获取用户信息
* 限流，请求头部记录请求次数，超过限额时报错

#### 5. 开发者友好

* API 文档
* 超媒体

## 三、Koa

### 1. 一句话简介

基于 Node.js 的下一代 Web 框架

### 2. 洋葱模型

* async、await
* ctx、next

### 3. 常用 koa 中间件

* nodemon	-	热更新
* koa-router  -    路由（需实例化 new Router()，并注册到koa上 app.use(router.routes())）
* Koa-bodyparser   -   获取请求体，仅支持 JSON 和 form 格式的请求体
* koa-body  - 获取请求体，不仅支持 JSON 和 form，还支持文件格式，可以应对文件(图片等)上传的场景
* Koa-static - 生成一个静态服务，可通过配置，指定一个文件夹作为静态服务的目标目录，然后就可以通过http访问到该文件夹下的文件了
* Koa-json-error  -   错误处理  
* Cross-env   -   跨平台设置环境变量
* Koa-parameter  -  校验请求参数
* Mongoose  -  连接mongodb数据库
* jsonwebtoken  -  生成JWT以及验证
* koa-jwt  -  用户认证和授权

### 4. 常用状态码

* 404 请求不存在
* 405 请求方法不允许（有能力实现，但是不允许你这样请求，例如 koa-router 有能力实现 put 方法，但是不允许这个接口这样用）
* 501 请求方法不支持（没有能力支持该请求方法，例如 koa-router 仅支持常用方法，无法支持 link 等不常用方法）
* 412 先决条件失败（如 路由参数值超出有效范围）
* 500 运行时错误（如  a.b a为undefined）
* 422 无法处理的实体（请求参数校验未通过）
* 409 已存在，导致冲突
* 401 不存在  
* 403 未授权

### 5. 路由存在的意义

* 处理不同的 URL
* 处理不同的 HTTP 方法
* 解析 URL 上的参数

### 6. http options 方法

作用：

* 检测接口所支持的请求方法
* CORS 中的预检请求

koa-router 中的 allowedMethods 方法的作用：

* 响应 options 方法，返回该接口所支持的请求方法
* 相应地返回 405（不允许）和 501（没实现）

### 7. 控制器

* 拿到路由分配的任务，并执行
* 在 koa 中，控制器是中间件
* 获取 HTTP 请求参数
* 处理业务逻辑
* 发送 HTTP 响应

### 8. 获取 HTTP 请求参数

* Query String，如 ?q=keyword，往往是可选的参数，长度有限制，不安全 
* Router Parames，如 /users/:id，路由参数是必选的
* Body，如 { name: 'lilei' }
* Header，如 Accept、Cookie

### 9. 发送 HTTP 响应

* 发送 Status，如 200/400 等
* 发送 Body，如 { name: 'lilei' }
* 发送 Header，如 Allow、Content-Type

### 10. 编写控制器的最佳实践

* 每个资源的控制器放在不同的文件里
* 尽量使用类 + 类方法的形式编写控制器
* 严谨的错误处理

### 11. Vs code 断点调试

* 打开带执行代码，点击 F5
* 在需要断点处设置断点
* 请求接口，查看断点处参数

### 12. 异常状况有哪些

* 运行时错误，都返回 500
* 逻辑错误，如 找不到（404）、先决条件失败（412）、无法处理的实体（参数格式不对，422）等

## 四、NoSQL 数据库

### 1. 分类

* 列存储（HBase）
* 文档存储（MongoDB）- 按JSON存储
* Key-Value存储（Redis）
* 图存储（FlockDB）
* 对象存储（db4o）
* XML存储（BaseX）

### 2. 特点

* 简单（没有原子性、一致性、隔离性等复杂规范）
* 便于横向拓展
* 适合超大规模数据的存储
* 很灵活的存储复杂结构的数据（Schema Free）

### 3. MongoDB

#### 特点

* 性能好（内存计算）
* 支持大规模数据存储（可拓展性好）
* 可靠安全（本地复制、自动故障转移）
* 方便存储复杂数据结构（Schema Free ）

#### 安装 ——> 云MongoDB ——> MongoDB Atlas

* 注册用户
* 创建集群(包含很多集合)
* 添加数据库用户
* 设置IP地址白名单
* 获取连接地址

MongoDB Atlas 账号 z_jerry2016@163.com 集群 zhihu  数据库用户 jerry 密码 jerry123

#### Mongoose 连接 MongoDB

* 连接	.connect()
* 创建 Schema    new Schema()
* 创建集合    model('User', userSchema)
* 增删改查
  * 查    .find()
  * 查找特定    findById
  * 增    new User(ctx.request.body).save()
  * 改    findByIdAndUpdate
  * 删    findByIdAndRemove

## 五、JWT

### 1. Session

* 认证：让服务器知道你是谁
* 授权：服务器授予的什么能做什么不能做的权利
* 原理：
  * 客户端向服务端发送用户名、密码等信息请求登录
  * 服务端接收到用户名、密码并查询数据库获取其它用户信息(认证、授权等)，用这些信息生成Session数据存入内存或内存数据库(例如radis)中，每条Session数据对应一个Session ID，服务端向客户端发送Session ID（有时会将整个Session数据加密成Session ID，从而无需保存在服务端，就可直接从SessionID中解密出用户信息）
  * 客户端将Session ID存在Cookie中，每次发送请求都会自动携带Cookie中的Session ID
  * 服务端接收到Session ID，会到内存或内存数据库(例如radis)中查找对应的Session数据，并解析出用户信息，从而获取认证、授权等信息，最后对请求进行响应
  * 客户端想退出登录：仅需删除Cookie中的Session ID即可
  * 服务端想强制用户退出：仅需删除内存或内存数据库(例如radis)中的Session数据即可
* 优势：
  * 相比于JWT(仅将Token存在客户端)，最大优势在于服务端可以主动清楚Session(因为Session数据存在服务端)
  * session数据保存在服务端，相对较安全
  * 结合Cookie使用，较为灵活，兼容性较好
* 劣势：
  * Session + Cookie 在跨域场景下表现不好
  * 如果是分布式部署，需要做多机共享Session机制
  * 基于Cookie的机制很容易被CSRF
  * 查询Session信息可能会有数据库查询操作，带来性能问题

### 2. JWT

* Json Web Token是一个开放标准
* 定义了一种紧凑且独立的方式，可以将各方之间的信息作为JSON对象进行传输
* 该JSON对象是可以被验证和信任的，因为是经过数字签名的
* 构成：
  * 头部（Header）：token方式、加密算法
  * 有效载荷（payload）：有效信息，进行base64UrlEncode()编码，可加密
  * 签名（Signature）：对Header和Payload部分进行签名，保证token在传输的过程中没有被篡改或者损坏
* 工作原理：
  * 客户端向服务端发送用户名、密码等信息请求登录
  * 服务端接收到用户名、密码并查询数据库获取其它用户信息(认证、授权等)，并将这些信息作为JWT的Payload，连同Header一起进行编码和加密，并添加Signature形成JWT，作为响应结果返回给客户端
  * 客户端接收到JWT后，保存在 SessionStorage或者LocalStorage中，之后每次发送请求都会在请求头中以 Authorization: Bearer ...JWT... 的形式携带JWT信息
  * 服务端接收到JWT，进行解密解码并验证有效性获知用户信息，并返回请求结果
  * 客户端想退出登录：仅需删除SessionStorage或者LocalStorage中的Session ID即可
  * 由于JWT保存在客户端，服务端无法强制客户端退出登录
* JWT vs. Session
  * 可拓展性(横向拓展)	JWT更优
  * 安全性
    * xss  js可修改sessionStorage、localStorage中的JWT，可通过签名和加密来防范
    * CSRF 跟cookie相关
    * 中间人攻击  使用https来防范
  * RESTful API  其中一个限制是“无状态”，所以选择JWT而不是Session
  * 性能
    * JWT 传输数据量大，相比Session是通过空间换取时间
    * Session 需要通过SessionId查询数据库获取真实信息 
  * 时效性
    * JWT时效性差，因为对于服务端，只能等到过期时间JWT才会销毁，而Session保存在服务端，服务端可以主动销毁
* Node 中使用 JWT
  * jsonwebtoken 的基本使用
    * 生成 token =  jwt.sign({name: 'jerry', age: '18'}, 'secret')
    * 验证 jwt.verify(token, secret)
  * Koa-jwt 内置了 jsonwebtoken，使用更便捷

## 六、上传图片

### 1. 功能点

* 基本功能：上传图片、生成图片链接
* 附加功能：限制上传图片的大小与类型、生成高中低三种分辨率的图片链接、生成CND

### 2. Koa-static - 生成一个静态服务

## 七、个人资料

### 1. schema设计

### 2. 参数校验

### 3. 字段过滤

* 设计 schema 默认隐藏部分字段
* 通过查询字符串显示隐藏字段

## 八、关注与粉丝

### 1. 需求分析

* 关注、取消关注
* 获取关注人、粉丝列表（用户-用户 多对多关系）

### 2. schema 设计

* mongoDB 规定一行数据量超过 4M 就代表数据结构设计不合理
* 一个用户可以关注多个用户（1对多），一个用户也可以被多个用户关注（多对1）。设想，一个大V可能有100万粉丝，显然按多对1设计会存在数据量过大的问题，但一个用户关注的用户量不会很多(顶多关注几千个)，所以按1对多来设计比较合理。
* 基于1对多的数据结构，获取粉丝即可变相的请求“关注了我的用户”

### 3. 接口实现

* 获取关注人(关注了谁)、粉丝列表接口
* 关注、取消关注接口

## 九、话题接口

### 1. 需求分析

* 话题的增改查
* 分页、模糊搜索
* 用户属性中的话题引用
* 关注/取消关注话题、用户关注的话题列表

### 2. schema 设计

### 3. 分页

* query传参
* mongoose 的语法糖 limit() 和 skip() 可实现分页

### 4. 模糊搜索

* query传参
* mongoose 的语法糖 正则表达式

### 5. 话题关注与取消关注接口

* 用户-话题多对多关系

## 十、问题接口

### 1. 一对多接口设计

 ### 2. 话题 - 问题多对多关系设计与实现

* 问题的话题列表
  * 一个问题的话题是有限的，但话题的问题可能是非常多的，所以我们在问题Model的Schema中添加 topics字段
* 话题的问题列表

## 十一、答案接口

### 1. 功能点

* 增删改查
* 问题-答案/用户-答案——一对多
* 赞/踩答案
* 收藏答案

### 2. 二级嵌套的增删改查

### 3. 互斥关系的赞/踩答案接口设计与实现

## 十二、评论接口

### 1. 三级嵌套的增删改查

### 2. 一级评论、二级评论

## 十三、阿里云安装Git和Node

### 1. 登录阿里云服务器

命令行输入 ssh 服务器用户名@公网IP

### 2. 下载Git

查看git官网，不同服务器系统的安装方式不同

### 3. 将代码克隆到服务器

git clone 代码的http地址

### 4. 服务器上安装 node.js

使用NodeSource(github搜索)

### 5. 用 nginx 实现端口转发

外网3000端口不开放，无法访问3000端口。外网只开放了80端口，但我的程序无法绑定到80端口，此时可用nginx将外网的80端口转发到内网的3000端口上。

* 安装 nginx

* 配置 nginx，把外网80端口转发到内网3000端口

  * vim 配置文件。  打开配置文件
  * i。进入编辑状态
  * esc按键。退出编辑状态
  * :wq。保存并退出

* 检查配置是否有误

  nginx -t

* 重启nginx

  Service nginx rstart 或 service nginx reload

### 6. 使用 PM2 管理进程(守护进程)

* 安装 PM2。  npm i pm2 -g
* 使用pm2启动程序。pm2 start app
* 停止程序。pm2 stop app
* 重启重启。pm2 restart app.  pm2 reload app
* 添加环境变量。NODE_ENV=production pm2 start app --update-env
* 查看日志  pm2 log
