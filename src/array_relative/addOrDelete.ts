/**
 * 增删元素相关方法
 * pop(): 从数组中删除最后一个元素，并返回该元素的值，改变原数组。
 * push(): 将一个或多个元素添加到数组的末尾，并返回该数组的新长度，改变原数组。
 * shift(): 从数组中删除第一个元素，并返回该元素的值，改变原数组。
 * unshift(): 将一个或多个元素添加到数组的开头，并返回该数组的新长度，，改变原数组。
 */
Array.prototype.pop = function () {
  const array = Object(this);
  const _len = array.length;
  const result = array[_len - 1];
  delete array[_len - 1];
  array.length = _len - 1;
  return result;
}

Array.prototype.push = function (...items: any[]): number {
  const array = Object(this);
  const _len = array.length;
  for (let i = 0; i < items.length; i++) {
    array[_len + i] = items[i];
  }
  return array.length;
}

Array.prototype.shift = function () {
  const array = Object(this);
  const _len = array.length;
  const result = array[0];
  for (let i = 0; i < _len - 1; i++) {
    array[i] = array[i + 1];
  }
  array.length = _len - 1;
  return result;
}

Array.prototype.unshift = function (...items: any[]): number {
  const array = Object(this);
  const _len = array.length;
  for (let i = _len + items.length - 1; i >= items.length; i--) {
    array[i] = array[i - items.length];
  }
  for (let i = 0; i < items.length; i++) {
    array[i] = items[i];
  }
  return array.length;
}


const popData = ['angel', 'clown', 'mandarin', 'surgeon'];

console.log('调用 pop 之前: ' + popData);
// "调用 pop 之前: angel,clown,mandarin,surgeon"

const poped = popData.pop();

console.log('调用 pop 之后: ' + popData);
// "调用 pop 之后: clown,mandarin,surgeon"

console.log('被删除的元素: ' + poped);
// "被删除的元素: surgeon"

const pushData = ['angel', 'clown', 'mandarin', 'surgeon'];

console.log('调用 pushed 之前: ' + pushData);
// "调用 pushed 之前: angel,clown,mandarin,surgeon"

/** @ts-ignore */
const pushed = pushData.push('test', ['yaling', 'baisong']);

console.log('调用 pushed 之后: ' + pushed);
// "调用 pushed 之后: 6"

console.log('调用 pushed 之后的数组为: ' + pushData);
// "调用 pushed 之后的数组为: angel,clown,mandarin,surgeon,test,yaling,baisong"


const shiftData = ['angel', 'clown', 'mandarin', 'surgeon'];

console.log('调用 shift 之前: ' + shiftData);
// "调用 shift 之前: angel,clown,mandarin,surgeon"

const shifted = shiftData.shift();

console.log('调用 shift 之后: ' + shiftData);
// "调用 shift 之后: clown,mandarin,surgeon"

console.log('被删除的元素: ' + shifted);
// "被删除的元素: angel"

const unshiftData = [4, 5, 6];
unshiftData.unshift(1, 2, 3);
/** @ts-ignore */
const unshifted = unshiftData.unshift([-7, -6], [-5]);
console.log('调用 unshift 之后: ' + unshifted);
// "调用 unshift 之后: 8"

console.log('调用 unshift 之后的数组为: ' + unshiftData);
// "调用 unshift 之后的数组为: -7,-6,-5,1,2,3,4,5,6"