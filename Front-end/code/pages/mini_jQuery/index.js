// 立即执行函数，实现全局注册
;(function(window) {
  var jQuery = function(selector) {
    return new jQuery.fn.init(selector)
  }
})()