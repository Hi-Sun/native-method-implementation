/**
 * @description 函数柯里化：将一个接受多个参数的函数转换为接受一个参数的函数的固定形式
 * @param {*} fn 待柯里化的原函数
 * @param {*} length 所需的参数个数，默认为实参个数
 * @returns 一次接受一个参数的函数
 */
function curry(fn, length = fn.length) {
  return function nest(...args) {

    // 关键知识点：function.length 用来获取函数的形参个数
    // 当参数接收的数量达到了函数fn的形参个数，即所有参数已经都接收完毕则进行最终的调用
    if (args.length >= length) {
      return fn.apply(this, args);
    }
    // 参数还未完全接收完毕，递归返回judge，将新的参数传入
    return function (...args2) {
      return nest.apply(this, args.concat(args2));
    }

  }
}

/**
 * 反柯里化
 */
function unCurry(fn) {

  return function (...args) {
    let ret = fn;
    for (let i = 0; i < args.length; i++) {
      // 反复调用currying版本的函数
      ret = ret[args[i]];
    };

    return ret;
  }

}

/**
 * 实现方法二
 */
function add() {
  const _args = [...arguments] // 3、我怎么知道add没有参数了呢？先要收集参数吧,收集第一次的参数
  function fn() { // 1、函数要返回一个函数(我是否可以先声明一个函数，然后返回)
    _args.push(...arguments) // 3、收集第二次的参数
    return fn // 4、还要在函数fn内部返回fn(这里可能会想这个会不会死循环，答案是不会，因为返回的是fn而不是让fn()执行)
  }
  fn.toString = function () {
    return _args.reduce((acc, cur) => acc + cur)
  }
  return fn // 1、函数要返回一个函数(我是否可以先声明一个函数，然后返回)
}

console.log(add(1)(2)(3)(4).toString())
console.log(add(1)(1, 2, 3)(2).toString())


// 测试
function sum(a, b, c) {
  return a + b + c
}
const curriedSum = curry(sum)
console.log(curriedSum(1, 2, 3))
console.log(curriedSum(1)(2, 3))
console.log(curriedSum(1)(2)(3))
/**
step1:
nest(1) --> else --> nest(1,arg);
step2:
nest(1, 2) --> else --> nest(1,2,arg);
step3:
nest(1, 2, 3) --> if --> fn(1, 2, 3) --> addNum(1, 2, 3) --> return 6
*/

function curry(func) {
  const args = [];
  return function result(...rest) {
    console.log('rest', ...rest);
    if (rest.length === 0) {
      return func(...args);
    } else {
      args.push(...rest);
      return result
    }
  }
}
const add = (...args) => args.reduce((a, b) => a + b);
const sum = curry(add);
console.log(sum(1)(2)(3)(4)());
