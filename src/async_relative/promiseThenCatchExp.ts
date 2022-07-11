/**
 * promiseExp1 
 * Promise状态为pending -> fulfilled / rejected
 * fulfilled->resolve()，rejected -> reject()
 */
const promiseExp1 = new Promise((resolve, reject) => {
  resolve("success1");
  reject("fail");
  resolve("success2");
});

promiseExp1.then(res => {
  console.log("then: ", res);
}).catch(err => {
  console.log("catch: ", err);
});
// then: success1

/**
 * promiseExp2
 * 无论catch()放在哪里，都能捕捉到上层没有捕捉到的错误
 * catch()返回一个新的Promise对象，因此会继续执行catch后面的then方法
 */
const promiseExp2 = new Promise((resolve, reject) => {
  reject("fail");
  resolve("success2");
});
promiseExp2.then(res => {
  console.log("then1: ", res);
}).then(res => {
  console.log("then2: ", res);
}).catch(err => {
  console.log("catch: ", err);
}).then(res => {
  console.log("then3: ", res);
})
//catch:fail    then3: undefined


/**
 * 每个 .then() 方法的返回值都是一个新的 Promise
 * 上一个then()的返回值(return的值)作为下一个then()方法的入参
 */
Promise.resolve(1)
  .then(res => {
    console.log(res);
    return 2;
  })
  .catch(err => {
    return 3;
  })
  .then(res => {
    console.log(res);
  })
  .then(res => {
    console.log(res);
  });
// 1 2 undefined

/**
 * 
 */
Promise.reject(1)
  .then(res => {
    console.log(res);
    return 2;
  })
  .catch(err => {
    return 3;
  })
  .then(res => {
    console.log(res);
  })
  .then(res => {
    console.log(res);
  });
// 3 undefined

/**
 * 一旦确定了 Promise 的状态，就无法更改
 * 下列代码中的.then() 不是链式调用，它们都是对 promise 对象的调用
 */
const promiseExp5 = new Promise((resolve, reject) => {
  resolve(1)
})

promiseExp5.then(res => {
  console.log('first then: ', res)
  return 2
})

promiseExp5.then(res => {
  console.log('second then: ', res)
  return 3
})

promiseExp5.then(res => {
  console.log('third then: ', res)
})
// first then: 1  second then: 1  third then: 1

/**
 * new Error() 是一个普通的 JavaScript 对象，return 是一个普通的 JavaScript 关键字，所以这段代码会正常工作，不会抛出异常。
 * 它将返回一个已完成状态且值为 new Error('error!!!') 的对象
 * 抛出错误采用return Promise.reject(new Error('error!!!')); / throw new Error('error!!!')
 */
Promise.resolve().then(() => {
  return new Error('error!!!')
}).then(res =>{
  console.log("then: ", res)
}).catch(err => {
  console.log("catch: ", err)
})
// then: error!!!
