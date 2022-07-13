/**
 * Function.prototype.call: 使用一个指定的 this 值和单独给出的一个或多个参数(参数列表)来调用一个函数
 * Function.prototype.apply: 调用一个具有给定 this 值的函数，以及以一个数组（或一个类数组对象）的形式提供的参数。
 * Function.prototype.bind: 创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用.
 * 严格模式下,未指定第一个参数是为undefined，非严格模式下，第一参数若为null/undefined则自动替换为指向全局对象
 */


/**
 * @param this 调用函数
 * @param thisArg 指定的this
 * @param argArray 一个或多个参数列表
 * @returns 调用有指定 this 值和参数的函数的结果
 */
/**@ts-ignore */
Function.prototype.myCall = function (thisArg) {
  thisArg = thisArg || window;
  // 在thisArg上扩展一个fn方法指向调用myCall的方法的this
  let fn = Symbol(thisArg);
  thisArg[fn] = this;
  // 处理参数 去除第一个参数this 其它传入fn函数
  let arg = [...arguments].slice(1);
  //执行fn
  const result = thisArg[fn](...arg);
  //删除方法
  delete thisArg[fn];
  // 返回执行结果
  return result;
}


/**
 * @param this 调用函数
 * @param thisArg 指定的this
 * @param argArray 参数数组
 * @returns 调用有指定 this 值和参数的函数的结果
 */
/**@ts-ignore */
Function.prototype.myApply = function (thisArg) {
  thisArg = thisArg || window;
  // 在thisArg上扩展一个独一无二的属性以免覆盖原有属性，该属性指向调用myCall的方法的this
  let fn = Symbol(thisArg);
  thisArg[fn] = this;
  // 处理参数 去除第一个参数this 其它传入fn函数
  let arg = [...arguments].slice(1);
  //执行fn
  const result = thisArg[fn](arg);
  //删除方法
  delete thisArg[fn];
  // 返回执行结果
  return result;
}


/**
 * @description 改变指定方法的this后执行，以函数的形式返回执行结果
 * @param thisArg 指定的this
 * @returns 返回一个原函数的拷贝，并拥有指定的 this 值和初始参数。
 */
/**@ts-ignore */
Function.prototype.myBind = function (thisArg) {
  const fn = this;
  const args = Array.from(arguments).slice(1);
  const newFunc = function () {
    const newArgs = args.concat(...arguments);
    /**@ts-ignore */
    if (this instanceof newFunc) {
      // 通过 new 调用，绑定 this 为实例对象
      /**@ts-ignore */
      fn.apply(this, newArgs);
    } else {
      // 通过普通函数形式调用，绑定 thisArg
      fn.apply(thisArg, newArgs);
    }
  }
  // 支持 new 调用方式, Object.create防止原型链篡改
  newFunc.prototype = Object.create(fn.prototype);
  return newFunc;
}



// 测试
const me = { name: 'Jack' };
const other = { name: 'Jackson' };
const another = { name: 'Lucy' };
function say() {
  /**@ts-ignore */
  console.log(`My name is ${this.name || 'default'}`);
}

/**@ts-ignore */
say.myCall(me);
/**@ts-ignore */
say.myApply(other);
/**@ts-ignore */
const otherBind = say.myBind(another);
otherBind();