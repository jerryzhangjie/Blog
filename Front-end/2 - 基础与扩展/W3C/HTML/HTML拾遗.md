## 标签
* 单独使用的标签，通常是因为标签本身就足够完成功能了，不需要标签之间的内容。
* 标签对大小写不敏感，只是通常写成小写。

## 元素
* “标签”和“元素”基本上是同义词，只是使用的场合不一样：标签是源码角度来看，元素是从编程角度来看，比如`<p>`标签对应网页的p元素。
* 元素可以分成两大类：块级元素（block）和行内元素（inline）。

## 属性
* 属性值一般放在双引号里面，这不是必需的，但推荐总是使用双引号。
* 属性名是大小写不敏感的，onclick和onClick是同一个属性。

### `href`与`src`

* `href` 用于在当前文档和引用资源之间确立联系。当浏览器遇到href会并行下载资源并且不会停止对当前文档的处理。
* `src` 用于替换当前内容。当浏览器解析到src ，会暂停其他资源的下载和处理，直到将该资源加载并执行完毕。

### `script`标签的`defer`和`async`

* `defer`脚本的加载过程和文档加载是异步发生的，等到文档解析完(DOMContentLoaded事件发生前)脚本才开始执行。
* `async`脚本的加载过程和文档加载也是异步发生的。但脚本下载完成后会停止HTML解析，执行脚本，脚本解析完继续HTML解析。
* 当同时有`async`和`defer`属性时，执行效果和`async`一致。

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
  
        <meta name="application-name" content="Application Name">       // 当前web应用的名称
        <meta name="description" content="HTML 语言入门">
        <meta name="keywords" content="HTML,教程">
        <meta name="author" content="张三">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"">
        <meta name="renderer" content="webkit">         // 针对多内核浏览器指定默认渲染内核

* `http-equiv` 属性用来覆盖 `HTTP` 响应的头信息字段，`content` 属性是该字段的内容。

        <meta http-equiv="Content-Security-Policy" content="default-src 'self'">    // 修改响应头字段
        <meta http-equiv="refresh" content="30'">   // 30秒后刷新

## `<img>`标签

1. `loading`属性实现懒加载

属性`loading`可以指定图片的懒加载，即图片默认不加载，只有即将滚动进入视口，变成用户可见时才会加载，这样节省了带宽。

可取以下三个值：

* `auto`:浏览器默认行为，等同于不使用loading属性;
* `lazy`:启动懒加载；
* `eager`:立即加载资源，无论它在页面上的哪个位置。

`<img src="image.png" loading="lazy" alt="…" width="200" height="200">`

由于行内图片的懒加载，可能会导致页面布局重排，所以使用这个属性的时候，最好指定图片的高和宽(注意，一旦设置了宽和高，浏览器会在网页中预先留出这个大小的空间，不管图片有没有加载成功)。

[兼容性](https://caniuse.com/#search=loading)：Chrome、Firefox、Opera最新版，IE不支持。

2. 响应式图片

**像素密度适配**

        <img srcset="foo-160.jpg 160w,
                     foo-320.jpg 320w,
                     foo-640.jpg 640w,
                     foo-1280.jpg 1280w"
             src="foo-1280.jpg">

根据屏幕不同像素密度(1倍屏、1.5倍屏、2倍屏)，加载不同图片。

**屏幕大小适配**

        <img srcset="foo-160.jpg 160w,
                     foo-320.jpg 320w,
                     foo-640.jpg 640w,
                     foo-1280.jpg 1280w"
             sizes="(max-width: 440px) 100vw,
                    (max-width: 900px) 33vw,
                    254px"
             src="foo-1280.jpg">

属性`sizes`用于适配不同宽度的屏幕中应该显示的图片宽度，然后从属性`srcset`中寻找最接近的图片宽度对应的图片地址进行加载，若未匹配到合适的，则加载`src`指定的默认图片。

**同时考虑屏幕尺寸和像素密度**

        <picture>
          <source srcset="homepage-person@desktop.png,
                          homepage-person@desktop-2x.png 2x"
                  media="(min-width: 990px)">
          <source srcset="homepage-person@tablet.png,
                          homepage-person@tablet-2x.png 2x"
                  media="(min-width: 750px)">
          <img srcset="homepage-person@mobile.png,
                       homepage-person@mobile-2x.png 2x"
               alt="Shopify Merchant, Corrine Anestopoulos">
        </picture>


## `<figure>`可做语义化容器

`<figure>`是一个将主体内容与附加信息`<figcaption>`，封装在一起的语义容器。

        <figure>
          <p><code>const foo = 'hello';</code></p>
          <figcaption>JavaScript 代码示例</figcaption>
        </figure>

## 什么是语义化

H5 新增了很多语义化标签，用正确的标签做正确的事，就是语义化。

语义化的好处：**理解**

1. 人理解：有助于阅读源码；
2. 机器理解：

    * 有助于爬虫解析页面内容(SEO)；
    * 有助于浏览器在无 css 样式时较好的展示页面结构。