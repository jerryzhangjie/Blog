> 记录复习、刷题过程中，遇到的需要探究、整理总结的知识点

## 基础知识（6月21日——7月12日）
1. 执行上下文、作用域和闭包、闭包的使用场景、案列   7.10    ok
2. 原型、原型链、继承   7.15   ok
3. this   7.15  ok
4. 一些方法的实现：call、apply、bind、promise等     https://github.com/lgwebdream/FE-Interview/issues/29

## 网络（7月13日——7月19日）
1. 理清https是什么，怎么加密，完整通信流程  ok
2. CSRF和XSS   https://github.com/lgwebdream/FE-Interview/issues/16   ok
3. token与cookie、session   ok
4. http缓存策略     https://github.com/lgwebdream/FE-Interview/issues/14  ok

## 浏览器（7月20日——7月26日）
1. 垃圾回收机制

## 框架（7月27日——8月9日）
1. jquery自定义方法的实现   ok
2. jquery的ajax封装方法    ok
3. vue技术栈基础常见知识点
4. vue响应式原理
5. vue-router、vuex基本使用
6. vue-router、vuex实现原理

## webpack与工程化（8月10日——8月16日）
1. webpack 原理及常用配置
2. webpack 做过哪些优化     https://github.com/lgwebdream/FE-Interview/issues/25
3. babel 原理

## 性能优化（8月17日——8月23日）


## 项目经验（8月24日——8月30日）
1. 跨域及解决方案


## 服务器


## 常用算法



7月30日复习总结及调整
1. 总结
   已完成 基础、网络、浏览器 三个模块的复习，存在的问题：遗忘     
   待完成 框架、工程化、性能优化、项目经验
2. 调整     
   细化待完成内容复习细节、必须每天一套面试题


## 待整理：

1. 遇到的问题及解决方案：

技术场景：https://juejin.im/post/6844903776235552782
业务场景：cef内核由49升级到84，债券综合计算器，底部拖动，中间部分flex弹性布局+overflow:auto，高度较小时未出现滚动条。
思考1：
   解决方案：js动态计算高度，设置overflow:auto盒子的高度，迫使滚动条出现。
   在尝试此方案过程中，客户端版本升级 019 ——> 021，此兼容性bug不在了，沟通了解到修复了部分cef84的bug（应该就是文章中提到的那次chrome临时版本解决的bug）。
思考2：
   不能自动出现滚动条才是符合标准的，之后的内核升级务必会实现这个标准，所以，必须整理一份已知兼容性问题的清单及解决方案，并确保在之后的开发中，遇到相应场景，使用支持标准的解决方案实现代码，这样才能比较好的实现“向前(未来)兼容”

2. clientHeight、offsetHeight等区别


3. 虚拟列表的实现


4. 实时刷新方案

* 短轮询
* 长轮询(Comet)
* 长连接(iframe)
* 服务端推送事件(SSE)
* WebSocket