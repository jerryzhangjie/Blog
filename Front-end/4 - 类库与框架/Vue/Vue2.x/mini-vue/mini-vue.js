function MiniVue(option) {
    this.$option = option
    let data = this.$data = this.$option.data

    // 数据劫持
    observer(data)

    // 数据代理
    for (let key in data) {
        Object.defineProperty(this, key, {
            enumerable: true,
            get() {
                return this.$data[key]
            },
            set(newVal) {
                this.$data[key] = newVal
            }
        })
    }

    // 模板编译
    new Compile(this)
}

function observer(data) {
    if (typeof data !== 'object') return
    new Observer(data)
}

function Observer(data) {
    let dep = new Dep()
    for (let key in data) {
        let val = data[key]
        observer(val)
        Object.defineProperty(data, key, {
            enumerable: true,   // 可枚举
            get() {
                Dep.target && dep.addSub(Dep.target)
                return val
            },
            set(newVal) {
                if (val === newVal) return
                val = newVal
                observer(val)
                dep.notify()
            }
        })
    }
}

function Compile(vm) {
    let el = vm.$option.el
    vm.$el = document.querySelector(el)
    // 操作内存dom
    let fragment = document.createDocumentFragment()
    let child = null
    while (child = vm.$el.firstChild) {
        fragment.appendChild(child)
    }
    replace(fragment)
    function replace(fragment) {
        Array.from(fragment.childNodes).forEach((node) => {
            // 元素节点
            if (node.nodeType === 1) {
                let attrs = node.attributes
                Array.from(attrs).forEach((attr) => {
                    let name = attr.name
                    let exp = attr.value
                    if (name.indexOf('v-model') === 0) {
                        node.value = vm[exp]
                    }
                    node.addEventListener('input', function(e) {
                        vm[exp] = e.target.value
                    })
                    new Watcher(vm, exp, function(newVal) {
                        node.value = newVal
                    })
                })
            }
            // 文本节点
            if (node.nodeType === 3) {
                let text = node.textContent
                let reg = /\{\{(.+)\}\}/
                if (reg.test(text)) {
                    // 处理形如 a.b.c 的文本插值
                    const keyArr = RegExp.$1.split('.')
                    let val = vm
                    keyArr.forEach((key) => {
                        val = val[key]  // 需要经过数据代理才能拿到值
                    })
                    new Watcher(vm, RegExp.$1, function (newVal) {
                        node.textContent = text.replace(reg, newVal)
                    })
                    // 数据处理逻辑
                    node.textContent = text.replace(reg, val)
                }
            } 
            if (node.childNodes) {
                replace(node)
            }
        })
    }
    // 内存dom转为真是dom
    vm.$el.appendChild(fragment)
}

// 发布订阅
function Dep() {
    this.subs = []      // 存放 watcher
}
Dep.prototype.addSub = function (watcher) {
    this.subs.push(watcher)
}
Dep.prototype.notify = function () {
    this.subs.forEach((watcher) => {
        watcher.update()
    })
}

function Watcher(vm, exp, fn) {
    this.vm = vm
    this.exp = exp
    this.fn = fn
    Dep.target = this
    let val = vm
    let arr = exp.split('.')
    arr.forEach((k) => {
        val = val[k]    // 取值时调用get方法
    })
    Dep.target = null
}

Watcher.prototype.update = function () {
    let val = this.vm
    let arr = this.exp.split('.')
    arr.forEach((k) => {
        val = val[k]    // 取值时调用get方法
    })
    this.fn(val)
}