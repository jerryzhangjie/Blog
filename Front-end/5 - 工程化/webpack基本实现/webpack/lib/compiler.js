/**
 * 主要更能：
 *  1. 接收webpack.config.js配置参数，并初始化entry、output
 *  2. 开启编译run方法。处理构建模块、收集依赖、输出文件等
 *  3. buildModule方法。主要用于构建模块（被run方法调用）
 *  4. emitFiles方法。输出文件（同样被run方法调用）
 */

const path = require('path')
const fs = require('fs')
const { getAST, getDependencies, transform } = require('./parser')


module.exports = class Compiler {
    // options - new Compiler(options).run() 传入的参数，
    // 参数值就是webpack.config.js的配置内容
    constructor(options) {
        const { entry, output } = options
        this.entry = entry
        this.output = output
        this.modules = []
    }

    // 开启编译
    run() {
        const entryModule = this.buildModule(this.entry, true)
        this.modules.push(entryModule)
        this.modules.map((_module) => {
            _module.dependencies.map((dependency) => {
                this.modules.push(this.buildModule(dependency))
            })
        })
        console.log(this.modules)
        this.emitFiles()
    }

    // 构建模块 filename-文件名、isEntry-是否是入口文件
    buildModule(filename, isEntry) {
        let ast;
        if (isEntry) {
            ast = getAST(filename);
        } else {
            const absolutePath = path.join(process.cwd(), "./src", filename);
            ast = getAST(absolutePath);
        }

        return {
            filename, // 文件名称
            dependencies: getDependencies(ast), // 依赖列表
            transformCode: transform(ast), // 转化后的代码
        }
    }

    // 输出文件
    emitFiles() {

    }
}