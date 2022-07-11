### 异步任务
异步任务分为宏任务和微任务，宏任务的优先级低于微任务
微任务包括Promise.then()、async/await、process.nextTick(node独有)、Object.observe、MutationObserver
宏任务包括script代码、setTimeout、setInternal、网络请求Ajax(浏览器独有)、fs.readFile读取文件(node独有)、I/O、UI render(浏览器独有)、requestAnimationFrame(浏览器独有)
promise本身是一个同步的代码(只是容器)，只有它后面调用的then()方法里面的回调才是微任务
await右边的表达式还是会立即执行,表达式之后的代码才是微任务, await微任务可以转换成等价的promise微任务分析
script标签本身是一个宏任务， 当页面出现多个script标签的时候，浏览器会把script标签作为宏任务来解析
浏览器的事件循环
浏览器的事件循环由一个宏任务队列+多个微任务队列组成。
首先，执行第一个宏任务：全局Script脚本。产生的的宏任务和微任务进入各自的队列中。执行完Script后，把当前的微任务队列清空。完成一次事件循环。
接着再取出一个宏任务，同样把在此期间产生的回调入队。再把当前的微任务队列清空。以此往复。
宏任务队列只有一个，而每一个宏任务都有一个自己的微任务队列，每轮循环都是由一个宏任务+多个微任务组成。

node的事件循环
node的事件循环比浏览器复杂很多。由6个宏任务队列+6个微任务队列组成。
其执行规律是：在一个宏任务队列全部执行完毕后，去清空一次微任务队列，然后到下一个等级的宏任务队列，以此往复。一个宏任务队列搭配一个微任务队列。
六个等级的宏任务全部执行完成，才是一轮循环。

事件循环执行过程：首先执行第一个宏任务：全局Script脚本。
1.遇到同步代码，立即执行 
2.遇到宏任务,放入到宏任务队列里
3.遇到微任务,放入到微任务队列里
4.执行完所有同步代码
5.执行宏任务中的微任务代码
6.微任务代码执行完毕，本次队列清空
7.寻找下一个宏任务
8.重复步骤1

### Promise
Promise具有三种状态：pending(挂起中)、fulfilled(执行成功)、rejected(执行失败)
状态只能从pending -> fulfilled 或者 pending -> rejected，状态一旦改变无法更改
pending -> fulfilled 状态变化执行reslove回调函数，reslove执行then回调
pending -> rejected 状态变化执行reject回调函数，reject回调函数执行catch回调
.then 或 .catch 的参数应该是一个函数，如果参数不是函数，则此 .then 或 .catch 将被忽略。
.then 或 .catch 返回的值不能是 Promise 本身，否则会导致死循环，代码会抛出异常TypeError: Chaining cycle detected for promise #<Promise>。
.then 或 .catch 返回一个新的promise对象，会继续执行后面的链式回调
上一个.then方法的返回值(return)会作为下一个.then方法的入参
无论.catch放在哪里，都能捕捉到上层没有捕捉到的错误
promise本身是一个同步的代码，其后面调用的then方法里面的回调是微任务

```shell

# 抛出错误采用
return Promise.reject(new Error('error!!!'));
# or 
throw new Error('error!!!')

```