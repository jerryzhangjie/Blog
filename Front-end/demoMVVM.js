/**
 * VM - 'Model of View'视图的模型。
 * 将 View 和 Model 的同步逻辑自动化了。
 */

function Mvvm(options = {}) {
    this.$options = options
    let data = this._data = this.$options.data

    // 数据劫持
    observe(data)

    // 数据代理
    for (let key in data) {
        Object.defineProperty(this, key, {
            configurable: true,
            get() {
                return this._data[key]
            },
            set(newVal) {
                this._data[key] = newVal
            }
        })
    }

    // 编译
    new Compile(option.el, this)
}

function observe(data) {
    if (data && typeof data === 'object') {
        return new Observe(data)
    }
}

function Observe(data) {
    for (let key in data) {
        let val = data[key]
        observe(val)
        Object.defineProperty(data, key, {
            configurable: true,
            get() {
                return val
            },
            set(newVal) {
                if (val !== newVal) {
                    val = newVal
                    observe(newVal)
                }
            }
        })
    }
}

function Compile(el, vm) {
    vm.$el = document.querySelector(el)
    let fragment = document.createDocumentFragment()
    let child = vm.$el.firstChild
    if (!child) {
        return
    }
    fragment.appendChild(child)
    replace(fragment)
    vm.$el.appendChild(fragment)
}

function replace(frag) {
    Array.from(frag.childNodes).forEach((node) => {
        let txt = node.textContent;
        let reg = /\{\{(.*?)\}\}/g;

        if (node.nodeType === 3 && reg.test(txt)) { //  即是文本节点又有大括号{}
            
        }
    })
}

