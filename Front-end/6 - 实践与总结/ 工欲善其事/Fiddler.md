# 工欲善其事必先利其器 —— Fiddler

> 内容主要来自慕课网课程《Fiddler工具使用》及日常实际使用总结

## 1. 用途
* 监控http/https请求
* 截获请求内容 - 分析请求数据、响应数据
* 伪造请求 - 实现前后端调试
* 测试网站性能 - 性能优化的依据
* 通过插件实现其它高级功能 - 网络限速等
              
## 2. 工作原理
![屏幕快照 2019-11-10 上午11.00.41.png](https://i.loli.net/2019/11/10/5esLt7rWZDOzIC3.png)

在客户端与服务端之间建立了一个代理服务器，客户端发起的所有请求，都要通过Fiddler代理服务器才能到达最终的服务器。

创建代理服务器的方法是，Fiddler篡改浏览器或其它客户端应用的代理服务器设置(以IE为例：Internet选项 - 局域网设置 - 代理设置)。

代理方式分为：

* **流模式(streaming)** 截获的响应数据实时返回给客户端，该方式更接近浏览器实际情况；

* **缓冲模式(buffering)** 截获一次http的所有响应数据后再返回给客户端。
                    
## 3. 功能说明
![timg.jpeg](https://i.loli.net/2019/11/10/jZYHnrJ7cyOxkQM.jpg)

* Tools         配置host代理，即将某个域名请求，全部代理到指定的ip上


* Replay        回放按钮，选中后重新发起请求
* Stream        模式切换，流模式、缓冲模式
* Any Process   精准指定监控对象：点击后，用靶心图标去选中监控对象(如Chrome浏览器)
* TextWizard    编/解码按钮：可对URL中参数编解码，**可做为日常通用字符转码工具使用(URL编解码、base64编解码等等)**！！


* Capturing     启用、停止Fiddler
* All Process   过滤会话内容：所有应用、仅浏览器、所有都不


* Statistics    数据统计，反应一个请求的性能指标
* Inspectors    对请求解包，可查看请求、响应的数据
* AutoResponder 文件代理，将请求代理到本地或一个想要请求的ip上
* Composer      前后端接口连调，实现不通过前端代码，就能模拟发送请求
* Timeline      网站性能分析

## 4. 实战应用

#### host配置
**场景：** 开发环境希望通过域名请求开发环境而非线上环境资源

**方法：** 

Tools —— HOSTS... —— 添加 `IP 域名` 规则

例如：183.129.190.11:8080 www.baidu.com

#### 特定资源代理
**场景：** 开发环境开发代码时，希望请求测试环境接口数据而非开发环境数据(可能开发环境缺少数据)。不仅适合接口也适合各种资源(js、css、图片等)的代理

**方法：** 

AutoResponder —— 添加对应资源路径组合

例如：
https://d585tldpucybw.cloudfront.net/sfimages/default-source/return-of-ui/ninjas-action.png
D:\images\ninjas-action.png

#### 模拟接口请求

**场景：** 前端代码暂未完成，而接口已完成，希望模拟前端请求验证接口是否可用

**方法：** 

Composer —— 输入请求地址 —— 执行请求查看响应