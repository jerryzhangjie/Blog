## 标签
* 单独使用的标签，通常是因为标签本身就足够完成功能了，不需要标签之间的内容。
* 标签对大小写不敏感，只是通常写成小写。

## 元素
* “标签”和“元素”基本上是同义词，只是使用的场合不一样：标签是源码角度来看，元素是从编程角度来看，比如`<p>`标签对应网页的p元素。
* 元素可以分成两大类：块级元素（block）和行内元素（inline）。

## 属性
* 属性值一般放在双引号里面，这不是必需的，但推荐总是使用双引号。
* 属性名是大小写不敏感的，onclick和onClick是同一个属性。

## 基本标签
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="utf-8">
                <title></title>
            </head>
            <body>

            </body>
        </html>

### 1. `<!doctype>`
* 表示文档类型，告诉浏览器如何解析网页。`<!doctype html>`浏览器就会按照 HTML5 的规则处理网页。
* 通常写成大写`<!DOCTYPE html>`，因为<!doctype>本质上不是标签，更像一个处理指令。

### 2. `<html>`
* `lang`属性表示网页内容默认的语言。常用值:
  * zh：中文
  * zh-Hans：简体中文
  * zh-Hant：繁体中文
  * en：英语
  * en-US：美国英语
  * en-GB：英国英语
  * es：西班牙语
  * fr：法语

### 3. `<meta>`
* 用于设置或说明网页的元数据，必须放在`<head>`里面。
* `charset`属性指定网页的编码方式。几乎总是应该采用 `UTF-8` ，且应该与网页实际的编码方式一致，即声明了utf-8，网页就应该使用 UTF-8 编码保存。
* `name` 属性表示元数据的名字，`content` 属性表示元数据的值，一些常见的：
  
        <meta name="description" content="HTML 语言入门">
        <meta name="keywords" content="HTML,教程">
        <meta name="author" content="张三">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="application-name" content="Application Name">
        <meta name="generator" content="program">
        <meta name="subject" content="your document's subject">
        <meta name="referrer" content="no-referrer">

* `http-equiv` 属性用来覆盖 `HTTP` 响应的头信息字段，`content` 属性是该字段的内容。

        <meta http-equiv="Content-Security-Policy" content="default-src 'self'">    // 修改响应头字段
        <meta http-equiv="refresh" content="30'">   // 30秒后刷新


