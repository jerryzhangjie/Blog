# Vue2.5开发去哪网(课程跟学项目)

> 项目来源：慕课网 - Vue2.5开发去哪网app
> 文档说明：1.记录知识细节；2.归纳学习心得。



## 一、Mac升级Nodejs和Npm到最新版
### 1.先查看本机node.js版本
```
node -v
```
### 2.清除node.js的cache
```
sudo npm cache clean -f
```
### 3.安装 n 工具，这个工具是专门用来管理node.js版本的
```
sudo npm install -g n
```
### 4.安装最新版本的node.js
```
sudo n stable
```
### 5.再次查看本机的node.js版本
```
node -v
```
### 6.更新npm到最新版
```
sudo npm install npm@latest -g
```
### 7.验证
```
node -v
npm -v
```





## 二、jQuery与Vue开发的不同点
### 1.架构模式区别
- **jQuery是基于传统MVP(或叫MVC、MVX)前端架构模式**，即数据层(Model)、视图层(View)、控制层(Presenter)，开发中绝大部分是在写控制层代码，通常是通过ajax请求实现与数据层的交互，以及通过dom操作实现对视图层的渲染。
- **Vue是基于MVVM架构模式**，即数据层、视图层、VM层，VM由Vue核心代码实现，负责监控数据的改变并映射至视图层(数据绑定)，以及监听视图层的交互操作并调用相应的事件(Dom监听)。鉴于VM已交由Vue管控，以及VM的特点，所以实际Vue开发中主要是对数据层的操作。
- 简单来说，**jQuery是面向dom编程，而Vue是面向数据编程**。
## 2.Todo:总结其它方面





## 三、多页面应用vs单页面应用
### 1.多页面应用
页面跳转 —— 返回html
优点：首屏时间快，SEO效果好
缺点：页面切换慢
### 2.单页面应用
页面跳转 —— JS渲染
优点：页面切换快
缺点：首屏时间稍慢，SEO效果差 （Vue服务器端渲染可解决上述缺点）





## 四、移动端开发常见问题及解决方案
### 1.html中meta标签初始化配置
```
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
```
### 2.页面样式初始化
> 引入 reset.css ‘/src/assets/style/reset.css’
### 3.移动端多倍屏将1px边框显示成多像素边框问题
> 引入 border.css ‘/src/assets/style/border.css’
### 3.解决部分手机机型上部分浏览器存在300ms的click延时问题
```
import fastClick from 'fastclick'
fastClick.attach(document.body)
```
### 4.移动端长度单位 rem
> rem(root em,根em)是css3新增的相对长度单位，它的取值始终相对于html的font-size值，这个单位可谓集相对大小和绝对大小的优点于一身，通过它既可以做到只修改根元素就成比例地调整所有字体大小，又可以避免em字体大小逐层复合的连锁反应。目前，除了IE8及更早版本外，所有浏览器均已支持rem。对于不支持它的浏览器，应对方法也很简单，就是多写一个绝对单位的声明。这些浏览器会忽略用rem设定的字体大小。下面就是一个例子：p {font-size:14px; font-size:.875rem;}
```
1rem = html 的font-size
例如 二倍屏，设计稿中height为86px，则css设置应为 height: 43px;
若 html{font-size: 50px;} 那么 1rem = 50px, height = 43px = .86rem
```
注：任意浏览器的默认字体都是16px





## 五、Vue中为数组、对象动态添加或修改元素
### 1.数组
```
let vm = new Vue({
    el: '#app',
    data: {
        arrList: ['a', 'b', 'c']
    }
})
```
vue中直接操作：
```
vm.arrList[1] = 'd'
```
是无效的。
1. vue中动态操作数组的方法只有七个：
- push  尾部添加
- pop   尾部删除
- unshift 头部添加
- shift 头部删除
- splice    增删改原数组
- sort  排序
- reverse   倒序
2. 或者使用vue提供的set方法：
```
Vue.set(vm.arrList, 1, 'd')
或
vm.$set(vm.arrList, 1, 'd')
```
3. 或者修改数组的引用，即：
```
vm.arrlist = ['a', 'd', 'c']
```
达到将‘b’动态改为‘d’的目的。
### 2.对象
```
let vm = new Vue({
    el: '#app',
    data: {
        arrList: {
            userInfo: {
                name: 'Jerry',
                age: '28',
                gender: 'male'
            }
        }
    }
})
```
vue中直接操作：
```
vm.userInfo.age = '29'
```
是无效的。
1. vue中提供了set方法来动态修改对象：
```
Vue.set(vm.userInfo, 'age', '29')
或
vm.$set(vm.userInfo, 'age', '29')
```
2. 或者修改对象的引用，即：
```
vm.userInfo = {
                name: 'Jerry',
                age: '29',
                gender: 'male'
            }
```
达到将‘28’动态改为‘29’的目的。





## 六、组件间数据传递
### 1.父组件向子组件传值
通过属性传值

```
<child :prop-name="1"></child>

Vue.conponent('child', {
    props: [ propName ]
    template: '<div>{{propName}}</div>''
})
```

### 2.子组件向父组件传值
通过事件触发

```
<child @change="handleChange"></child>

Vue.conponent('child', {
    template: '<div onclick="handleClick">1</div>',
    methods: {
        handleClick: function() {
            this.$emit('change', 2)
        }
    }
})

methods: {
    handleChange: function(value) {
        alert(value)    // 2
    }
}
```

## 非父子组件间传值
通过发布订阅模式——总线机制

```
<child content="Jerry"></child>
<child content="Zhang"></child>

// 创建总线
Vue.prototype.bus = new Vue()

Vue.conponent('child', {
    props: {
        content: String
    },
    data: function() {
        return {
            selfContent: content    // 子组件不可直接操作父组件传递的参数
        }
    },
    template: '<div onclick="handleClick">{{selfContent}}</div>',
    methods: {
        handleClick: function() {
            this.bus.$emit('change', selfContent)   // 发布至总线
        }
    },
    mounted: {
        var self = this
        this.bus.$on('change', function(msg) {  // 总线上订阅
            self.selfContent = msg
        })
    }
})
```





## 七、组件使用细节
### 1. 使用is属性解决标签渲染小bug
让is等于子组件名

```
<table>
    <tbody>
        <tr is="row"></tr>
        <tr is="row"></tr>
        <tr is="row"></tr>
    <tbody>
</table>

Vue.component('row', {
    template: '<tr><td>this is a row</td></tr>'
})
```

### 2. 子组件中的data必须是函数

```
Vue.component('row', {
    data: function() {
        return {
            content: 'this is a row'
        }
    },
    template: '<tr><td>{{content}}</td></tr>'
})
```
原因是：子组件不同与根组件只被调用一次，子组件会被多次调用，而每次调用时数据应该是独立的，不能是同一个数据（同一个数据会导致一个组件的数据改变了，其它子组件数据也会受到影响）。通过返回一个对象，实现每个子组件拥有一个独立的数据存储。

### 3. 通过ref实现必要的dom操作（获取dom节点）

```
<div ref="hello" @click="handleClick">
    hello world
</div>

methods: {
    handleClick: function() {
        console.log( this.$refs.hello.innerHtml )  // hello world
    }
}
```
若ref添加在子组件上，获得的是组件实例的引用：
```
<row ref="one" @click="handleClick"></row>

Vue.component('row', {
    data: function() {
        return {
            number: 1
        }
    },
    template: '<div>{{number}}</div>'
})


methods: {
    handleClick: function() {
        console.log( this.$refs.one )   // 得到的是row组件实例
        console.log( this.$ress.one.number )    // 得到的是row组件实例的数据number
    }
}
```

### 4. 父组件通过属性向子组件传递数据

```
<counter :count="12"></counter>     // 当加“:”时，传递的是数字12，不加“:”时，传递的是字符串"12"。
```
原因：添加“:”即v-bind:count="12"，v-bind会使得引号里的是一个表达式。





## 八、生命周期
> 生命周期函数就是Vue实例在某个时间点会自动执行的函数

```
let vm = new Vue({
    el: '#app',
    // beforeCreate 初始化事件、生命周期相关内容后(基础初始化)
    beforeCreate: function() {
        console.log('beforeCreate')
    },
    // created 初始化依赖注入(provide/inject)、双向绑定相关内容
    created: function() {
        console.log('created')
    },
    // beforeMount 将模板和数据挂载到挂载点进行渲染之前
    beforeMount: function() {
        console.log('beforeMount')
    },
    // mounted 页面挂载之后
    mounted: function() {
        console.log('mounted')
    },
    // deforeDestroy 当调用vm.$destroy()即将销毁实例时
    deforeDestroy: function() {
        console.log('deforeDestroy')
    },
    // destroyed 当调用vm.$destroy()已经销毁实例时
    destroyed: function() {
        console.log('destroyed')
    },
    // beforeUpdate 数据改变，虚拟dom重新渲染之前
    beforeUpdate: function() {
        console.log('beforeUpdate')
    },
    // updated 数据改变，虚拟don重新渲染之后
    updated: function() {
        console.log('updated')
    }
})
```





## 九、其它基础知识汇总
### 1.块元素自适应撑开高度(块元素防抖)
```
overflow: hidden;   // 当poadding-bottom百分比值计算的不准确时，可隐藏超出的部分
width: 100%;
height: 0;
poadding-bottom: 30%;   // padding取值为百分比时，参照的是父元素的宽度
```
或
```
width: 100%;
height: 30vw;   // 浏览器兼容性不好
```

### 2.Vue中scoped的样式穿透
当我们想要在父组件scoped限定的style中，修改子组件的样式时，可使用样式穿透符‘>>>’
```
.father-classname >>> .son-classname {
    background: #fff;
}
```

### 3.flex布局内容不超出外层容器方法
```
// 为元素设置
min-width: 0;
```
### 4.循环中的ref
通过this.$refs.name获取的循环中的ref，得到的是一个数组，需要获取该数据的第0个元素才行。

### 5.通过函数节流提高代码性能
``
if (this.timer) {
    clearTimeout(this.timer)
}
this.timer = setTimeout(() => {
    ...    
}, 16)
``
> 由于现在广泛使用的屏幕都有固定的刷新率（比如最新的一般在 60Hz），在两次硬件刷新之间浏览器进行两次重绘是没有意义的只会消耗性能。浏览器会利用这个间隔 16ms（1000ms/60）适当地对绘制进行节流， 因此 16ms 就成为页面渲染优化的一个关键时间。

### 6.vuex
**核心思想**：将应用程序的所有组件状态（或公共数据）集中存储在state对象中，通过特定的接口改变state中的公共数据，从而实现相应组件状态/数据的改变。

**核心概念**：
- **State** - 用于集中存储状态/数据的对象。
- **Getter** - 用于根据state中的值，计算出新的值。相当于vue中的计算属性computed。
- **Mutations** - 用于集中存放修改state值的事件方法，这些方法通过store.commit('funName', canshu)来触发。
- **Actions** - 用于存放提交Mutations的事件方法，这些方法通过store.dispatch('funName', canshu)来触发。
- **Module** - 用于将复杂store分隔成模块，每个模块具有完整的vuex属性(state、getter、mutations、actions)。

