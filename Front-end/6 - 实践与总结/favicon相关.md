
> favicon.ico是浏览器标签和收藏夹标签对网站的精简图标。
请求顺序是页面 `<link ref='icon' href='./favicon.ico'>`，若无此标签或请求失败，则请求网站根目录下的 `favicon.ico` 图片，若仍然失败，则会报 `404`。

解决上述报错的三种方法：
1. 正确设置 `<link ref='icon' href='./favicon.ico'>`；
2. 网站根目录下放置 `favicon.ico` 图片；
3. 禁止请求：
   
        <link rel="icon" href="data:;base64,=">
        或者
        <link rel="icon" href="data:image/ico;base64,aWNv">