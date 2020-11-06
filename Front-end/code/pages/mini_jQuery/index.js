// 立即执行函数，实现全局注册
;(function(window) {
  var jQuery = function(selector) {
    return new jQuery.fn.init(selector)
  }

  jQuery.fn = jQuery.prototype = {
    init: function(selector) {
      var rs = null
      if (typeof selector !== 'undefined') {
        var selectorType = selector.substr(0, 1)
        if (selectorType === '#') {
          rs = document.querySelector(selector)
          this[0] = rs
        } else {
          rs = document.querySelectorAll(selector)
          var length = rs
          for (var i = 0; i < length; i++) {
            this[i] = rs[i]
          }
        }
        // this.
      }
    }
  }
})()