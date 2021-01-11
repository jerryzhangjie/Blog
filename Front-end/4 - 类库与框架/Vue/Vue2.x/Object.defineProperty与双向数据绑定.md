## MVVM

在MVVM架构模式中，

* M 指的是 Modal 即数据层，仅关注数据本身，不关心任何行为，可以理解为一个类似 JSON 的数据对象。
* V 指的是 View 即视图层，通过模板语法声明式的将数据渲染进 DOM，Modal 的更新会通过 VM 层响应式地更新到 View。
* VM 指的是 ViewModal，通过双向数据绑定的方式，实时的更新 V 和 M。

在 Vue 中，双向数据绑定是采用数据劫持和发布-订阅模式实现的。

## 双向数据绑定

双向数据绑定指的是，View 改变可以实时更新 Modal(即数据)，而 Modal 的改变也能实时更新 View。

通过事件监听可以实现 View 改变实时更新 Modal，例如监听 input 的 input 事件，输入内容时更新 Modal 中的数据。

重点是 Modal 的改变如何实时的更新 View？

问题可抽象为 **获知数据变化** 和 **响应数据变化**，这个过程涉及几个关键步骤：

1. 如何获知 Modal 的改变？
   
   * 数据劫持，Vue2.x 使用了 ES5 的 Object.defineProperty() 来劫持数据，为 data 中每个属性添加 getter 和 setter。
   * 实现劫持，数据劫持的过程交由 **监听器 Observer** 来完成，伪代码如下：

        function Observer(data) {
            for (let key in data) {
                let val = data[key]
                Observer(val)   // 递归调用，确保劫持到每个属性
                Object.defineProperty(data, key, {
                    enumerable: true,
                    get() {
                        return val
                    },
                    set(newVal) {
                        val = newVal
                        console.log('获知数据改变')
                    }
                })
            }
        }

    那么当数据改变时，就会触发 set 函数，在此处就可以获知数据的改变。注：数据劫持过程仅为数据添加 get 和 set 函数，但是并未触发这两个函数。
  
2. 更新哪些 View 元素？

    * Vue 模板语法中的模板变量是待更新的 View 元素
    * 模板变量需经过解析才能转化为数据
    * **解析器 Complie**用来执行解析过程，解析每个模板变量时，都会创建一个**订阅者 Watcher**，创建 Watcher 时会调用数据的 get 方法。

3. 如何更新？

    * 依赖收集，Vue 实现了**订阅器 Dep**，Dep 有一个 addSub 方法，用来收集 Watcher，而 notify 方法用来遍历 Watcher(有个update方法) 执行更新。

        function Dep() {
           this.subs = []  // 存放 watcher
        }
        Dep.prototype.addSub = function(watcher) {
            this.subs.push(watcher)
        }
        Dep.prototype.notify = function() {
            this.subs.forEach(watcher => {
                watcher.update()
            })
        }

    * 解析过程执行 get 时，执行了 addSub 收集 Watcher。而更新数据时，执行了 set，此时会触发 Dep 的 notify 方法更新视图。

        function Observer(data) {
            const dep = new Dep()
            for (let key in data) {
                let val = data[key]
                Observer(val)   // 递归调用，确保劫持到每个属性
                Object.defineProperty(data, key, {
                    enumerable: true,
                    get() {
                        dep.addSub(Watcher)     // 收集 Watcher
                        return val
                    },
                    set(newVal) {
                        val = newVal
                        dep.notify()            // 更新视图
                        console.log('获知数据改变')
                    }
                })
            }
        }

*参考*：        
* https://www.jianshu.com/p/570a84ca7a30
* https://www.jianshu.com/p/251235dd04c8
