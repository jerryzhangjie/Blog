1. 什么是`HTTP`
> `HTTP`（HyperText Transfer Protocol，超文本传输协议）是建立在 `TCP/IP` 之上的应用层通信协议，它是 `TCP/IP` 协议族的一个子集。 —— `WebSocket` 协议也是如此。

2. `TCP/IP` 协议族的四层模型      
`TCP/IP` 协议族是互联网相关的各类协议的总称。     

|层级|包含常见协议
|--------|--------
|应用层|HTTP（超文本传输协议）、WebSocket、FTP（文本传输协议）、DNS（域名系统）
|传输层|TCP（传输控制协议）、UDP（用户数据报文协议）
|网络层|
|数据链路层|

![tcp-ip-0](https://raw.githubusercontent.com/jerryzhangjie/image-database/master/picgo/tcp-ip-0.jpg)

利用 `TCP/IP` 协议族进行网络通信时，会通过分层顺序，与对方进行通信。发送端从应用层往下走，接收端则从数据链路层往上走。        
以 `HTTP` 为例：
* 首先作为发送端的客户端在应用层（`HTTP` 协议）发出一个想看某个 `Web` 页面的 `HTTP` 请求。
* 接着，为了传输方便，在传输层（`TCP` 协议）把从应用层处收到的数据（`HTTP` 请求报文）分割成报文段，并在各个报文段上打上标记序号后转发给网络层。
* 在网络层（`IP` 协议），增加作为通信目的地的 `MAC` 地址后转发给链路层。这样一来，发往网络的通信请求就准备齐全了。
* 接收端的服务器在链路层接收到数据，按序往上层发送，一直到应用层。当传输到应用层，才能算真正接收到由客户端发送过来的 `HTTP` 请求。

发送端在层与层之间传输数据时，每经过一层时必定会被打上一个该层所属的首部信息。反之，接收端在层与层传输数据时，每经过一层时会把对应的首部消去。

3. 相关协议及与`HTTP`关系

![tcp-ip-1](https://raw.githubusercontent.com/jerryzhangjie/image-database/master/picgo/tcp-ip-1.jpg)

* `DNS`-应用层：在发送端，提供域名到 `IP` 地址之间的解析服务。
* `HTTP`-应用层：在发送端，生成请求报文；在接收端，处理请求报文。
* `TCP`-传输层：在发送端，将请求报文分割成报文段，并按顺序添加序号；在接收端，按序号以原来的顺序重组报文。此外，为确保数据正确传输，发送前会进行三次握手，发送后会进行四次挥手。
* `IP`-网络层：使用`ARP`协议，根据目标`IP`地址查到对应的`MAC`地址，并添加到报文上，然后将数据转交给数据链路层。再利用路由选择机制，经过若干次中转，最终将数据传输到目标服务器。



HTTP 是不保存状态的协议
HTTP/1.1 虽然是无状态协议，但为了实现期望的保持状态功能，于
是引入了 Cookie 技术。有了 Cookie 再用 HTTP 协议通信，就可以管
理状态了。

http方法：

![methods](https://raw.githubusercontent.com/jerryzhangjie/image-database/master/picgo/methods.jpg)

