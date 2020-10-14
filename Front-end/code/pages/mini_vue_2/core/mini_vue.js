export default function MiniVue(option) {
    this.$option = option
    let data = this.$data = this.$option.data

    // 数据劫持
    observer(data)
}

function observer(data) {
    if (typeof data === 'object') return
    new Observer(data)
}

function Observer(data) {
  for (let key in data) {
    let val = data[key]
    Object.defineProperty(data, key, {
      enumerable: true,   // 可枚举
      get() {
          return val
      },
      set(newVal) {
          if (val === newVal) return
          val = newVal
          observer(val)
      }
    })
  }
}