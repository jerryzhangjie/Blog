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
console.log(myInstanceof(b, B), myInstanceof(b, A), myInstanceof(b, C))

/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

/**
 * new 操作符
 * 原理：
 *  new 依次实现了
 *      1.创建一个空对象；
 *      2.将空对象的隐式原型(__proto__)指向构造函数的显式原型(prototype)；
 *      3.构造函数的this指向空对象，并执行该构造函数，将其属性和方法添加到this(空对象)上，形成实例对象并返回。
 * 注意：
 *  构造函数一般不带返回值。
 *      1.无返回值时，new 负责返回创建的对象；
 *      2.返回原始值时，new 会忽略该值并依然返回创建的对象；
 *      3.返回对象时，new 不起作用，等同于调用了普通函数并返回该对象。
 */
function myNew(constructor, ...args) {
    const obj = {}
    Object.setPrototypeOf(obj, constructor.prototype)
    const returnVal = constructor.apply(obj, args)   // 构造函数的返回值(如果有的话)
    return returnVal instanceof Object ? returnVal : obj
}
// Demo
function constructor(name, weight) {
    this.name = name
    this.weight = weight
    // return '123'
    // return {a: 123}
}
const newObj = myNew(constructor, 'Jerry', 70)
console.log('----------------- myNew -----------------')
console.log(newObj)

/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

/**
 * call
 * 原理：
 *   1.不指定目标对象时，默认为 window
 *   2.将调用函数的 this 指向目标对象，并执行函数获得返回值，等价与将调用函数设置为目标对象的一个属性方法，执行该属性方法获得返回值
 */
Function.prototype.myCall = function(context, ...args) {
    context = context || window
    const func = Symbol()
    context[func] = this    // this即为调用函数，eg: getFullName.call(obj, 'Jerry', 'Zhang')
    const result = context[func](...args)
    delete context[func]
    return result
}

/**
 * apply
 */
Function.prototype.myApply = function(context, arr) {
    arr = arr || []
    return this.myCall(context, ...arr)
}

/**
 * bind
 */
Function.prototype.myBind = function(context, ...argsA) {
    const self = this
    return function(...argsB) {
        return self.myApply(context, argsA.concat(argsB))
    }
}

// Demo
const obj = {
    firstName: 'Jack',
    lastName: 'Ma',
    getFullName() {
        return this.firstName + ' ' + this.lastName
    }
}
const targetObj = {
    firstName: 'Jerry',
    lastName: 'Zhang'
}
console.log('----------------- myCall、myApply、myBind -----------------')
console.log(obj.getFullName.myCall(targetObj))
console.log(obj.getFullName.myApply(targetObj))
let bindFunc = obj.getFullName.myBind(targetObj)
console.log(bindFunc())

/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

/**
 * Object.assign
 */
Object.assign = function(target, ...objs) {
    objs.forEach(obj => {
        if (obj !== null) {
            for (let key in obj) {
                target[key] = obj[key]
            }
        }
    })
    return target
}
// Demo
let target = {
    a: 123
}
console.log('----------------- Object.assign -----------------')
console.log(Object.assign(target, {b: 'abc'}))

/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

