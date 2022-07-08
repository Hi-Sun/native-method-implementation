/**
 * @function Array.prototype.flat
 * @description 按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回
 * @description 数组扁平化,会自动去除空位元素
 */
/** 实现方法一：forEach + 递归 */
Array.prototype.flat = function (depth?: number) {
  const dep = depth || 1;
  // 缓存递归结果
  const result: any[] = [];
  const arr = Object(this);
  // 开始递归
  (function myFlat(arr, dep) {
    // forEach 会自动去除数组空位
    arr.forEach((item: any) => {
      if (Array.isArray(item) && dep > 0) {
        // 递归数组
        myFlat(item, dep - 1);
      } else {
        // 缓存元素
        result.push(item);
      }
    });
  })(arr, dep)
  // 返回递归结果
  return result
};
const flatArr = [1, 2, [1, [2]]];
// console.log(flatArr.flat());

/** 实现方法二：for...of + 递归 */
// for of 循环不能去除数组空位，需要手动去除
const flatDeep = (arr: Array<any>, dep = 1): any => {
  const result = [];
  (function (arr, dep) {
    for (let item of arr) {
      if (Array.isArray(item) && dep > 0) {
        result.push(flatDeep(item, dep - 1));
      } else {
        // 去除空元素，添加非 undefined 元素
        item !== void 0 && result.push(item);
      }
    }
  })(arr, dep)
  return result
}

/** 实现方法三：reduce + concat  */
const deepFlat = (arr: Array<any>, dep = 1): any => {
  if (dep > 0) {
    // reduce 按序执行一个数组拼接，初始值为空数组[]，current为数组时进行递归扁平化
    return arr.reduce((preview, current) => preview.concat(Array.isArray(current) ? deepFlat(current, dep - 1) : current), [])
  } else {
    // slice() 方法返回一个新的数组对象,浅复制
    return arr.slice();
  }
}
console.log(deepFlat(flatArr));
console.log(flatArr)
