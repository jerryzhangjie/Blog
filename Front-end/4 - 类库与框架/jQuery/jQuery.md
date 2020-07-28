1. `dom`对象与`jQuery`对象互转

        var pDom = document.querySelectorAll('p')
        var $pDom = $('p')
        
        // dom 转 jQuery
        var $pDom1 = $(pDom)

        // jQuery 转 dom，分两种情况
        // 情况一：jQuery 对象只含有一个元素，例如 $('#p')
        var pDom1 = $pDom[0]      // 方法1
        var pDom2 = $pDom.get(0)  // 方法2
        // 情况二：jQuery 对象含有多个元素，例如 $('p')
        var pDom1 = []
        var len = $pDom.length
        for(var i = 0; i < len; i++) {
            pDom1.push($pDom[i])
        }

2. `jQuery`是如何实现链式操作的（详见`zQuery.html`）     
   * `jQuery Dom`的方法都定义在`$`的原型对象上，且每个方法都返回`this`对象(即修饰后的`jQuery Dom`)；
   * `$`的原型对象的构造函数的原型对象指向`$`的原型对象 - `$.fn.init.prototype = $.fn`

3. `jQuery`如何封装自定义插件       
   利用方法`extend`     

   * 对象方法的插件
  
            ;(function($){                      //添加';'号 是为了防止前面的js少写';'号 影响我们的插件
                $.fn.extend({               
                    plugName: function(arg){    //插件名称
                        /* 插件逻辑 */
                    }
                });
            })(jQuery);                         //传入jQuery对象

            // 使用
            $(selector).plugName(arg)

   * 全局方法的插件

            ;(function($){                      //添加';'号 是为了防止前面的js少写';'号 影响我们的插件
                $.extend({                  
                    plugName: function(arg){    //插件名称
                        /* 插件逻辑 */
                    }
                });
            })(jQuery);                         //传入jQuery对象
            
            // 使用
            $.plugName(arg)