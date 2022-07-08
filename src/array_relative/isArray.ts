/**
 * @description isArray用于判断入参是否是数组
 * @param arg 
 * @returns 
 */
const isArray = (arg: any) => {
  return Object.prototype.toString.call(arg) === '[object Array]';
}
console.log(isArray([1, 2, 3]));
console.log(isArray('test'))