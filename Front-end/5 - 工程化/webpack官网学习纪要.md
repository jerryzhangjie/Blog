> webpack 是一个现代 JavaScript 应用程序的静态模块打包器。通过将应用程序所需的每个模块，递归地构建成一个依赖关系图，然后打包成一个或者多个 bundle。

## entry

        module.exports = {
            entry: './path/to/my/entry/file.js'
        };

## output

        const path = require('path');

        module.exports = {
            entry: './path/to/my/entry/file.js',
            output: {
                path: path.resolve(__dirname, 'dist'),      // path.resolve 从右向左拼接路径并返回绝对路径      __dirname 当前目录
                filename: 'my-first-webpack.bundle.js'
            }
        };

## loader

功能：      

* webpack 本身只能理解 JS（ES5）；
* 在 import 或"加载"模块时预处理文；
* 不同的 loader 让 webpack 理解不同类型的文件（ES6+、jsx、png、css、less等）；
* loader 将各种类型文件转换为 webpack 能打包处理的模块；

主要配置项：

* test 指定应该被转换的每个或某些文件（支持正则）
* use 指定用于转换的loader
* exclude 指定需要忽略的文件（支持正则）

        module: {
            rules: [
                {
                    test: /\.txt$/, 
                    use: 'raw-loader' 
                }
            ]
        }

## plugins

功能：

* 功能范围很广，执行除文件类型转换外的其它任务，例如：打包优化、代码压缩、重定义环境变量等
* 用于解决 loader 无法实现的其它事。

        plugins: [
            new HtmlWebpackPlugin({template: './src/index.html'})
        ]

常用插件：      

* clean-webpack-plugin: ClearWebpackPlugin 清空打包目录 dist
* webpack-bundle-analyzer: BundleAnalyzerPlugin 可视化分析打包后的文件构成
* 

## 模式

功能：

启用相应模式下的 webpack 内置的优化

        module.exports = {
            mode: 'production'      // development 或 production
        };