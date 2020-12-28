1. display：inline-block元素放到一起会产生一段空白 原因？解决方法？

    原因：标签间的空白。

2. 伪类和伪元素
    伪类：表示文档元素的额外信息，用来为选择器添加特殊效果。形式为单冒号。例如 :hover、:active、:focus      
    伪元素：用来表示文档中不存在的元素。形式为双冒号。例如：::before、::after
    
3. 如何实现小于 12px 的字体效果

    display: inline-block;  // transform: scale只能缩放可以设置宽度的元素
    transform: scale(0.7);

4. 如何使用 css 实现硬件加速

    硬件加速是指通过创建独立的复合图层，让 GPU 来渲染这个图层，从而提高性能。

    transform: translateZ(0);