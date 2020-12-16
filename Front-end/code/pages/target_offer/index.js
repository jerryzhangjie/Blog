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
    dp[i] = Math.max(array[i], dp[i - 1] + array[i])
    total = Math.max(total, dp[i])
  }
  return total
}

/**
 * 2-7
 * 给出一颗二叉树，求树的最大深度
 */

// 分治法
function TreeDepth(pRoot) {
  if (!pRoot) return 0
  let lDepth = TreeDepth(pRoot.left)
  let rDepth = TreeDepth(pRoot.right)
  return Math.max(lDepth, rDepth) + 1
}

/**
 * 2-8
 * 输入一棵二叉树，判断该二叉树是否是平衡二叉树。
 * 平衡二叉树是左子树的高度与右子树的高度差的绝对值小于等于1，同样左子树、右子树也是平衡二叉树
 */

// 递归 - 自上而下  
function IsBalanced_Solution(pRoot) {
  let mp = {}
  function depth(pRoot) {
      if (!pRoot) return 0
      if (mp[pRoot.val]) return mp[pRoot.val]
      let lDepth = depth(pRoot.left)
      let rDepth = depth(pRoot.right)
      return mp[pRoot.val] = Math.max(lDepth, rDepth) + 1
  }
  function judge(pRoot) {
      if (!pRoot) return true
      let lDepth = pRoot.left ? mp[pRoot.left.val] : 0
      let rDepth = pRoot.right ? mp[pRoot.right.val] : 0
      return Math.abs(lDepth - rDepth) <= 1 && judge(pRoot.left) && judge(pRoot.right)
  }
  depth(pRoot)
  return judge(pRoot)
}

/**
 * 2-9
 * 给定一棵二叉搜索树，请找出其中的第k小的结点
 * 例如， （5，3，7，2，4，6，8）中，按结点数值大小顺序第三小结点的值为4。
 */

// 二叉树的中序遍历(不懂)

/**
 * 2-10
 * 不用加减乘除做加法
 */

// 递归位运算，异或、位与 Add(1, 2)为例
function Add(a, b) {
  if (a === 0) return b
  if (b === 0) return a
  let newA = a ^ b // 异或实现加法(不进位)  11
  let newB = (a & b) << 1  // 位与左移一位实现进位  000
  return Add(newA, newB)
}

/**
 * 2-11
 * 给定一个长度为n的数组A，求数组B，B[i] = A[0]A[1]...A[i-1]*A[i+1]...A[n-1]。
 * 要求不能使用除法。
 */

//  暴力求解
function multiply(array) {
  if (array == null || array.length === 0) {
    return []
  }
  let res = []
  let len = array.length
  for (let i = 0; i < len; i++) {
    let bi = 1
    let filArr = array.filter((item, index) => index !== i)
    filArr.map(val => { bi = bi * val})
    res.push(bi)
  }
  return res
}

/**
 * 3-1
 * 跳台阶，一次跳1阶或2阶，问跳到第n阶总共多少种跳法
 */

// 递归
function jumpFloor(number) {
  if (number <= 1) return 1
  return jumpFloor(number - 1) + jumpFloor(number - 2)
}

// 记忆化搜索
function jumpFloor(number) {
  const dp = new Array()
  return jF(number, dp)
}

function jF(number, dp) {
  if (number <= 1) return 1
  if (dp[number] != undefined) return dp[number]
  return dp[number] = jF(number - 1, dp) + jF(number - 2, dp)
}

// 动态规划
function jumpFloor(number) {
  const dp = new Array()
  dp[1] = dp[0] = 1
  for (let i = 2; i <= number; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }
  return dp[number]
}