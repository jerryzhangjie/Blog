* vue-router是vue.js官方的路由管理器。

* 使用方法
```
// 1. 定义路由导航：声明式导航 或 编程式导航
<!-- 声明式：to指定路由链接，router-link会被渲染成a标签，点击且匹配to成功后，自动添加class属性值.router-link-active -->
<router-link to="/foo">Go to Foo</router-link>
<!-- 编程式：js中动态控制路由 -->
this.$router.push({path: '/foo'})

// 2. 定义路由出口，即目标组件渲染的位置
<router-view></router-view>

// 3. 定义或import路由组件
const Foo = { template: '<div>foo</div>' } 或 import Foo from './foo'

// 4. 创建router实例，传入routes配置
const router = new Router({
  routes: [
      {
        path: '/foo',
        component: Foo
      }
  ]
})

// 5. 通过router属性将路由实例配置到vue根实例
const app = new Vue({
  el: '#app',
  router: router
})
```

* 任何组件内可通过 `this.$router` 访问路由实例，可通过 `this.$route` 获取当前路由对象

* 通过添加“动态路径参数”实现动态路由(场景：多种匹配都映射到同一个组件，例如列表项均跳转至详情页，通过id区别内容)
```
const router = new Router({
  routes: [
      {
        <!-- 参数值会被设置到 this.$route.params，并通过this.$route.params.paramName在任意组件中获取 -->
        path: '/foo:paramName',
        component: Foo
      }
  ]
})
```

* 仅改变“动态路径参数”，由于复用相同组件，想对参数的变化作出响应，有两种方法：
```
// 1. 组件中监测 $route 路由对象的变化
watch: {
  '$route' (to, from) {
    // 对路由变化作出响应...
  }
}
// 2. 组件中配置“导航守卫”
beforeRouteUpdate (to, from, next) {
  // 对路由变化作出响应...
  // 执行next()
}
```
详情了解 [导航守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%85%A8%E5%B1%80%E5%89%8D%E7%BD%AE%E5%AE%88%E5%8D%AB)

* 通过为router路由实例添加children配置项，实现“嵌套路由”
```
const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <!-- 路由的目标组件中也有个router-view -->
      <router-view></router-view>
    </div>
  `
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'profile',
          component: UserProfile
        }
      ]
    }
  ]
})
```

* 函数式编程    
this.$router.push(path)     将当前路径添加至浏览器的history，并跳转至path   
this.$router.replace(path)  不添加history，直接跳转至path   
this.$router.go(n)          在 history 记录中向前或者后退n步    
```
<!-- push、replace用法相同 -->
// 字符串
router.push('home')

// 对象
router.push({ path: 'home' })

// 命名的路由
router.push({ name: 'user', params: { userId: '123' }})

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```

* 命名视图
```
// html中命名多个视图
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>

// 相应的，路由实例中对应多个组件
const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: { // 带上s
        default: Foo,
        a: Bar,
        b: Baz
      }
    }
  ]
})
```

* 重定向路由（redirect）
```
<!-- 访问/a时，跳转至/b -->
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: '/b' }
  ]
})
```

* 别名路由（alias）
```
<!-- 访问/b时，路由虽然现实/b，但实际访问的还是/a，与访问/a一样 -->
const router = new VueRouter({
  routes: [
    { path: '/a', component: A, alias: '/b' }
  ]
})
```

* 路由组件传参
```
const User = {
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User, props: true }
  ]
})
```

* 滚动行为
```
const router = new VueRouter({
  routes: [...],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到的位置
    return { x: 0, y: 0 }
  }
})
```

* 路由懒加载    
    
  结合`Vue`的异步组件和`Webpack`的代码分割功能，轻松实现路由组件的懒加载。    
  首先，`Vue`异步组件：可以将异步组件定义为返回一个`Promise`的工厂函数（该函数返回的 Promise 应该 resolve 组件本身）

      const Foo = () => Promise.resolve({/* 组件定义对象 */})

  其次，`Webpack`代码分割：在`Webpack 2`中，可以使用`动态import`语法来定义代码分块点

      import('./Foo.vue') // 返回 Promise
  
  两者结合，可在`VueRouter`中，这样实现组件懒加载：

      // 懒加载
      const Foo = () => import('./Foo.vue') // webpack 打包时生成单独文件
      // 使用
      const router = new VueRouter({
        routes: [
          { path: '/foo', component: Foo }  // 当路由生效时，就会去懒加载 Foo 组件的打包文件
        ]
      })

  按组分块，是指使用名称`chunk`，将几个异步组件打包到同一个文件中

      const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
      const Bar = () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')
      const Baz = () => import(/* webpackChunkName: "group-foo" */ './Baz.vue')