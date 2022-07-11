/**
 * @function slice
 * @description 返回一个新的数组对象，这一对象是一个由 begin 和 end 决定的原数组的浅拷贝，不改变原数组
 * @param begin 可选参数，提取起始处的索引，省略则默认为0
 * @param end 可选参数，提取终止处的索引，提取不包含该位置元素，省略则默认到原数组的末尾
 * @returns Array 提取元素的新数组
 */

Array.prototype.slice = function <T>(start = 0, end?: number): T[] {
  const array = Object(this);
  const _len = array.length;
  let result: T[] = [];

  let formIndex = start >= 0 ? start : Math.max(0, _len + start);
  let toIndex = typeof end === 'number' ? Math.min(end, _len) : _len;
  toIndex = toIndex < 0 ? _len + end : end;

  const size = toIndex - formIndex;

  if (size > 0) {
    for (let i = formIndex; i < toIndex; i++) {
      result.push(array[i]);
    }
  }

  return result;
}
const fruits = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'];
const citrus = fruits.slice(1, 3);
const res = fruits.slice(-2, -1);
console.log(citrus); // ['Orange', 'Lemon']
console.log(res); // [ 'Apple' ]
console.log(fruits); // ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango']
