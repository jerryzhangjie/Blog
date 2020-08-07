// 发布订阅模式  subs = [watcher, watcher, watcher]
// 每个watcher上都有一个update方法，可以执行传入watcher中的方法

function Dep() {
  this.subs = []
}

Dep.prototype.addSub = function(watcher) {
  this.subs.push(watcher)
}

Dep.prototype.notify = function() {
  this.subs.forEach((watcher) => {
    watcher.update()
  })
}

function Watcher(fn) {
  this.fn = fn
}

Watcher.prototype.update = function() {
  this.fn()
}

let watcher = new Watcher(function() {
  console.log(1)
})

let dep = new Dep()
dep.addSub(watcher)
dep.addSub(watcher)
dep.addSub(watcher)
dep.notify()