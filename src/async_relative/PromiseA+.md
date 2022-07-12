# Promises/A+
promise表示一个异步操作的最终结果，其主要的交互方式是通过then方法，then方法注册两个回调函数，一个回调函数用于接收promise执行成功时的执行结果最终值，另外一个回调函数接收执行失败时的失败的原因

## Terminology 术语
promise：一个具有then方法的对象或者函数，其行为符合本规范；
thenable：一个定义了then方法的对象或者函数；
value：是任意的合法js值(包括undefined、promise、thenable)；
exception：是使用throw语句抛出的值；
reason：是说明为什么promise会执行失败(reject)的值；

## Requirements 规范要求

### Promise States
一个  promise 一定处于以下三种状态之一：pending、fulfilled、rejected，
1. 当处于 pending 状态时，promise：
  1. 其可能转变为 fulfilled 或 rejected 状态。
1. 当处于 fulfilled 状态时，promise：
  1. 其状态不可改变；
  1. 必须有一个不可变的值value，用于说明执行结果。
1. 当处于 rejected 状态时，promise：
  1. 其状态不可改变；
  1. 必须有一个不可变的原因reason，用于说明失败原因。

### The `then` Method
一个 promise 必须提供then()方法来访问其当前或最终执行结果值value/原因reason
then()方法接受两个参数：
```js
promise.then(onFulfilled, onRejected)
```
1. onFulfilled 和 onRejected 都是可选参数：
  1. 如果 onFulfilled 不是函数，该参数将被忽略
  1. 如果 onRejected 不是函数，该参数将被忽略 
1. 如果 onFulfilled 是一个函数：
  1. 其必须在 promise 状态为 fulfilled 时被调用，promise 的值 value 作为其第一个参数；
  1. 其最多被调用一次
1. 如果 onRejected 是一个函数：
  1. 其必须在 promise 状态为  rejected 时被调用，promise 的失败原因 reason 作为其第一个参数；
  1. 其最多被调用一次
1. 在执行上下文栈仅包含平台代码(指引擎、环境和promise实现代码)之前，不得调用 onFulfilled 或 onRejected - (宏任务)
1. onFulfilled 和 onRejected 必须作为函数被调用(即没有this值)
1. 对于同一个 promise，then() 方法可以被调用多次
  1. 如果 promise 状态是 fulfilled，所有相应的未执行的 onFulfilled 回调必须按照其对 then() 的原始调用的顺序被执行；
  1. 如果 promise 状态是 rejected，所有相应的未执行的 onRejected 回调必须按照其对 then() 的原始调用的顺序被执行；
1. then() 方法必须返回一个 promise 对象
  ```js
    promise2 = promise1.then(onFulfilled, onRejected);
  ```
  1. 如果 onFulfilled 或 onRejected 返回一个值value x, 运行 Promise 解决程序(The Promise Resolution Procedure) `[[Resolve]](promise2, x)`
  1. 如果 onFulfilled 或 onRejected 抛出一个错误exception e, promise2 必须执行reject，且 e 作为reason `reject(e)`
  1. 如果 onFulfilled 不是一个函数且 promise1 的状态为 fulfilled，则 promise2 必须以与 promise1 相同的值 value 执行 `resolve()`
  1. 如果 onRejected 不是一个函数且 promise1 的状态为 rejected， 则 promise2 必须以与 promise1 相同的原因 reason 执行 `reject()`

### The Promise Resolution Procedure Promise 解决程序
**promise resolution procedure** 是一个以 promise 和值 value 作为输入的抽象操作, 将其表示为 `[[Resolve]](promise, x)`. 如果 `x` 是一个 thenable, 则它试图使 `promise` 采用`x` 的状态, 前提是 `x` 看起来像是一个promise. 否则, 它使用值 `x` 实现 `promise`.
`[[Resolve]](promise, x)` 的执行过程为：
1. 如果 `promise` 与 `x` 引用同一个对象，则使用 `TypeError` 作为reject promise 的原因 reason `reject(new TypeError('Chaining cycle detected for promise'))`；
1. 如果 `x` 是一个 promise，即一个具有then方法的对象或者函数，则
  1. 如果 `x` 状态是 `pending`，`promise` 必须维持pending状态直到 `x` 状态改变；
  1. 如果 `x` 状态是 `fulfilled`，fulfill `promise` 具有相同执行结果value；
  1. 如果 `x` 状态是 `rejected`，reject `promise` 具有相同失败原因reason；
1. 如果 `x` 是一个对象或者函数：
  1. 设置  `let then = x.then`;
  1. 如果检索属性 `x.then` 报错 `e`，则 `promise` 为执行具有失败原因 `e` 的`reject(e)`;
  1. 如果 `x.then` 存在且为一个函数，则将 `x` 作为 `this` 调用 `x.then` 方法，第一个参数为 `resolvePromise`，第二个参数为 `rejectPromise`，其中：
    1. 当使用值value `y` 调用 `resolvePromise` 方法，运行 `[[Resolve]](promise, y)`;
    1. 当使用失败原因reason `r` 调用 `rejectPromise` 方法，reject `promise` `reject(r)`;
    1. 
    1. 如果调用 `x.then` 方法抛出错误exception `e`，
      1. 如果`resolvePromise` 或者 `rejectPromise`已经被调用，则忽略 `e`；
      1. 否则，reject `promise` `reject(r)`
1. 如果 `x` 不是一个对象或者函数：fulfill `promise` `resolve(x)`
如果一个promise是用一个参与循环的thenable链来解析的，那么`[[Resolve]](promise, thenable)`的递归性质会导致再次调用`[[Resolve]](promise, thenable)`，遵循上述算法将导致无限递归。

### Note
1. 严格模式下，`this` 在其内部为 `undefined`, 在sloppy模式下，`this` 将是全局对象
1. 如果满足所有要求，则允许`promise2 === promise1`
1.
