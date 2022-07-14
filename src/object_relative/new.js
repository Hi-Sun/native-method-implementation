/**
 * 使用new操作符调用构造函数经历的过程
 * @param {*} obj 
 * @returns 
 */
const newFn = function (obj, ...rest) {
  // 基于obj的原型创建一个新的对象
  // const newObj = new Object();
  // newObj._proto = obj.prototype;
  const newObj = Object.create(obj.prototype);
  // 添加属性到新创建的newObj上, 并获取obj函数执行的结果.
  const res = obj.apply(newObj, rest);
  // 如果执行结果有返回值并且是一个对象, 返回执行的结果, 否则, 返回新创建的对象
  return typeof res === 'object' && res !== null ? res : newObj;
}

function Person() { }
const person = new Person();