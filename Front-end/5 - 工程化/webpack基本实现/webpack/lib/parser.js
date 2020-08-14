/**
 * 主要功能：
 *  1. getAST： 将获取到的模块内容 解析成AST语法树
 *  2. getDependencies：遍历AST，将用到的依赖收集起来
 *  3. transform：把获得的ES6的AST转化成ES5
 */

const fs = require('fs')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const { transformFromAst } = require('babel-core')

module.exports = {
    // 解析代码生成AST
    getAST: (path) => {
        const source = fs.readFileSync(path, 'utf-8')
        return parser.parse(source, {
            sourceType: 'module'    // 解析的是ES模块
        })
    },

    // 对AST递归遍历
    getDependencies: (ast) => {
        const dependencies = []
        traverse(ast, {
            ImportDeclaration: ({ node }) => {
                dependencies.push(node.source.value)
            }
        })
        return dependencies
    },

    // 将ES6的AST转为ES5的AST
    transform: (ast) => {
        const { code } = transformFromAst(ast, null, {
            presets: ["env"],
        })
        return code
    }
}