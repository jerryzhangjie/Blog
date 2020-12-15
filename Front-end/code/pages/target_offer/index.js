/**
 * 1-1
 * 求斐波那且数列的第n项
 */

// 方法1：递归
// T(n)=O(2^n)  S(n)=
function Fibonacci(n) {
  if (n === 0 || n === 1) return n
  return Fibonacci(n - 1) + Fibonacci(n - 2)
}

// 方法2：记忆化搜索
// 自上而下
function Fib(n, dp) {
  if (n === 0 || n === 1) return n
  if (dp[n] !== -1) return dp[n]
  return dp[n] = Fib(n - 1, dp) + Fib(n - 2, dp)
}
function Fibonacci(n) {
  const dp = []
  for (let i = 0; i <= 39; i++) {
    dp.push(-1)
  }
  return Fib(n, dp)
}

// 方法3：动态规划
// 自下而上
function Fibonacci(n) {
  if (n === 0 || n === 1) return n
  const dp = [0, 1]
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }
  return dp[n]
}

// 方法3：动态规划，优化空间复杂度
function Fibonacci(n) {
  if (n === 0 || n === 1) return n
  let a = 0, b = 1, c
  for (let i = 2; i <= n; i++) {
    c = a + b
    a = b
    b = c
  }
  return c
}

/**
 * 2-1
 * 用两个栈来实现一个队列，完成队列的Push和Pop操作。 队列中的元素为int类型
 */

// 方法：模拟
const stack1 = []
const stack2 = []

function push(node) {
  stack1.push(node)
  stack2.unshift(node)
}
function pop() {
  stack1.shift()
  return stack2.pop()
}

/**
 * 2-2
 * 把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。
 * 输入一个非递减排序的数组的一个旋转，输出旋转数组的最小元素。
 * NOTE：给出的所有元素都大于0，若数组大小为0，请返回0。
 */

// 方法1：二分查找算法(运行超时，暂未查到原因)
function minNumberInRotateArray(arr) {
  const len = arr.length
  if (len === 0) {
    return 0
  }
  let fi = 0
  let la = len - 1
  while (arr[fi] >= arr[la]) {
    const mid = Math.floor((fi + la) / 2)
    if (arr[mid] >= arr[la]) {
      fi = mid
    } else {
      la = mid
    }
  }
  return arr[fi]
}

/**
 * 2-3
 * 一只青蛙一次可以跳上1级台阶，也可以跳上2级……它也可以跳上n级。
 * 求该青蛙跳上一个n级的台阶总共有多少种跳法。
 */
// 递归
/**
 * 假设当前已经在第 n 阶，总方法数可表示为 f(n)，那么：
 *  可能是跳 1 阶上来的，即从 n-1 阶上来的，而跳到 n-1 的总方法数可表示为 f(n-1)
 *  可能是跳 2 阶上来的，即从 n-2 阶上来的，而跳到 n-2 的总方法数可表示为 f(n-2)
 *  ...
 *  可能是跳 1 阶上来的，即从 1 阶上来的，而跳到 1 的总方法数可表示为 f(1)
 *  可能是跳 0 阶上来的，即从 0 阶上来的，而跳到 0 的总方法数可表示为 f(0)
 *  即，f(n)=f(n-1)+f(n-2)+...+f(1)+f(0)
 *  而，f(n-1)=f(n-2)+f(n-3)+...+f(1)+f(0)
 *  所以，f(n)=2*f(n-1)
 *  显然，f(1)=f(0)=1
 */
function jumpFloorII(number) {
  if (number === 0 || number === 1) return 1
  return 2 * jumpFloorII(number - 1)
}

/**
 * 2-4
 * 操作给定的二叉树，将其变换为源二叉树的镜像。
 */

// 方法1：递归
function TreeNode(x = 'a') { // 模拟二叉树
  this.val = x;
  this.left = null;
  this.right = null;
}
function Mirror(root) {
  let temp = new TreeNode()
  if (root) {
    temp = root.left
    root.left = root.right
    root.right = temp
    Mirror(root.left)
    Mirror(root.right)
  }
}

/**
 * 2-5
 * 数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。
 * 例如输入一个长度为9的数组[1,2,3,2,2,2,5,4,2]。
 * 由于数字2在数组中出现了5次，超过数组长度的一半，因此输出2。如果不存在则输出0。
 */

// 方法1: 哈希法
function MoreThanHalfNum_Solution(numbers) {
  const len = numbers.length
  if (len === 1) return numbers[0]
  const note = {}
  let result = 0
  for (let i = 0; i < len; i++) {
    const item = String(numbers[i])
    if (!note[item]) {
      note[item] = 1
    } else {
      note[item] += 1
      if (note[item] > len / 2) {
        result = Number(item)
        break
      }
    }
  }
  return result
}

// 方法2: 排序
function MoreThanHalfNum_Solution(numbers) {
  const len = numbers.length
  if (len === 1) return numbers[0]
  const sortNums = numbers.sort()
  const mid = sortNums[Math.ceil(len / 2) - 1]
  let total = 0, result = 0
  for (let i = 0; i < len; i++) {
    if (sortNums[i] === mid) {
      total += 1
    }
  }
  if (total > len / 2) {
    result = mid
  }
  return result
}

/**
 * 2-6
 * 给定一个数组，求连续子数组的最大和。要求时间复杂度为 O(n).
 */

// 方法1:递进求和做比较
function FindGreatestSumOfSubArray(array) {
  let total = array[0]
  let curTotal = 0
  let len = array.length
  for (let i = 0; i < len; i++) {
    let item = array[i]
    if (curTotal + item < 0) {
      curTotal = 0
    } else {
      curTotal += item
    }
    total = Math.max(curTotal, total)
  }
  if (curTotal != 0) {
    return total
  } else {
    // 元素都为负数
    let maxItem = array[0]
    for (let i = 1; i < len; i++) {
      if (maxItem < array[i]) {
        maxItem = array[i]
      }
    }
    return maxItem
  }
}

// 方法2:动态规划
function FindGreatestSumOfSubArray(array) {
  let len = array.length
  let total = array[0]
  const dp = new Array()
  dp[0] = array[0]
  for (let i = 1; i < len; i++) {
      dp[i] = Math.max(array[i], dp[i-1]+array[i])
      total = Math.max(total, dp[i])
  }
  return total
}

/**
 * 2-7
 * 写一个函数，求两个整数之和，要求在函数体内不得使用+、-、*、/四则运算符号。
 */

