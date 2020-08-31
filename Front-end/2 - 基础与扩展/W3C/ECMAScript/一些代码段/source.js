/**
 * instanceof
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
class A { }
class B extends A { }
class C { }

const b = new B()
console.log('--------------------myInstanceof---------------------')
console.log(myInstanceof(b, B))   // true
console.log(myInstanceof(b, A))   // true
console.log(myInstanceof(b, C))   // false

/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

/**
 * new 操作符
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

/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

/**
 * Promise  
 * 是一个对象，可以理解成一个盒子，里边存放着一个值（这个值是执行某个异步操作得到的），resolve、reject负责修改Promise的状态，并将“值”传递出去
 * @param {function} handle 唯一的参数，是个函数，而这个函数有两个参数：resolve、reject，二者也是函数。
 * resolve 用于将Promise的状态从 Pending(进行中) 变为 Fulfilled(已成功)，并接收Promise的值，并将值传递出去
 * reject 用于将Promise的状态从 Pending(进行中) 变为 Rejected(已失败)，并接收Promise的值，并将值传递出去
 */
const isFun = fun => typeof fun === 'function'  // 判断是否为函数
// 定义Promise的三种状态常量
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'
class MyPromise {
    constructor(handle) {
        if (!isFun(handle)) {
            throw new Error('MyPromise must accept a function parameter')
        }
        // 添加状态
        this._status = PENDING
        // 添加值
        this._value = undefined
        // 执行handle
        try {
            handle(this._resolve.bind(this), this._reject.bind(this))
        } catch (err) {
            this._reject(err)
        }
    }
    // 添加resovle时执行的函数
    _resolve(val) {
        if (this._status !== PENDING) return
        this._status = FULFILLED
        this._value = val
    }
    // 添加reject时执行的函数
    _reject(err) {
        if (this._status !== PENDING) return
        this._status = REJECTED
        this._value = err
    }
    // 添加then方法
    then(onFulfilled, onRejected) {
        const { _value, _status } = this
        // 返回一个新的Promise对象
        return new MyPromise((onFulfilledNext, onRejectedNext) => {
            switch (_status) {
                // 当状态为pending时，将then方法回调函数加入执行队列等待执行
                case PENDING:
                    break
                // 当状态已经改变时，立即执行对应的回调函数
                case FULFILLED:
                    onFulfilled(_value)
                    break
                case REJECTED:
                    onRejected(_value)
                    break
            }
        })
    }
}

/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

/**
 * call
 */
Function.prototype.call = function(context, ...args) {
    context = context || window
    const func = Symbol()
    context[func] = this
    const result = context[func](...args)
    delete context[func]
    return result
}
/**
 * apply
 */
Function.prototype.apply = function(context, arr) {
    context = context || window
    const func = Symbol()
    context[func] = this
    const result = context[func](...arr)
    delete context[func]
    return result
}
/**
 * bind
 */
Function.prototype.bind = function(context, ...argsA) {
    const self = this
    return function(...argsB) {
        return self.apply(context, argsA.concat(argsB))
    }
}

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

/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */


