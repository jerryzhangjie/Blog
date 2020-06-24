1. 都可以遍历数组：for_in 返回的是键名(序号下标)，而 for_of 返回的是值。

`
const arr = ['a', 'b', 'c']
// for in 循环
for (let i in arr) {
console.log(i)
// 0
// 1
// 2
}

        // for of
        for (let i of arr) {
            console.log(i)
            // a
            // b
            // c
        }

`

2. for_in 可遍历对象返回键名，但 for_of 不能遍历对象(因为对象不具有 iterator 接口)。

`const obj = { a: 1, b: 2, c: 3 } for (let i in obj) { console.log(i) // a // b // c } for (let i of obj) { console.log(i) // Uncaught TypeError: obj is not iterable 报错了 }`

3. vue 中 v-for

V-for 循环遍历数组时推荐使用 of，语法格式为（item，index）

item:在每次迭代时，item 会被赋值为不同的数组元素的值。

index:当前元素的索引。

V-for 循环对象的时使用 in，语法格式为(item,name,index)

item

在每次迭代时，item 会被赋值为不同的对象的属性值。

name

在每次迭代时，name 会被赋值为不同的键名。

index

当前元素的索引。
