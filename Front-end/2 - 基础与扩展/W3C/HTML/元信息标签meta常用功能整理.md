> meta标签用来描述一个HTML网页文档的属性，例如作者、日期和时间、网页描述、关键词、页面刷新等。

* 解码方式
    <!-- 告知浏览器该页面的解码方式 -->
    <meta charset="utf-8">

* SEO
    <!-- 为搜索引擎提供该页面的关键字、描述、作者 -->
    <meta name="keywords" content="">
    <meta name="description" content="">
    <meta name="author" content="author name" />
    <!-- 页面刷新和重定向(3秒后重定向至百度) -->
    <meta http-equiv="refresh" content="3;url=https://www.baidu.com" />

* 浏览器模式切换
    <!-- 优先使用 IE 最新版本和 Chrome 渲染该页面 -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <!-- 优先使用 IE7 渲染该页面 -->
    <meta http-equiv="X-UA-Compatible" content="IE=7">
    <!-- 浏览器内核控制(双内核时使用 webkit 内核) -->
    <meta name="renderer" content="webkit">

* 移动设备
    <!-- 页面宽度默认为设备宽度，缩放比例为1，且不可缩放 -->
    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">