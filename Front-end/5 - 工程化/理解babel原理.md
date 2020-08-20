### 什么是 babel

babel 是一个转译器，负责将 ES6+ 转译为 ES5。

注：编译器负责将高级语言编译为更低级别的语言。

babel 转译过程：解析（parser）、转译（traverse）、生成（generator）        

![babel](https://raw.githubusercontent.com/jerryzhangjie/image-database/master/picgo/babel.jpg)

### 1. 解析

接收 ES6+ 字符串，并输出 AST 对象。解析环节分为两步：词法分析和语法分析。Babel 使用 @babel/parser 解析代码。

**词法分析**

根据JS语言规则将字符串形式的代码转换为令牌（tokens）流，它是JS语言的最小单元数组。

**语法分析**

将令牌流转换为 AST 对象形式。

### 2. 转译

接收 AST 对象，并对其进行遍历，在此过程中完成对节点的修改、增加、删除等操作，最终返回修改后的 AST 对象。Babel 使用 @babel/traverse 转译代码。

.babelrc里配置的presets和plugins都是在转译期间工作的

### 3. 生成

遍历 AST 对象生成可以表示成 ES5 代码的字符串，同时创建源码映射（source maps）。Babel 使用 @babel/generator 生成代码。


