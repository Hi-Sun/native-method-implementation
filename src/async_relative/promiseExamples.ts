// Promise1 promise 本身属于同步任务
console.log('start');
const promise1 = new Promise((resolve, reject) => {
  console.log(1);
})
console.log('end');
// start 1 end


// Promise2 resolve被调用，所以处于resolved状态，then回调被执行，属于微任务
console.log('start');

const promise2 = new Promise((resolve, reject) => {
  console.log(1)
  resolve(2)
})

promise2.then(res => {
  console.log(res)
})

console.log('end');
// start 1 end 2


// Promise3 resolve 进入微任务队列不会中断函数的执行，其后面的代码会继续执行
console.log('start');

const promise3 = new Promise((resolve, reject) => {
  console.log(1)
  resolve(2)
  console.log(3)
})

promise3.then(res => {
  console.log(res)
})

console.log('end');
// start 1 3 end 2

// Promise4 resolve/reject没有被调用，所以一直处于pending状态，then回调未被执行
console.log('start');

const promise4 = new Promise((resolve, reject) => {
  console.log(1)
})

promise4.then(res => {
  console.log(2)
})

console.log('end');
// start 1 end

// Promise5 先执行同步代码，再执行异步代码  同步代码按调用顺序执行
console.log('start')

const fn = () => (new Promise((resolve, reject) => {
  console.log(1);
  resolve('success')
}))

console.log('middle')

fn().then(res => {
  console.log(res)
})

console.log('end')
// start middle 1 end success

// Promise6 
console.log('start')

Promise.resolve(1).then((res) => {
  console.log(res)
})

Promise.resolve(2).then((res) => {
  console.log(res)
})

console.log('end')
// start end 1 2


//Promise7 异步任务中微任务优先级高于宏任务，setTimeout属于宏任务，resolve/reject属于微任务
console.log('start')

setTimeout(() => {
  console.log('setTimeout')
})

Promise.resolve().then(() => {
  console.log('resolve')
})

console.log('end')
//start end resolve setTimeout 

//Promise8 同步任务 -> 微任务 -> 宏任务 -> 再次执行(宏任务中新添加)的同步任务 ->  再次执行(宏任务中新添加)的微任务 
const promise = new Promise((resolve, reject) => {
  console.log(1);
  setTimeout(() => {
    console.log("timerStart");
    resolve("success");
    console.log("timerEnd");
  }, 0);
  console.log(2);
});

promise.then((res) => {
  console.log(res);
});

console.log(4);
//1 2 4 timerStart timerEnd success

// Promise9 首先执行所有微任务 -> 执行宏任务 -> 再次执行所有（新添加的）微任务 -> 执行下一个宏任务 -> 绕圈穿过
const timer1 = setTimeout(() => {
  console.log('timer1');

  const promise1 = Promise.resolve().then(() => {
    console.log('promise1')
  })
}, 0)

const timer2 = setTimeout(() => {
  console.log('timer2')
}, 0)
// timer1 promise1 timer2 

// Promise10 同步代码 -> 所有微任务 -> 第一个宏任务 -> 所有新添加的微任务 -> 下一个宏任务...
console.log('start');

const promise10 = Promise.resolve().then(() => {
  console.log('promise1');
  const timer2 = setTimeout(() => {
    console.log('timer2')
  }, 0)
});

const timer10 = setTimeout(() => {
  console.log('timer1')
  const promise2 = Promise.resolve().then(() => {
    console.log('promise2')
  })
}, 0)

console.log('end');
//start end promise1 timer1 promise2 timer2