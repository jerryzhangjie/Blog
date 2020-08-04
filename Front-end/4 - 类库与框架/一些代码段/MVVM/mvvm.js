function Mvvm(options = {}) {
  this.$options = options
  let data = this._data = this.$options.data

  // 数据劫持
  observer(data)

  // 数据代理 this 代理 this._data
  for (let key in data) {
    Object.defineProperty(this, key, {
      enumerable: true,
      get() {
        return this._data[key]
      },
      set(newVal) {
        this._data[key] = newVal
      }
    })
  }

  // 计算属性
  initComputed.call(this)

  // 编译
  new Compile(options.el, this)
}

// 数据劫持
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
      enumerable: true, // 可枚举
      get() {
        Dep.target && dep.addSub(Dep.target)  // [watcher]
        return val
      },
      set(newVal) {
        if (val === newVal) return
        val = newVal
        observer(newVal)
        dep.notify()
      }
    })
  }
}

// 模板编译
function Compile(el, vm) {
  vm.$el = document.querySelector(el)
  let fragment = document.createDocumentFragment()
  let child = null
  while (child = vm.$el.firstChild) {
    fragment.appendChild(child)
  }
  replace(fragment)
  function replace(fragment) {
    Array.from(fragment.childNodes).forEach((node) => {
      let text = node.textContent
      let reg = /\{\{(.*)\}\}/
      // 文本节点
      if (node.nodeType === 3 && reg.test(text)) {
        let arr = RegExp.$1.split('.')
        let val = vm
        arr.forEach((key) => {
          val = val[key]
        })
        new Watcher(vm, RegExp.$1, function (newVal) {
          node.textContent = text.replace(reg, newVal)
        })
        // 数据替换逻辑
        node.textContent = text.replace(reg, val)
      }
      // 元素节点
      if (node.nodeType === 1) {
        let attrs = node.attributes
        Array.from(attrs).forEach((attr) => {
          let name = attr.name
          let exg = attr.value
          if (name.indexOf('v-model') === 0) {
            node.value = vm[exg]
          }
          new Watcher(vm, exg, function (newVal) {
            node.value = newVal
          })
          node.addEventListener('input', function (e) {
            vm[exg] = e.target.value
          })
        })
      }
      if (node.childNodes) {
        replace(node)
      }
    })
  }
  vm.$el.appendChild(fragment)
}

// 发布订阅
function Dep() {
  this.subs = []
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
    val = val[k]    // 取值时会调用get方法
  })
  Dep.target = null
}

Watcher.prototype.update = function () {
  let val = this.vm
  let arr = this.exp.split('.')
  arr.forEach((k) => {
    val = val[k]    // 取值时会调用get方法
  })
  this.fn(val)
}

// 计算属性
function initComputed() {
  let computed = this.$options.computed
  Object.keys(computed).forEach((key) => {
    Object.defineProperty(this, key, {
      get: typeof computed[key] === 'function' ? computed[key] : computed[key].get
    })
  })
}
