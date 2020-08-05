# Vue 官网学习纪要
> 整理记录之前学习中疏忽、遗漏、不理解的知识点，对其进行排查和深究，以期更好的掌握Vue基础知识。


# 基础
***
## 1.
> **Vue不支持 IE8 及以下版本，因为 Vue 使用了 IE8 无法模拟的 ECMAScript 5 特性。**

具体是什么特性？
**Object.defineProperty()**
> 当你把一个普通的 JavaScript 对象传入 Vue 实例作为 data 选项，Vue 将遍历此对象所有的属性，并使用 Object.defineProperty 把这些属性全部转为 getter/setter。Object.defineProperty 是 ES5 中一个无法 shim 的特性，这也就是 Vue 不支持 IE8 以及更低版本浏览器的原因。

深入理解：详见[Object.defineProperty与双向数据绑定](./Object.defineProperty与双向数据绑定.md)

***
## 2.
什么是**CDN**？
IDC、云计算、CDN之间什么关系？

**理解**：CDN全称Content Delivery Network，即内容分发网络，指通过互联网与各种缓存服务器（基于IDC）相连的网络系统。CDN是用来给网站加速的。用户请求CDN资源时，利用全局负载技术，将访问指向距离最近的工作正常的缓存服务器上，由缓存服务器直接响应用户请求。
IDC全称Internet Data Center，即互联网数据中心，简称IDC机房。是云计算和CDN的基础，是整个互联网世界的大后方。
云计算可以理解为通过一些计算方式，将共享的软、硬件资源和信息，整个一起，形成一个大型虚拟资源池，资源取用更加便捷、灵活，有效提升了资源再分配的效率和规模，以及平台运作的效率。所以，云计算是以IDC为依托的上层建筑。

查阅可知，目前主流的云服务提供商(阿里云、七牛云、腾讯云等)也是主流的CDN服务商，因为这两项服务都基于硬件——IDC的存在，而这些IDC大概率都是这些服务商搭建的。

***
## 3.
> 运行时 + 编译器 vs. 只包含运行时

什么是 **运行时**、**编译器**？两种版本什么区别？

> **编译器**：用来将模板字符串编译成为 JavaScript 渲染函数的代码。
> **运行时**：用来创建 Vue 实例、渲染并处理虚拟 DOM 等的代码。基本上就是除去编译器的其它一切。

> 如果你需要在客户端编译模板 (比如传入一个字符串给 `template` 选项，或挂载到一个元素上并以其 DOM 内部的 HTML 作为模板)，就将需要加上编译器，即完整版：

    // 需要编译器
    new Vue({
        template: '<div>{{ hi }}</div>'   // 模板字符串
    })

    // 不需要编译器
    new Vue({
        render (h) {
            return h('div', this.hi)    // js渲染函数
        }
    })

当使用预处理器 `vue-loader` 时(通常配置在webpack配置项中)，.vue文件内的模板会在构建(npm run build)时预编译成js渲染函数。因为运行时版本相比完整版体积要小大约 30%，所以应该尽可能使用这个版本。

***
## 4.
**安装淘宝镜像：**

    npm install -g cnpm --registry=https://registry.npm.taobao.org

***
## 5.
> 是一套用于构建用户界面的**渐进式框架**。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，...

何为**渐进式框架**？何为**自底向上逐层应用**？

理解：渐进式简单来说，你使用Vue，可以只使用它的核心功能甚至其中几个指令实现视图渲染，也可以深入使用它的双向绑定、单文件组件，或者进一步用它来做单页面应用，并引入路由vue-router、状态管理vuex等等。也就是说，可以用Vue实现简单需求，也可以用Vue配合其它技术实现更复杂需求，甚至服务端渲染。而自底向上可以认为是由基础到复杂，由局部化到系统化构建项目的过程。

***
## 6.
> **Vue.js 的核心是一个允许采用简洁的模板语法来声明式地将数据渲染进 DOM 的系统**

何为**声明式渲染**？
[怎么理解“声明式渲染”](https://www.zhihu.com/question/68121329)
`声明式渲染`是与`命令式渲染`相对应的概念。
既然都是“渲染”，自然与浏览器中dom的渲染机制有关。[详见“浏览器渲染原理”]()
**命令式渲染：**需要通过操作dom，控制dom按照业务逻辑一步步完成重新渲染过程。
**声明式渲染：**无需操作dom，只需将声明好的变量嵌入dom中，通过控制变量值的改变实现重新渲染。

***
## 7.
> **所有的Vue组件都是Vue实例，并且接受相同的选项对象(一些根实例特有的选项除外)**

**vue-cli单间的SPA中只有一个new，如何理解每个组件都是实例？**

SPA中唯一的new是根实例，而通过import使用的.vue组件，其实例化过程交给了vue-loader来完成，它们本质上都是实例。

***
## 8.
**如何理解Vue遵循MVVM模型？**

![MVVM.png](https://i.loli.net/2019/06/17/5d07951e1bef976565.png)

***
## 9.
> **当一个 Vue 实例被创建时，它将 data 对象中的所有的属性加入到 Vue 的响应式系统中**

* **实例创建时：** 只有实例化时data中的属性才是响应式的，实例化之后向实例对象添加的属性，不具有响应式。
* **响应式系统：** 属性值改变时，Vue将通知视图更新数据。

使用时，自定义属性与Vue自带的实例属性、方法的区别是，自带的都有前缀$

***
## 10.
> **不要在选项属性或回调上使用箭头函数，比如 created: () => console.log(this.a) 或 vm.$watch('a', newValue => this.myMethod())。因为箭头函数并没有 this，this 会作为变量一直向上级词法作用域查找，直至找到为止**

原因：因为箭头函数是和父级上下文绑定在一起的，this不会是Vue实例。   
注意：created() {} 是ES6函数声明的简写形式，不是箭头函数。

***
## 11.
> **生命周期**

![lifecycle.png](https://i.loli.net/2019/06/19/5d0a229af2e1156221.png)

***
## 12.
> 模板表达式都被放在沙盒中，只能访问全局变量的一个白名单，如 Math 和 Date 。你不应该在模板表达式中试图访问用户定义的全局变量。

意思是vue模版中，可以使用表达式，例如：`{{number + 1}}`或`<p :"number + 1"></p>`，其中number是实例中定义的数据。当需要使用全局变量时，只能使用JS语言默认的全局变量，例如Math、Date等，而不能使用自定义的全局变量，例如定义了`window.myVar = 11`，不能在模版表达式中使用myVar。

***
## 13.
> 计算属性

> 计算属性是基于它们的响应式依赖进行缓存的，Date.now() 不是响应式依赖：
        
    computed: {
        now: function () {
            return Date.now()
        }
    }
原因：Date.now() 不是 响应依赖，因为它跟 Vue 的数据观察系统无关。
所以，使用计算属性时，一定要针对实例属性数据进行定义，否则计算属性将不会动态变化。

***
## 14.
> class与style绑定

    <div
        class="static"
        v-bind:class="{ active: isActive, 'text-danger': hasError }"
    ></div>
注意：对象写法可以用驼峰式 (camelCase) 或短横线分隔 (kebab-case，记得用**引号括起来**) 来命名。

数组写法中，也可以混合对象写法使用：

`<div v-bind:class="[{ active: isActive }, errorClass]"></div>`

> 在一个自定义组件上使用 class 属性时，这些类将被添加到该组件的根元素上面，例如：

`<my-component class="baz boo"></my-component>`

HTML 将被渲染为:

`<p class="foo bar baz boo">Hi</p>`

当 v-bind:style 使用需要添加浏览器引擎前缀的 CSS 属性时，如 transform，Vue.js 会自动侦测并添加相应的前缀。

`<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>`

这样写只会渲染数组中最后一个被浏览器支持的值。在本例中，如果浏览器支持不带浏览器前缀的 flexbox，那么就只会渲染 display: flex。

***
## 15. v-if、v-show、visibility、display
v-if 切换dom时，会尽可能的复用相同标签名元素(例如`input`)，若不希望复用，只需在相同标签名元素上添加一个具有唯一值的 key 属性即可。

> v-if 对比 v-show(display)

首先比较 `visibility:hidden;` 与 `display:none;`

二者共同点：
* 1.都使元素不可见；
* 2.值变化时，都会触发浏览的重绘。
* 3.仍存在dom tree中(与是否占据dom空间不是一个概念)。

二者不同点：`visibility: hidden;`仍然占据dom空间，后面的元素不会覆盖其位置，造成空白区域，即值改变只会重绘不会重排，而`display:none;`不会占据dom空间，后面的元素不会覆盖其位置，即值改变既会重绘又会重排。

其次比较 `v-if` 与 `v-show`
> v-show 的元素始终会被渲染并保留在 DOM 中。v-show 只是简单地切换元素的 CSS 属性 display。

而`v-if`是彻底的插入或删除元素，删除后dom tree中不存在(注意与上述第3点不同)，所以我认为有些文章描述的`v-if`是`visibility`实现的，是不对的。

> v-show 不支持 `<template>` 元素，也不支持 v-else。

> 一般来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好。

> 不推荐同时使用 v-if 和 v-for。当 v-if 与 v-for 一起使用时，v-for 具有比 v-if 更高的优先级。

***
## 16. v-for、for...in、for...of
**for...in VS for...of ？**

JS中：
* for...in 以不确定顺序的方式遍历对象或数组的可枚举属性key(包括继承来的属性key)
* for...of 以希望的顺序遍历可迭代对象或数组的数据(属性值，而非key)

VUE的`v-for`中：
数组：二者无差异，均是以希望的顺序遍历数组的数据
对象：均以不确定的顺序遍历对象

***
## 17. 
当需要使用v-if切换多个元素时，可使用`<template>`元素包裹想要切换的元素，`<template>`常作为不需要被渲染的包裹元素使用。

***
## 18.
vue会尽可能的复用相同的元素，如果不想复用，只需给相同的元素添加不同的key值。

***
## 19. 数组操作
* vue中响应式修改数组的方法有：
  1. 使用变异方法（push、pop、shift、unshift、splice、sort、reverse共7个）直接修改原数组，eg：vm.items.push('aa'); 所谓变异方法是指会改变原来值的方法，即使原数组变异了。
  2. 将一个新数组赋值给原数组。
  3. 使用全局方法或实例方法：Vue.set(vm.items, 6, 'aa') 或 vm.$set(vm.items, 6, 'aa')
* vue中无法响应式修改数组的常见情况：
  1. 利用索引设置数组项，vm.items[6] = 'aa'
  2. 修改数组的长度，vm.items.length = 6

* vue中响应式修改对象的方法有：
  1. 将一个新对象赋值给原对象。
  2. 使用全局方法或实例方法：
  ```
  Vue.set(vm.userProfile, 'age', 27)
  vm.$set(vm.userProfile, 'age', 27)
  // 若需要添加多个（使用方法1进行赋值）
  vm.userProfile = Object.assign({}, vm.userProfile, {
    age: 27,
    favoriteColor: 'Vue Green'
  })
  ```

***
## 20. 
v-for也可以接受整数，此时它会把模版重复对应次数
  ```
  <div>
    <span v-for="n in 10">{{ n }} </span>
  </div>
  ```

***
## 21. is
想在ul、ol、select等有固定子元素(li、li、option)的元素中使用组件使，可使用`is`属性
  ```
  <ul>
    <li
      is="todo-item"
      v-for="(todo, index) in todos"
      v-bind:key="todo.id"
      v-bind:title="todo.title"
    ></li>
  </ul>
  ```

***
## 22. v-on(@)
* v-on函数调用方法：
  1. @click="handleClick" —— 直接函数名，函数中可使用event获取dom事件对象
  2. @click="handleClick('123')" —— 只传参数
  3. @click="handleClick('123', $event)" —— 既传参数又传dom事件对象
  ```
  handleClick: function (message, event) {
    // 现在我们可以访问原生事件对象
    if (event) event.preventDefault()
    alert(message)
  }
  ```

* 事件修饰符
  1. .stop 是stopPropagation()的语法糖，阻止事件冒泡
  2. .prevent 是preventDefault()的语法糖，阻止事件默认行为，例如表单提交时重载页面
  3. .capture 使用事件捕获模式，即元素自身触发的事件先在此处理，然后才交由内部元素进行处理
  4. .self 事件是自身触发的才会执行，即事件不能是捕获或冒泡而来的事件
  5. .once 只执行一次
  6. .passive 滚动行为结束后才会触发

* 按键别名或按键码修饰符
  1. .enter 当按键为回车时才会触发，例如 @keyup.enter="handleEnter"
  2. .13 当按键为回车时才会触发，例如 @keyup.13="handleEnter"
  ```
  // 通过全局config.keyCodes自定义按键码别名
  // 可以使用 `v-on:keyup.f1`
  Vue.config.keyCodes.f1 = 112
  ```

* .exact 修饰符允许你控制由精确的系统修饰符组合触发的事件
  ```
  <!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
  <button @click.ctrl="onClick">A</button>

  <!-- 有且只有 Ctrl 被按下的时候才触发 -->
  <button @click.ctrl.exact="onCtrlClick">A</button>

  <!-- 没有任何系统修饰符被按下的时候才触发 -->
  <button @click.exact="onClick">A</button>
  ```

* 使用v-on在HTML中监听事件，跟传统的js绑定相比，有什么好处？
  1. 直观定位事件的绑定位置；
  2. 无需js中手动绑定，避免操作dom，实现了与dom解耦；
  3. vue.js事件都绑定在当前视图的ViewModel上，当当前实例销毁时，事件处理器也将自动销毁。


*** 
## 23. v-model
* 取值
```
<!-- `toggle` 为 true 或 false -->
<input type="checkbox" v-model="toggle">
<!-- checkedNames 为数组，元素为value值 -->
<input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
<input type="checkbox" id="john" value="John" v-model="checkedNames">
<input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
<!-- 当选中时，`picked` 为字符串 "a" -->
<input type="radio" v-model="picked" value="a">
<!-- 当选中时，`picked` 为字符串 true -->
<input type="radio" v-model="picked">
```
* 修饰符
    - .lazy 默认情况下，v-model 在每次 input 事件触发后将输入框的值与数据进行同步。lazy可避免如此频繁的数据同步，仅在change事件触发时同步数据(通常是失去焦点时触发change事件)
    - .number 自动将用户的输入转化为数字类型。无法被 parseFloat() 解析，则会返回原始的值
    ```
        <!-- 输入 —— 返回 -->
        21 —— 21
        21aaa —— 21
        aaa —— aaa
        aaa21 —— aaa21
    ```
    - .trim 删除首尾空格

***
## 组件注册
* 组件分为全局组件和局部组件。vue-cli项目中通过`import`引入，然后实例中通过`components`注册的单文件组件，都是局部组件。对于在很多组件中都会用到的基础组件，应该注册成全局组件，以下是Vue官方的一个将单文件组件注册成全局组件的例子：
```
<!-- 引入lodash(一个 JavaScript 的实用工具库)中的方法 -->
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

<!-- require.context获取单文件组件对象 -->
const requireComponent = require.context(
  // 其组件目录的相对路径
  './components',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)
  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 获取和目录深度无关的文件名
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})
```
注：全局组件应该在根实例之前定义。
* 组件上使用`v-model` 
组件上无法直接使用`v-model`，需借助组件的事件自定义事件，对组件内的`input`做如下处理：
  - 将其`value`特性绑定到一个名叫`value`的`prop`上
  - 在其`input`事件被触发时，将新的值通过自定义的`input`事件抛出
```
// 使用组件custom-input
<custom-input v-model="searchText"></custom-input>
// 定义组件
Vue.component('custom-input', {
  props: ['value'], // 因为v-model固定对应value这种属性，所以prop只有叫value，才能接收到v-model传进来的值
  template: `
    <input
      v-bind:value="value"  // 将prop赋值给input的value，才能父组件传来的值显示在input中
      v-on:input="$emit('input', $event.target.value)"  // 因为v-model固定对应input标签的input这种事件，所以自定义事件名只有叫input，父组件才能通过v-model拿到子组件中传来的值
    >
  `
})
```

***
## Prop
* prop验证
  - type 类型检查，值：原生构造函数(String、Number、Boole Boolean、Array、Object、Date、Function、Symbol) 或 自定义构造函数(利于定义的叫做Person的构造函数名称)
  - required 是否必须，值：true、false
  - default 默认值
  - validator 自定义验证函数
  ```
    // 自定义验证函数
    propF: {
      validator: function (value) {
        // 属性值必须匹配下列字符串中的一个(或验证是否匹配一个正则)
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    }
  ```
* 非prop特性
  非prop特性是指，传向子组件，但是子组件中并未声明的属性。
  - 继承性 - 通常非prop特性会添加到/替换掉子组件的根节点的相应属性，特殊的，class和style会被合并到子组件的根节点的class和style上
  ```
  // 子组件
  <input type="date" class="child" />
  // 调用组件
  <my-component type="text" data-aa='xxx' class="father"></my-component>
  // 渲染结果
  <input type="text" data-aa='xxx' class="child father" />
  ```
  - 禁用继承 - 如果不想子组件的根节点默认继承非prop特性，可在组件选项中添加`inheritAttrs: false`，并在希望获得继承的节点上使用`$attrs`对象(该对象包含作用在该组件上的所有属性)
  ```
  // 子组件
  <div> // 禁止根节点获取继承属性
    <input  // 希望该节点获取继承属性
      v-bind="$attrs" // 通过$attrs获取继承
    >
  </div>
  new Vue({
    inheritAttrs: false,
    ...
  })
  // 调用组件
  <my-component type="text" title="hahaha"></my-component>
  // 渲染结果
  <div> // 根节点未获取继承属性
    <input  // 该节点获取了继承属性
      type="text"
      title="hahaha"
    >
  </div>
  ```

*** 
## 自定义事件
* 原生事件绑定到组件：
  - 当在调用子组件时绑定原生事件，如`v-on:focus.native="onFocus"`这样调用时，类似非prop特性，该事件将被绑定到子组件的根节点。
  - 若根节点是你的目标节点，这样绑定没问题，但如果不希望绑定到根节点，应该利用`$listeners`对象，获取绑定在该组件上的所有事件。
  ```
  <input
    v-bind="$attrs"
    v-on="inputListeners"
  >
  new Vue({
    computed: {
      inputListeners() {
        return Object.assign({}, this.$listeners)
      }
    }
  })
  ```
* .sync
  作用是，子组件希望通知父组件改变prop值，进而实现子组件的展示(或逻辑)。
  ```
  // 调用，作用于prop foo上
  <my-component :foo.sync="bar"></my-component>
  // 子组件中，通过update通知父组件更新foo的值
  this.$emit('update:foo', newValue)

  // 等价于
  <my-component :foo="bar" @update:foo="val => bar = val"></my-component>
  this.$emit('update:foo', newValue)
  ```
  当然，相同的效果，也可通过自定义事件实现，所以 `.sync` 只是个语法糖。

*** 
## 插槽
* 基本用法
```
// 组件 BaseLayout
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot>default text</slot> // 未传入插槽内容时，default text才会显示
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
// 调用
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <template v-slot:default> // 默认插槽的template可省略
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

* 作用域插槽：目的是让插槽内容能够调用子组件中的数据
  ```
  // 子组件CurrentUser，slot上绑定数据
  <span>
    <slot v-bind:user="user">
      {{ user.lastName }}
    </slot>
  </span>
  // 调用子组件，并通过v-slot获得子组件数据
  <current-user>
    <template v-slot:default="slotProps"> // slotProps名称自定
      {{ slotProps.user.firstName }}
    </template>
  </current-user>
  ```

* 动态插槽名(利用了 `动态指令参数`)
  ```
  <base-layout>
    <template v-slot:[dynamicSlotName]>
      ...
    </template>
  </base-layout>
  ```

* 具名插槽指令 `v-solt:` 可以简写为 `#`

***
## 动态组件
* 使用
在需要处理组件切换的场景，可以使用动态组件。动态组件不是一种组件，而是一种切换组件的实现方式。通过`<component>`元素加一个特殊的`is`特性来实现:
```
<!-- 组件会在 `currentTabComponent` 改变时改变，currentTabComponent为已注册组件的名字，或一个组件的选项对象 -->
<component v-bind:is="currentTabComponent"></component>
```
* 避免切换时重渲染导致的性能问题
```
<!-- 失活的组件将会被缓存！失活组件的操作结果也会被保存 -->
<keep-alive>
  <component v-bind:is="currentTabComponent"></component>
</keep-alive>
```
注：`<keep-alive>` 要求被切换到的组件都有自己的名字，因为它是通过名字去缓存组件的。

***
## 依赖注入
实例选项`provide`用来指定想要提供给后代组件的数据/方法

    provide: function() {
      return {
        name: 'jerry',
        getAge: this.getAge
      }
    }

实例选项`inject`用来指定想要从祖先组件接收的数据/方法

    inject: ['name', 'getAge']

***
## 自定义指令

```
new Vue({
  ...
  directives: {
    // 自定义指令 `v-focus`
    focus: {
      // 钩子函数
      bind() {}, // 指令第一次绑定到元素时调用
      inserted() {}, // 被绑定元素插入父节点时调用
      update() {}, // 所在组件的 VNode 更新时调用
      componentUpdated() {}, // 指令所在组件的 VNode 及其子 VNode 全部更新后调用
      unbind() {} // 指令与元素解绑时调用
    }
  }
})
```

***
## 过滤器
> Vue.js 允许你自定义过滤器，可被用于一些常见的文本格式化。过滤器可以用在两个地方：双花括号插值和 v-bind 表达式 (后者从 2.1.0+ 开始支持)。过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符号指示：
```
<!-- 在双花括号中 -->
{{ message | capitalize }}

<!-- 在 `v-bind` 中 -->
<div v-bind:id="rawId | formatId"></div>
```
可以在组件中定义局部过滤器：
```
new Vue({
  ...
  filters: {
    // 定义一个将字符串首字母改为大写的过滤器
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
})
```
或者在创建 Vue 实例之前全局定义过滤器：
```
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

new Vue({
  // ...
})
```

***
## 如何看待关注点分离(如何看待Vue的单文件组件)？
对于组件化开发，抽离出公共模块(组件、js、css等)，然后将强相关的模板、逻辑和样式以内部耦合的形式写在一个组件文件中，相比于从项目层面分离成三个层次并相互调用，单文件组件更加内聚且更易维护。