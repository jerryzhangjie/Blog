// 随机排序
function randomSort(arr) {
    return arr.sort(function () {
        return Math.random() > 0.5 ? -1 : 1
    })
}
console.log('随机排序', randomSort([1, 2, 3, 4, 5, 6, 7]))

// 冒泡排序
// 双循环逐一比较两个元素，交换顺序
// 时间复杂度：O(n^2)，空间复杂度：O(1)
function sort1(arr) {
    const len = arr.length
    for (let i = 0; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
            if (arr[j] > arr[i]) {
                [arr[i], arr[j]] = [arr[j], arr[i]]
            }
        }
    }
    return arr
}
console.log('冒泡排序', sort1([1,3,2,7,5,8,4]))

// 插入排序
// 类比摸扑克牌的过程，新摸到的牌比手中的大则放到前边，新摸到的比手中的小则放到后边
// 时间复杂度：，空间复杂度：
function sort2(arr) {
    let hand = [arr[0]]
    let arrLen = arr.length
    for (let i = 1; i < arrLen; i++) {
        const handLen = hand.length
        if (arr[i] >= hand[handLen - 1]) {
            hand.push(arr[i])
        } else if (arr[i] <= hand[0]) {
            hand.unshift(arr[i])
        } else {
            for (let j = 0; j < handLen - 1; j++) {
                if (arr[i] >= hand[j] && arr[i] <= hand[j + 1]) {
                    hand.splice(j + 1, 0, arr[i])
                    break
                }
            }
        }
    }
    return hand
}
console.log('插入排序', sort2([2,1,4,6,8,3,2,4,6,73,2,4,6]))

// 快速排序
// 找到数组中间位置的元素，拿每个元素与中间元素比，大的放左边数组中，小的方右边数组中，针对新数组重复该操作
// 时间复杂度：，空间复杂度：
function sort3(arr) {
    const len = arr.length
    if (len <= 1) {
        return arr
    }
    let middle = Math.floor(len/2)
    let mdlItm = arr[middle-1]
    arr.splice(middle-1, 1)
    const leftArr = [], rightArr = []
    for (let i = 0; i < len -1; i++) {
        if (arr[i] < mdlItm) {
            leftArr.push(arr[i])
        } else {
            rightArr.push(arr[i])
        }
    }
    return sort3(leftArr).concat(mdlItm, sort3(rightArr))
}
console.log('快速排序', sort3([3,12,4,6,73,5,6,3,5,72,4]))



function unique(arr) {
    // 编写代码
    const len = arr.length
    const newArr = []
    const changeArr = []
    let uniqueArr = []
    let targetArr = []
    for (let i = 0; i < len; i++) {
        let item = arr[i]
        if (typeof item === 'object') {
            item = JSON.stringify(item)
            changeArr.push(item)
        }
        newArr.push(item)
    }
    uniqueArr = [...new Set(newArr)]
    let uniqueLen = uniqueArr.length
    for (let i = 0; i < uniqueLen; i++) {
        let item = uniqueArr[i]
        if (changeArr.indexOf(item) > -1) {
            item = JSON.parse(item)
        }
        targetArr.push(item)
    }
    console.log(targetArr)
 }
 unique([123,{a:1},{a:1},{a:{b:1}},[1,2],[1,2],[1,'2']])