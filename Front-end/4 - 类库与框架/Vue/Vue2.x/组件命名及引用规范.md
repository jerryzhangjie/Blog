* Vue组件无强制命名限制，但组件名终需在html模板中使用，所以必须避免与html保留字重名，官方推荐PascalCase化的命名格式(AbcDef)，例如：`MyComponent`；

* Vue 1.0中，对于字符串模板中的组件名，解析过程为：
  - Vue 会将 template 中的内容插到 DOM 中，以方便解析标签。由于html标签不区分大小写，所有标签名都将转化为小写;
  - 通过标签名寻找对应的自定义组件。匹配顺序为：转化后的小写标签名、camelCase化的标签名、PascalCase化的标签名。

  因此，两种引入形式及其匹配结果如下：
  - 假设模板中`<MyComponent></MyComponent>`这样引入，首先转为小写`<mycomponent></mycomponent>`，然后依次匹配`mycomponent`、`(无)`、`Mycomponent`，结果：无法匹配到`MyComponent`，报错；
  - 假设模板中`<my-component></my-component>`这样引入，首先转为小写`<my-component></my-component>`，然后依次匹配`my-component`、`myComponent`、`MyComponent`，结果：匹配到`MyComponent`，正确解析；

* Vue 2.0 相对于 1.0 的最大改进就是引入了 Virtual DOM，使字符串模板的解析不依赖于 DOM，因此也就无需遵从html的标签规范，字符串模板中两种引入方式`<MyComponent></MyComponent>`、`<my-component></my-component>`都是可以的

注：Prop也遵守上述规则，但自定义事件名：
> 不会被用作一个 JavaScript 变量名或属性名，v-on 事件监听器在 DOM 模板中会被自动转换为全小写 (因为 HTML 是大小写不敏感的)，所以 v-on:myEvent 将会变成 v-on:myevent——导致 myEvent 不可能被监听到。
> 因此，我们推荐你始终使用 kebab-case 的事件名。