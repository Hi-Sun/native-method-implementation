/**
 * Promise对象有三种状态pending、fulfilled、rejected，接受两个回调函数resolve、reject
 * 状态改变：pending -> fulfilled, then()执行onFulfilled回调；pending -> rejected, then执行onRejected回调
 * 成功时，不可转为其他状态，且必须有一个不可改变的值（value），用于作为then()方法的成功回调onFulfilled的入参
 * 失败时，不可转为其他状态，且必须有一个不可改变的原因（reason），用于作为then()方法的失败回调onRejected的入参
 * 一个Promise可以多个then方法，所以定义两个数组分别用于存取每个then里面的两个函数，当状态还未改变时存于数组中，当状态改变时，再调用他们执行
 */
class MyPromise {
  // 声明属性
  state: 'pending' | 'fulfilled' | 'rejected';
  value: undefined;
  reason: undefined;
  onResolvedCallbacks: any[];
  onRejectedCallbacks: any[];
  static all: (promises: any) => Promise<unknown>;
  static race: (promises: any) => Promise<unknown>;
  static reject: (val: any) => Promise<unknown>;
  static resolve: (val: any) => Promise<unknown>;

  constructor(executor: (resolve: (value: any) => void, reject: (reason: any) => void) => void) {
    // 初始状态
    this.state = 'pending';
    // 成功的值
    this.value = undefined;
    // 失败的原因
    this.reason = undefined;
    // 成功存放的数组(处理一个Promise多个then的情况，非链式then)
    this.onResolvedCallbacks = [];
    // 失败存放的数组(处理一个Promise多个then的情况，非链式then)
    this.onRejectedCallbacks = [];

    let resolve = (value: any) => {
      if (this.state === 'pending') {
        // 修改状态为fulfilled，并存储成功的值
        this.state = 'fulfilled';
        this.value = value;
        // 一旦resolve执行，调用成功数组的函数
        this.onResolvedCallbacks.forEach(fn => fn());
      }
    };
    let reject = (reason: any) => {
      if (this.state === 'pending') {
        // 修改状态为rejected，并存储失败的原因
        this.state = 'rejected';
        this.reason = reason;
        // 一旦reject执行，调用失败数组的函数
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };

    try {
      executor(resolve, reject)
    } catch (err) {
      // executor执行失败则直接执行reject
      reject(err)
    }
  }

  /**
   * promise.then(onFulfilled[, onRejected])
   * @param onFulfilled 
   * @param onRejected 
   * @returns new Promise
   */
  then(onFulfilled: (value: any) => void, onRejected: (reason: any) => void) {
    // 状态为fulfilled时，执行成功回调onFulfilled
    let promise2 = new Promise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        let x = onFulfilled(this.value);
        resolvePromise(promise2, x, resolve, reject);
        // onFulfilled(this.value);
      }
      // 状态为rejected时，执行失败回调onRejected
      if (this.state === 'rejected') {
        let x = onRejected(this.reason);
        resolvePromise(promise2, x, resolve, reject);
      }
      // 状态为pending时，onFulfilled传入到成功数组, onRejected传入到失败数组
      if (this.state === 'pending') {
        this.onResolvedCallbacks.push(() => {
          let x = onFulfilled(this.value);
          resolvePromise(promise2, x, resolve, reject);
        });
        this.onRejectedCallbacks.push(() => {
          let x = onRejected(this.reason);
          resolvePromise(promise2, x, resolve, reject);
        });
      }
    })
    // 返回promise，完成链式
    return promise2
  }

  catch(fn: (reason: any) => void) {
    return this.then(() => { }, fn);
  }
}

/**
 * Promise静态方法
 */

//resolve方法
MyPromise.resolve = function (val) {
  return new Promise((resolve, reject) => {
    resolve(val);
  });
}
//reject方法
MyPromise.reject = function (err) {
  return new Promise((resolve, reject) => {
    reject(err);
  });
}
//race方法 
MyPromise.race = function (promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(resolve, reject);
    };
  })
}
//all方法(获取所有的promise，都执行then，把结果放到数组，一起返回)
MyPromise.all = function (promises) {
  let arr: any[] = [];
  let i = 0;
  function processData(index: number, data: any) {
    arr[index] = data;
    i++;
    if (i === promises.length) {
      promises.resolve(arr);
    };
  };
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then((data: any) => {
        processData(i, data);
      }, reject);
    };
  });
}

/**
 * 
 * x 不能是null或者promise本身
 * x 是普通值 直接resolve(x)
 * x 是对象或者函数（包括promise），let then = x.then
 * 如果取then报错，则走reject()
 * 如果then是个函数，则用call执行then，第一个参数是this，后面是成功的回调和失败的回调
 * 如果成功的回调还是pormise，就递归继续解析
 * 成功和失败只能调用一个 所以设定一个called来防止多次调用
 * @param promise2 
 * @param x 
 * @param resolve 
 * @param reject 
 */
function resolvePromise(promise2: Promise<any>, x: any, resolve: (value: any) => void, reject: (reason: any) => void) {
  // then()/catch()返回的值不能是 Promise 本身，否则会导致死循环
  if (x === promise2) {
    return reject(new TypeError('Chaining cycle detected for promise'))
  }
  // 防止多次调用
  let called = false;
  // x不是null 且x是对象或者函数
  if (x != null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      // A+规定，声明then = x的then方法
      let then = x.then;
      // 如果then是函数，就默认是promise了
      if (typeof then === 'function') {
        /**@ts-ignore */
        then.call(x, y => {
          // 成功和失败只能调用一个
          if (called) return;
          called = true;
          // resolve的结果依旧是promise 那就继续解析
          resolvePromise(promise2, y, resolve, reject);
        }, (err: any) => {
          // 成功和失败只能调用一个
          if (called) return;
          called = true;
          // err调用reject
          reject(err);
        })
      } else {
        resolve(x);
      }
    } catch (err) {
      // 成功和失败只能调用一个
      if (called) return;
      called = true;
      // 取then失败，err调用reject
      reject(err);
    }
  } else {
    resolve(x);
  }

}




// console.log('start');
// const promise32 = new MyPromise((resolve, reject) => {
//   console.log(1)
//   resolve(2);
// })
// promise32.then((res) => {
//   console.log(res);
// }, () => { })

// console.log('end');
console.log('start');

const promise87 = new Promise((resolve, reject) => {
  console.log(1)
  resolve(null)
})
promise87.then((res) => {
  console.log(res);
}, () => { })