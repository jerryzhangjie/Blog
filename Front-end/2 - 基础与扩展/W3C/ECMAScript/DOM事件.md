## DOM事件的级别

* DOM0  element.onclick = function() {} 或 html 中添加 onclick 事件
* DOM2  element.addEventListener('click', function(){}, false)  // false 冒泡阶段触发(默认)；true 捕获阶段触发
* DOM3  element.addEventListener('keyup', function(){}, false)

DOM0 与 DOM2 绑定事件的区别？
> DOM0绑定的事件监听函数会覆盖之前绑定的事件监听函数。（只能绑定一个）      
> DOM2同一元素上的事件监听函数互不影响，而且可以独立取消，调用顺序和监听顺序一致。（能绑定多个）

## DOM事件模型

捕获、冒泡

## DOM事件流

捕获 ——> 目标阶段 ——> 冒泡

## 描述DOM事件捕获的具体流程

window - document - html - body - ...

## Event对象的常见应用

event.preventDefault()            // 例如，a 标签，阻止默认跳转行为
event.stopPropagation()           // 阻止冒泡
event.stopImmediatePropagation()  // 假如分别绑定了 a、b 两个事件，a 中加入该方法，可阻止继续执行 b 事件
event.currentTarget               // 用于事件代理中，获取被点击的子元素对象
event.target                      // 获取当前事件对象，事件代理中代表的是父元素

## 自定义事件

    // 首先需要提前定义好事件，获得事件对象，并且注册相关的EventListener
    var myEvent = new CustomEvent('event_name', { 
        detail: { title: 'This is title!'},
    });
    window.addEventListener('event_name', function(event){
        console.log('得到标题为：', event.detail.title);
    }, true);   // false - 默认，冒泡   true - 捕获
    // 随后在对应的元素上执行该事件对象，从而触发事件
    if(window.dispatchEvent) {  
        window.dispatchEvent(myEvent);
    } else {
        window.fireEvent(myEvent);  // IE8低版本兼容
    }

    <!-- 注 -->
    new Event('event_name');  // 也可定义事件，但无法传参

## 如何给 html 节点绑定事件

    // 需要用 document.documentElement 来表示 document 上的 html
    document.documentElement.addEventListener()

## 鼠标事件执行顺序

        // mouseover —— mouseout        会重复触发，会冒泡
        // mouseenter —— mouseleave     不会重复触发，不会冒泡
        mouseover -> mouseenter -> mouseout -> mouseleave

## body绑定滚动事件

body仅能通过 `document.querySelector('body').onscroll = function() { console.log(1) }` 绑定滚动。
`addEventListener`添加的无效

什么原因？？？？

scroll不会冒泡，addEventListener默认是冒泡的。