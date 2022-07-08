/**
 * @function Array.prototype.forEach
 * @description 循环遍历数组每个元素执行执行一次给定的函数，除了抛出异常无法终止或跳出循环，不会改变原数组
 * @description for VS forEach：1.forEach是不能被break打断的，执行break会报错,for循环可以被break打断；2.forEach没有返回值return,for循环内执行return语句会报错
 * @param callback callback三个参数：1.当前值。2.当前索引（可选）3.当前数组（可选）
 * @param thisArg 可选参数，callback被调用时，this都会指向thisArg参数，不指定时this指向全局对象
 */
Array.prototype.forEach = function (callback, thisArg) {
  // null | undefined 不能调用方法
  if ((!this && typeof this === 'object') || typeof this === 'undefined') {
    throw new Error(`Uncaught TypeError: Cannot read properties of ${this}`);
  };
  if (typeof callback !== 'function') {
    throw new Error(`${callback} is not a function`);
  }
  // 获取数组
  const arr = Array.prototype.slice.call(this);
  const _len = arr.length;
  for (let i = 0; i < _len; i++) {
    callback.call(thisArg || this, arr[i], i, arr);
  }
}


/**
 * @function Array.prototype.map
 * @description 循环遍历数组每个元素执行执行一次给定的函数，返回执行结果，不改变原数组
 * @param callback callback三个参数：1.当前值。2.当前索引（可选）3.当前数组（可选）
 * @param thisArg 可选参数，callback被调用时，this都会指向thisArg参数，不指定时this指向全局对象
 */
Array.prototype.map = function (callback: { call: (arg0: any, arg1: number, arg2: any[]) => any; }) {
  // null | undefined 不能调用方法
  if ((!this && typeof this === 'object') || typeof this === 'undefined') {
    throw new Error(`Uncaught TypeError: Cannot read properties of ${this}`)
  };
  if (typeof callback !== 'function') {
    throw new Error(`${callback} is not a function`)
  }
  // 获取数组
  const arr = Array.prototype.slice.call(this);
  const _len = arr.length;
  let result = [];
  for (let i = 0; i < _len; i++) {
    const newItem = callback(arr[i], i, arr)
    result.push(newItem);
  }
  return result;
}


/**
 * @function Array.prototype.every
 * @description 循环遍历数组每个元素是否全部符合给定条件，全部符合则返回true，否则返回false
 * @param callback callback三个参数：1.当前值。2.当前索引（可选）3.当前数组（可选）
 * @param thisArg 可选参数，callback被调用时，this都会指向thisArg参数，不指定时this指向全局对象
 */
Array.prototype.every = function (callback: { call: (arg0: any, arg1: number, arg2: any[]) => any; }, thisArg: any) {
  // null | undefined 不能调用方法
  if ((!this && typeof this === 'object') || typeof this === 'undefined') {
    throw new Error(`Uncaught TypeError: Cannot read properties of ${this}`)
  };
  if (typeof callback !== 'function') {
    throw new Error(`${callback} is not a function`)
  }
  // 获取数组
  const arr = Array.prototype.slice.call(this);
  const _len = arr.length;
  let result: boolean = true;
  for (let i = 0; i < _len; i++) {
    if (!callback.call(thisArg || this, arr[i], i, arr)) {
      result = false;
    }
  }
  return result;
}


/**
 * @function Array.prototype.some
 * @description 循环遍历数组每个元素是否存在符合给定条件的元素，有一个符合则返回true，全都不符合返回false
 * @param callback callback三个参数：1.当前值。2.当前索引（可选）3.当前数组（可选）
 * @param thisArg 可选参数，callback被调用时，this都会指向thisArg参数，不指定时this指向全局对象
 */
Array.prototype.some = function (callback: { call: (arg0: any, arg1: number, arg2: any[]) => any; }, thisArg: any) {
  // null | undefined 不能调用方法
  if ((!this && typeof this === 'object') || typeof this === 'undefined') {
    throw new Error(`Uncaught TypeError: Cannot read properties of ${this}`)
  };
  if (typeof callback !== 'function') {
    throw new Error(`${callback} is not a function`)
  }
  // 获取数组
  const arr = Array.prototype.slice.call(this);
  const _len = arr.length;
  let result: boolean = false;
  for (let i = 0; i < _len; i++) {
    if (callback.call(thisArg || this, arr[i], i, arr)) {
      result = true;
      break;
    }

  }
  return result;
}


/**
 * @function Array.prototype.filter
 * @description 循环遍历数组每个元素筛选出符合给定条件的元素组成的数组
 * @param callback callback三个参数：1.当前值。2.当前索引（可选）3.当前数组（可选）
 * @param thisArg 可选参数，callback被调用时，this都会指向thisArg参数，不指定时this指向全局对象
 */
Array.prototype.filter = function (callback: { call: (arg0: any, arg1: number, arg2: any[]) => any; }, thisArg: any) {
  // null | undefined 不能调用方法
  if ((!this && typeof this === 'object') || typeof this === 'undefined') {
    throw new Error(`Uncaught TypeError: Cannot read properties of ${this}`)
  };
  if (typeof callback !== 'function') {
    throw new Error(`${callback} is not a function`)
  }
  // 获取数组
  const arr = Array.prototype.slice.call(this);
  const _len = arr.length;
  let result = [];
  for (let i = 0; i < _len; i++) {
    if (callback.call(thisArg || this, arr[i], i, arr)) {
      result.push(arr[i]);
    }
  }
  return result;
}

/**
 * @function Array.prototype.reduce
 * @description 数组中的每个元素按序执行一个 reducer 函数，每一次运行 reducer 会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值。
 * @param callbackfn callbackfn.上一次调用 callbackFn 时的返回值.2.当前正在处理的元素（可选）3.当前索引值（可选）4.用于遍历的数组
 * @param initialValue 可选参数，第一次调用的初始值，若指定该值，则callbackfn第一个参数为initialValue，从第0个元素开始遍历，否则初始值为arr[0]，从第一个元素开始遍历,
 */
/** @ts-ignore */
Array.prototype.reduce = function (callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: any[]) => any, initialValue: any): any {
  // null | undefined 不能调用方法
  if ((!this && typeof this === 'object') || typeof this === 'undefined') {
    throw new Error(`Uncaught TypeError: Cannot read properties of ${this}`);
  };
  if (typeof callbackfn !== 'function') {
    throw new Error(`${callbackfn} is not a function`)
  }
  // 获取数组
  const arr = Array.prototype.slice.call(this);
  if (arr.length === 0 && typeof initialValue === 'undefined') {
    throw new Error(`Uncaught TypeError: 数组为空且未指定初始值 initialValue`);
  }
  const _len = arr.length;
  let result = typeof initialValue === 'undefined' ? arr[0] : initialValue;
  let i = typeof initialValue === 'undefined' ? 1 : 0;
  for (i; i < _len; i++) {
    result = callbackfn.call(this, result, arr[i], i, arr);
  }
  return result;
}

// test data
const forArr = [1, 2, 3, 4, 5];
const forResult = forArr.forEach(item => item + 1);
console.log(`forEach执行后原数组为${forArr}`);
console.log(`forEach执行后返回的执行结果为${forResult}`);

const newMapArr = forArr.map(item => item + 3);
console.log(`map执行后原数组为${forArr}`);
console.log(`map执行后返回的结果为${newMapArr}`);

const newfilterArr = forArr.filter(item => item > 2);
console.log(`filter执行后返回的结果为${newfilterArr}`);

let redulesum_none = forArr.reduce(function (previousValue, currentValue) {
  return previousValue + currentValue
});
let redulesum = forArr.reduce(function (previousValue, currentValue) {
  return previousValue + currentValue
}, 100);
console.log(redulesum_none, redulesum)

const everyArr = new Array({ name: '张三' }, { name: '李四' }, { name: '王五' });
const everyArrResult1 = everyArr.every((item) => item.name !== '张三')
const everyArrResult2 = everyArr.every((item) => item.name !== '赵四')
console.log(everyArrResult1, 'everyArrResult1');
console.log(everyArrResult2, 'everyArrResult2');

const someArrResult1 = everyArr.some((item) => item.name === '张三')
const someArrResult2 = everyArr.some((item) => item.name === '赵四')
console.log(someArrResult1, 'someArrResult1');
console.log(someArrResult2, 'someArrResult2');
