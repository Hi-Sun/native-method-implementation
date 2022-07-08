
/**
 * @function Array.prototype.find()
 * @description 返回数组中满足提供的测试函数的第一个元素的值，否则返回undefined
 * @param predicate 接受三个参数：1.当前遍历的元素；2.当前遍历的索引值，可选；3.数组本身，可选
 * @param thisArg 可选 执行回调时用作 this 的对象
 * @returns any
 */
Array.prototype.find = function <T>(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any) {
  if (this == null) {
    throw new TypeError('"this" is null or not defined');
  }
  if (typeof predicate !== 'function') {
    throw new TypeError('predicate must be a function');
  }
  const arr = Object(this);
  const _len = arr.length;
  for (let i = 0; i < _len; i++) {
    if (predicate.call(thisArg || this, arr[i], i, arr)) {
      return arr[i];
    }
  }
  return undefined;
}

/**
 * @function Array.prototype.findIndex()
 * @description 返回数组中满足提供的测试函数的第一个元素的值的索引值，如果没有找到符合的元素则返回-1
 * @param predicate 接受三个参数：1.当前遍历的元素；2.当前遍历的索引值，可选；3.数组本身，可选
 * @param thisArg 可选 执行回调时用作 this 的对象
 * @returns number
 */
Array.prototype.findIndex = function <T>(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any) {
  if (this == null) {
    throw new TypeError('"this" is null or not defined');
  }
  if (typeof predicate !== 'function') {
    throw new TypeError('predicate must be a function');
  }
  const arr = Object(this);
  const _len = arr.length;
  for (let i = 0; i < _len; i++) {
    if (predicate.call(thisArg || this, arr[i], i, arr)) {
      return i;
    }
  }
  return -1;
}


/**
 * @function Array.prototype.includes()
 * @description 查找数组中是否包含某元素，如果包含返回true，不包含返回false
 * @returns boolean
 */
Array.prototype.includes = function (searchElement: any, position?: number) {
  if (this === null) {
    throw new TypeError('"this" is null or not defined');
  }
  const arr = Object(this);
  const _len = arr.length;
  for (let i = 0; i < _len; i++) {
    if (arr[i] === searchElement) {
      return true;
    }
  }
  return false;
}

/**
 * @function Array.prototype.indexOf()
 * @description 查找数组中是否包含某元素，如果包含返回第一个元素的索引值，不包含则返回-1
 * @returns number
 */
Array.prototype.indexOf = function (searchElement: any, position?: number) {
  if (this === null) {
    throw new TypeError('"this" is null or not defined');
  }
  const arr = Object(this);
  const _len = arr.length;
  for (let i = 0; i < _len; i++) {
    if (arr[i] === searchElement) {
      return i;
    }
  }
  return -1;
}

/**
 * @function Array.prototype.lastIndexOf()
 * @description 查找数组中是否包含某元素，如果包含返回最后一个元素的索引值，不包含则返回-1
 * @returns number
 */
Array.prototype.lastIndexOf = function (searchElement: any, position?: number) {
  if (this === null) {
    throw new TypeError('"this" is null or not defined');
  }
  const arr = Object(this);
  const _len = arr.length;
  for (let i = _len - 1; i >= 0; i--) {
    if (arr[i] === searchElement) {
      return i;
    }
  }
  return -1;
}

// test data
const testData = [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1];
const findRes = testData.find(item => item > 4); // 5
const findIndexRes = testData.findIndex(item => item > 4); // 4
const includeRes = testData.includes(5); // true
const indexOfRes = testData.indexOf(5); // 4
const lastIndexOfRes = testData.lastIndexOf(5); // 6
console.log(findRes, findIndexRes, includeRes, indexOfRes, lastIndexOfRes)