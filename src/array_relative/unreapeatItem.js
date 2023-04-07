/**
 *  数组元素去重实现方法一：两层for循环，时间复杂度O(n^2)
 */
function unique1(arr) {
  if (!Array.isArray(arr)) return 'TypeError';

  const _len = arr.length;

  if (_len <= 1) return arr;

  let res = [];

  for (let i = 0; i < _len; i++) {
    let flag = true;
    for (let j = i + 1; j < _len; j++) {
      if (arr[i] === arr[j]) {
        flag = false;
      }
    }
    if (flag) {
      res.push(arr[i]);
    }
  }
  return res;
}

/**
 * 实现方法二：一层for循环时间复杂度O(n) + includes时间复杂度O(n)，总时间复杂度O(n^2)
 */
function unique2(arr) {
  if (!Array.isArray(arr)) return 'TypeError';

  const _len = arr.length;

  if (_len <= 1) return arr;

  let res = [];

  for (let i = 0; i < _len; i++) {
    if (!res.includes(arr[i])) {
      res.push(arr[i]);
    }
    // if (res.indexOf(arr[i]) === -1) {
    //   res.push(arr[i]);
    // }
  }
  return res;
}


/**
 * 实现方法三：先排序再比较相邻元素，总时间复杂度O(n^2)
 */
function unique3(arr) {
  if (!Array.isArray(arr)) return 'TypeError';

  const _len = arr.length;

  if (_len <= 1) return arr;

  let res = [arr[0]];

  arr = arr.sort();

  for (let i = 1; i < _len; i++) {
    if (arr[i] !== arr[i - 1]) {
      res.push(arr[i])
    }
  }

  return res;

}

/**
 * 实现方法四：filter时间复杂度O(n) + Map，总时间复杂度O(n)
 */
function unique4(arr) {
  if (!Array.isArray(arr)) return 'TypeError';

  const _len = arr.length;

  if (_len <= 1) return arr;

  const res = new Map();

  return arr.filter(item => (!res.has(item)) && res.set(item, 1));

}


/**
 * 实现方法五：利用对象属性，总时间复杂度O(n),不能区分数字和字符串
 */
function unique5(arr) {
  if (!Array.isArray(arr)) return 'TypeError';

  const _len = arr.length;

  if (_len <= 1) return arr;

  let res = [];
  let obj = {};

  for (let i = 0; i < _len; i++) {
    if (!obj[arr[i]]) {
      res.push(arr[i]);
      obj[arr[i]] = 1;
    } else {
      obj[arr[i]]++;
    }
  }

  return res;

}

/**
 * 实现方法六：利用set与解构赋值，总时间复杂度O(1)
 */
function unique6(arr) {
  if (!Array.isArray(arr)) return 'TypeError';

  return [...new Set(arr)];

}

/**
 * 实现方法七：利用set与Array.from，总时间复杂度O(1)
 */
function unique7(arr) {
  if (!Array.isArray(arr)) return 'TypeError';

  return Array.from(new Set(arr));

}

const test1 = [1, 2, 4, 2, 3, 5, 3];
const test2 = ['1', 2, undefined, undefined, 4, 1, null, 2, null, 3, 5, 3];
console.log('unique1 test1: ', unique1(test1));
console.log('unique2 test1: ', unique2(test1));
console.log('unique3 test1: ', unique3(test1));
console.log('unique4 test1: ', unique4(test1));
console.log('unique5 test1: ', unique5(test1));
console.log('unique6 test1: ', unique6(test1));
console.log('unique7 test1: ', unique7(test1));

console.log('unique1 test2: ', unique1(test2));
console.log('unique2 test2: ', unique2(test2));
console.log('unique3 test2: ', unique3(test2));
console.log('unique4 test2: ', unique4(test2));
console.log('unique5 test2: ', unique5(test2));
console.log('unique6 test2: ', unique6(test2));
console.log('unique7 test2: ', unique7(test2));
