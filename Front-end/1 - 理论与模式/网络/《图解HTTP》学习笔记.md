## 什么是`HTTP`
   > `HTTP`（HyperText Transfer Protocol，超文本传输协议）是建立在 `TCP/IP` 之上的应用层通信协议，它是 `TCP/IP` 协议族的一个子集。 —— `WebSocket` 协议也是如此。

## `TCP/IP` 协议族的四层模型      
   `TCP/IP` 协议族是互联网相关的各类协议的总称。     

   | 层级 | 包含常见协议
   |--------|--------
   | 应用层 | HTTP（超文本传输协议）、WebSocket、FTP（文本传输协议）、DNS（域名系统）
   | 传输层 | TCP（传输控制协议）、UDP（用户数据报文协议）
   | 网络层 | IP
   | 数据链路层 |

   ![tcp-ip-0](https://raw.githubusercontent.com/jerryzhangjie/image-database/master/picgo/tcp-ip-0.jpg)

   利用 `TCP/IP` 协议族进行网络通信时，会按照分层顺序，与对方进行通信。发送端从应用层往下走，接收端则从数据链路层往上走。        
   以 `HTTP` 为例：
   * 首先作为发送端的客户端在应用层（`HTTP` 协议）发出一个想看某个 `Web` 页面的 `HTTP` 请求。
   * 接着，为了传输方便，在传输层（`TCP` 协议）把从应用层处收到的数据（`HTTP` 请求报文）分割成报文段，并在各个报文段上打上标记序号后转发给网络层。
   * 在网络层（`IP` 协议），增加作为通信目的地的 `MAC` 地址后转发给链路层。这样一来，发往网络的通信请求就准备齐全了。
   * 接收端的服务器在链路层接收到数据，按序往上层发送，一直到应用层。当传输到应用层，才能算真正接收到由客户端发送过来的 `HTTP` 请求。

   发送端在层与层之间传输数据时，每经过一层时必定会被打上一个该层所属的首部信息。反之，接收端在层与层传输数据时，每经过一层时会把对应的首部消去。

## 相关协议及与`HTTP`关系

   ![tcp-ip-1](https://raw.githubusercontent.com/jerryzhangjie/image-database/master/picgo/tcp-ip-1.jpg)

   * `DNS`-应用层：在发送端，提供域名到 `IP` 地址之间的解析服务。
   * `HTTP`-应用层：在发送端，生成请求报文；在接收端，解析请求报文。
   * `TCP`-传输层：在发送端，将请求报文分割成报文段，并按顺序添加序号；在接收端，按序号以原来的顺序重组报文。此外，为确保数据正确传输，通过IP和端口号进行寻址，发送前会进行三次握手建立连接，发送后会进行四次挥手断开连接。
   * `IP`-网络层：使用`ARP`协议，根据目标`IP`地址和端口号查到对应的`MAC`地址，并添加到报文上，然后将数据转交给数据链路层。再利用路由选择机制，经过若干次中转，最终将数据传输到目标服务器。


## `HTTP`的特点
   * 无连接，即本次连接都只处理一个请求，请求结束就断开连接。为了实现长连接（或持久连接），http1.1引入了 keep-alive，允许一次 tcp 连接中进行多次http请求。
   * 无状态，即每个请求都是独立的，不保存上次通信的状态。为了实现期望的保持状态功能，http1.1引入了 Cookie 技术。有了 Cookie 再用 HTTP 协议通信，就可以管理状态了。
   * 支持 C/S 和 B/S 模式。
   * 简单快速。
   * 灵活，支持传输任意类型的数据对象。数据类型由Content-type字段标识。

## 常用请求方法

   ![methods](https://raw.githubusercontent.com/jerryzhangjie/image-database/master/picgo/methods.jpg)

## 常见状态码

   ![status_code](https://raw.githubusercontent.com/jerryzhangjie/image-database/master/picgo/status_code.jpg)

   |状态码 原因|含义
   |--------|--------
   | 200 OK | 请求已成功处理
   | 204 No Content | 请求已成功处理，但无数据返回（比如提交数据，但无需返回数据的场景）
   | 206 Partial Content | 范围请求已成功处理，返回范围内的数据
   | 301 Moved Permanently | 资源永久重定向，浏览器自动跳转到返回的新的地址
   | 302 Found | 资源临时重定向，浏览器自动跳转到返回的新的地址
   | 304 Not Modified | 服务端已经执行了GET，但文件未变化，可使用浏览器缓存
   | 400 Bad Request | 无法理解该请求
   | 401 Unauthorized | 无权限访问
   | 403 Forbidden | 拒绝访问
   | 404 Not Found | 未找到请求的资源
   | 500 Internal Server Error | 服务器内部错误
   | 501 Not Implemented | 请求方法不被服务器支持
   | 503 Service Unavailable | 服务器不可用

## HTTPS

#### HTTP 存在的问题：    

   * 内容窃听。采用明文（不加密）通信，内容可能会被窃听。
   * 身份伪装。不验证对方的身份，有可能遭遇身份伪装。
   * 数据完整性。无法验证数据的完整性，报文可能被篡改。

#### 什么是 HTTPS？

   > HTTPS = HTTP + 加密 + 证书 + 完整性保护

   HTTPS 并非是应用层的一种新协议，它是身披 SSL 外壳的 HTTP。只是 HTTP 通信接口部分用 SSL（Secure Socket Layer）和 TLS（Transport Layer Security）协议代替而已。      

   通常，HTTP 直接和 TCP 通信。当使用 SSL 时，则演变成先和 SSL 通信，再由 SSL 和 TCP 通信了。简言之，所谓 HTTPS，其实就是身披 SSL 协议这层外壳的 HTTP。     
   在采用 SSL 后，HTTP 就拥有了 HTTPS 的加密、证书和完整性保护这些功能。

#### 默认端口

http - 80、https - 443

#### https通信过程？

**前置条件**：      

a. 网站向证书颁发机构提供公钥，机构用自己的公钥加密网站的公钥，并加上数字签名，生成公钥数字证书提供给网站；     
b. 浏览器中预先内嵌了证书颁发机构的公钥。

1. **TCP三次握手建立连接**     

![Screenshot0720-0939](https://raw.githubusercontent.com/jerryzhangjie/image-database/master/picgo/Screenshot0720-0939.jpg)

2. **SSL通信（非对称加密通信）**     
   * C -> S：发送客户端支持的加密组件列表、SSL版本
   * S -> C：选择一种服务端也支持的加密组件。发送加密组件和公钥数字证书
   * C -> S：通过证书上的数字签名验证服务端身份，同时用浏览器内置的机构公钥解密证书，获得公钥。生成密钥随机数（用于之后的对称加密通信）并用公钥加密该随机数。发送加密后的密钥。
   * S：通过私钥解密加密后的密钥，获得密钥。

3. **开始HTTP通信（对称加密通信）**     
   * C -> S：用密钥对请求加密，发送请求
   * S -> C：用密钥对请求解密，用密钥对响应加密，发送响应
   * C：用密钥对响应解密

4. **TCP四次挥手断开连接**

![20200720093750](https://raw.githubusercontent.com/jerryzhangjie/image-database/master/picgo/20200720093750.jpg)

## URI 与 URL 的区别

   URI 统一资源标识符，可以理解为表示的就是某个资源。而 URL 统一资源定位符，表示的是资源在互联网中的地址。

## cookie、session 与 token 的区别

   Cookie通过在客户端记录信息确定用户身份，Session通过在服务器端记录信息确定用户身份。    
   Cookie存放在硬盘中。为了获得更高的存取速度，服务器一般把Session放在内存里。    
   Session是服务器端使用的一种记录客户端状态的机制，使用上比Cookie简单一些，相应的也增加了服务器的存储压力。客户端浏览器访问服务器的时候，服务器把客户端信息以某种形式记录在服务器上。这就是Session。Cookie机制是通过检查客户身上的“通行证”来确定客户身份的话，那么Session机制就是通过检查服务器上的“客户明细表”来确认客户身份。Session相当于程序在服务器上建立的一份客户档案，客户来访的时候只需要查询客户档案表就可以了。
   cookie中存放的是例如jgbsessid字段，是“客户明细表”中Session的id，有了该id，服务端才能查找对应的Session数据。因此同一机器的两个浏览器窗口访问服务器时，会生成两个不同的Session。      

   * session 是由服务端针对当前对话，生成的一个随机数，通常放在cookie中发送给客户端，并存储在服务器的session列表中。客户端发送请求时cookie中携带session的id。服务器收到 cookie 后解析出 sessionId，再去 session 列表中查找，若能查到则匹配成功。
   * cookie 是由服务端生成，用于传输用户信息，存储在客户端，请求中会自动添加。
   * token 是由服务端根据用户id、用户名、定义好的密钥、过期时间生成的签名令牌，通常存放在客户端的localStroage，请求时手动添加在请求头中，服务器收到 token 后解密就可知道是哪个用户。与session相比，不需要存储在服务端，是用计算性能换取存储空间的方案，服务器的横向扩展性更好。同时，也是CSRF（跨站请求伪造）的解决方案。

   参考 
   [如何区分不同用户——Cookie/Session机制详解](https://www.cnblogs.com/zhouhbing/p/4204132.html)
   [彻底理解cookie，session，token](https://www.cnblogs.com/moyand/p/9047978.html)     
   [彻底弄懂session，cookie，token](https://segmentfault.com/a/1190000017831088)

## http1.0与http1.1区别

   * 缓存方式：1.0 用 Expires、Last-Modified、If-Modified-Since；1.1使用 Cache-Control、Etag、If-None-Match。[详见http缓存机制](https://github.com/jerryzhangjie/Blog/blob/master/Front-end/1%20-%20%E7%90%86%E8%AE%BA%E4%B8%8E%E6%A8%A1%E5%BC%8F/%E7%BD%91%E7%BB%9C/HTTP%E7%BC%93%E5%AD%98%E6%9C%BA%E5%88%B6.md)
   * 请求体优化：HTTP1.1则在请求头引入了range头域，它允许只请求资源的某个部分
   * 长连接：1.0中每个请求都要进行tcp连接，而1.1中引入长连接（keep-alive：true 默认开启），建立一个tcp连接通道后，一定时间（可通过设置nginx或apache服务器实现）内可以发送多次http请求。注：长连接实现的是一次连接可发送多个请求，但这个“多个”是串型的，而我们从浏览器network中看到的同域名请求最多同时发送6个http请求，是浏览器开启了多个网络线程（每个线程都建立一个tcp连接）实现的，并非http1.1实现了并行。

## http2与http1.x区别

   http1.1还存在的问题：长连接只是解决了多次连接的问题，并没有真正实现并行传输（虽然浏览器的多线程可并行请求，但是要为每个线程建立一个tcp连接）。

   为了解决上述问题，http2.0引入二进制`数据帧`和二进制`数据流`的概念，实现多路复用。帧负责对数据进行序列标识，以确保接收并行流数据后可按顺序重新组装。流负责数据的并行传输，统一域名下所有请求，不管请求数有多少，都只建立一个tcp连接，然后基于流进行并行传输。

   有了这个特性，之前我们的两个性能优化方式就没有并要了：1. 静态资源合并；2. 多域名提高下载速度。

   区别可概括为：
   1. 二进制格式；
   2. 多路复用；
   3. 头部压缩；
   4. 服务端推送。

   注意：浏览器6个请求限制，是指浏览器在同一个域名下最多开启6个线程，即建立6个tcp连接。而多路复用不受这个限制，可以同时并行请求同一个域名下的所有请求。
