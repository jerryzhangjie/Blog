# 准备

## Flow
> Flow 是 facebook 出品的 JavaScript **静态类型检查工具**。

类型检查，是在编译期尽早发现由类型错误引起的bug，又不影响代码运行(不需要运行时动态检查类型)。

工作方式：
* 类型推断
* 类型注释

常见的类型注释：
* 数组  Array<T>

        /*@flow*/

        var arr: Array<number> = [1, 2, 3]
        arr.push('Hello')   // 报错

* 类和对象

        /*@flow*/
        
        class Bar {
            x: string;           // x 是字符串
            y: string | number;  // y 可以是字符串或者数字
            z: boolean;

            constructor(x: string, y: string | number) {
                this.x = x
                this.y = y
                this.z = false
            }
        }
        
        var bar: Bar = new Bar('hello', 4)

        var obj: { a: string, b: number, c: Array<string>, d: Bar } = {
            a: 'hello',
            b: 11,
            c: ['hello', 'world'],
            d: new Bar('hello', 3)
        }

* null或undefined  ?T

        /*@flow*/

        var foo: ?string = null     // 字符串或null

## 源码目录

        src
        |—— compiler        # 编译相关(模板解析 ——> ast 语法树 ——> ast 语法树优化 ——> 代码生成等)
        |—— core            # 核心代码(内置组件、全局API封装、Vue实例化、观察者、虚拟DOM、工具函数等)
        |—— platforms       # 不同平台的支持(web 和 weex(native客户端)，分别对应两个编译打包入口)
        |—— server          # 服务端渲染(实为跑在服务端的node.js，把组件渲染为服务端的html字符串发送给浏览器)
        |—— sfc             # .vue 文件解析(把 .vue 文件解析成 JS 对象)
        |—— shared          # 共享代码(浏览器端、服务端共享的工具方法)

编译的工作可以在构建时做（借助 webpack、vue-loader 等辅助插件）；也可以在运行时做，使用包含构建功能的 Vue.js。显然，编译是一项耗性能的工作，所以更推荐前者——离线编译

## 源码构建

Rollup

## 入口文件

> Vue 本质上是一个用 Function 实现的 Class，它的原型 prototype 及本身都扩展了一下方法和属性。

* 限定函数只能用 new 来实例化

        if (!(this instanceof Fn)) {
            console.log('只能用 new 来实例化')
        }

* Vue 构造函数为什么不用 ES6 的 class 来写？

> 有很多 xxxMixin 的函数调用，并把 Vue 当参数传入，它们的功能都是给 Vue 的 prototype 上扩展一些方法，Vue 按功能把这些扩展分散到多个模块中去实现，而不是在一个模块里实现所有，这种方式是用 Class 难以实现的。这么做的好处是非常方便代码的维护和管理。

==============================================================

# 数据驱动

## new Vue

* 合并配置  mergeOptions
* 初始化生命周期    initLifecycle
* 初始化事件中心    initEvents
* 初始化渲染    initRender
* *调用生命周期钩子 beforeCreate     callHook*
* *初始化 inject    initInjections*
* 初始化 data、props、computed、watcher等   initState
* *初始化 provide    initProvide*
* *调用生命周期钩子 created     callHook*

## 挂载

* 调用 vm.$mount 方法挂载 vm
  * 不能挂载到 body 和 html 上
  * 若未定义 render 方法，则利用compileToFunction将 el 或 template 转换为 render 方法      
  * 调用 mountComponent 完成整个渲染工作
    * 实例化 Watcher，执行回调 updateComponent （1. 初始化时执行回调，2. 数据变更时执行回调）
      * 调用 vm._render 生成虚拟 Node，调用 vm._update 更新 DOM
      * 设置 vm._isMounted 为 true，并执行 mounted 钩子函数

## _render

> 实例的私有方法，将实例渲染成虚拟 Node

执行 createElement 方法并返回 vnode，它是一个虚拟 Node。

nextTick 将参数回调函数放入一个数组(队列)中，然后取出队列第一个回调函数ck，利用事件循环机制，一次尝试使用 Promise.resolve().then(ck())、setImmediate(ck())、setTimeout(ck, 0)

## Virtual DOM

> 是对真是 DOM 的一种抽象描述，核心定义包含标签名、数据、子节点、键值等。由于 VNode 只是映射到真实 DOM 的渲染，不需要包含操作 DOM 的方法，所以非常轻量和简单。
> VNode 映射到真实 DOM，要经历 create、diff、patch等过程，而 create 是通过 createElement 实现的。

## createElement

* 判断 tag 类型，如果是 Component 直接调用 createComponent 创建一个组件类型的VNode节点。如果是 string，继续判断，如果是普通html节点，创建普通VNode，如果为已注册的组件名，则通过 createComponent 创建组件类型 VNode节点，否则创建未知标签的VNode
* 每个节点还有children，children的每个元素也是VNode，就形成了VNode Tree。

## _update

有了VNode，_update就可以将其渲染成真实DOM了。

* 调用 patch 可以将其渲染成真实DOM并插入父节点

==============================================================

# 组件化

## createComponent

* 通过 Vue.extend() 将组件视为Vue的子类并构造子类的构造函数

* 安装组件钩子函数

* 实例化 VNode，并返回






























==============================================================

# Vue Router





















