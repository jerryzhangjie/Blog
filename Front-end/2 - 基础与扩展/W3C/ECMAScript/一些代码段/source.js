/**
 * 1. instanceof
 * 原理：
 *      当原型函数的 prototype 出现在实例对象的 _proto_ 原型链上，instanceof 返回 true，否则返回 false
 */
function myInstanceof(left, right) {
    let proto = left._proto_
    while (proto) {
        if (proto === right.prototype) {
            return true
        }
        proto = proto._proto_
    }
    return false
}

// Demo
class A{}
class B extends A{}
class C{}

const b = new B()
console.log('--------------------myInstanceof---------------------')
console.log(myInstanceof(b, B))   // true
console.log(myInstanceof(b, A))   // true
console.log(myInstanceof(b, C))   // false

/**
 * 2. new 操作符
 * 原理：
 *      new 依次实现了 
 *          a.创建一个空对象；
 *          b.将空对象的隐式原型指向构造函数的显式原型；
 *          c.将构造函数的this指向空对象，并执行该构造函数将属性和方法添加到空对象上，生成实例对象并返回。
 * 注意：
 *      构造函数一般不带返回值。
 *          a.无返回值时，new 负责返回创建的对象；
 *          b.返回原始值时，new 会忽略该值并依然返回创建的对象；
 *          c.返回对象时，new 不起作用，等同于调用了普通函数并返回该对象。
 */
function myNew(constructor, ...args) {
    const obj = {}
    Object.setPrototypeOf(obj, constructor.prototype)
    const returnVal = constructor.apply(obj, args)
    return returnVal instanceof Object ? returnVal : obj
}

// Demo
function constructor(name, weight) {
    this.name = name
    this.weight = weight
    // return 'abc'
    // return {a: '123'}
}

const newObj = myNew(constructor, 'Jerry', 70)
console.log('--------------------myNew---------------------')
console.log(newObj)