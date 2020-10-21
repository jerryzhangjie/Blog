/**
 * instanceof
 * 原理：当原型函数(right)的 prototype 出现在实例对象(left)的 __proto__ 原型链上，instanceof 返回 true，否则返回 false
 */
function myInstanceof(left, right) {
    let proto = Object.getPrototypeOf(left)
    while (proto) {
        if (proto === right.prototype) {
            return true
        }
        proto = Object.getPrototypeOf(proto)
    }
    return false
}
// Demo
class A {}
class B extends A {}
class C {}

const b = new B()
console.log('----------------- myInstanceof -----------------')
console.log(myInstanceof(b, B))
console.log(myInstanceof(b, A))
console.log(myInstanceof(b, C))

