# Flex布局
> 以下内容主要参考 [Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

## 1. 什么是Flex布局
> Flex布局（Flexible Box，弹性布局），用来为盒模型提供最大的灵活性。
> 任何容器都可以指定为 Flex 布局，包括行内元素(inline-flex)。
> 设为 Flex 布局以后，子元素的`float`、`clear`和`vertical-align`属性将失效。

## 2. 基本概念
- **容器：** 指定为flex布局的元素。
- **项目：** **容器**的直接子元素(孙子元素不是直接子元素)。
- **主轴：** **项目**排列的方向。
- **交叉轴：** 与**主轴**垂直的方向。

