目前比较成熟的有四种：

|特性|CommonJS|AMD|CMD|ES6 Module
|--------|--------|--------|--------|--------
|同步异步|同步|异步回调|异步回调|编译时静态分析
|践行者|Node.js|require.js|Sea.js|ES6
|用法|require、module.exports|define(['依赖'], fun)、require(['依赖'], fun)|define(() => {require('依赖')})、seajs.use(['依赖'], fun)|import、export
|特点|同步、适用服务端、运行时加载一份拷贝|依赖前置、加载完就执行|依赖就近、加载完不执行遇到require才执行|解析时建立引用执行时真正取值


Require.js 的核心原理？
require.js 的核心原理是通过动态创建 script 脚本来异步引入模块，然后对每个脚本 的 load 事件进行监听，如果每个脚本都加载完成了，再调用回调函数。