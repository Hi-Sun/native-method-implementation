/**
 * @function splice
 * @description 添加或删除数组中的元素，改变原始数组
 * @param start 必须参数，表示从何处开始插入/删除元素的索引
 * @param deleteCount 可选参数，表示删除的元素个数，未规定则为数组长度
 * @param items 可选，表示要添加到数组的新元素
 * @returns Array 如果从 arrayObject 中删除了元素，则返回的是含有被删除的元素的数组
 */
const copyDeleteElement = (array: Array<any>, start: number, deleteCount: number, deleteArr: Array<any>) => {
  for (let i = start; i < start + deleteCount; i++) {
    deleteArr.push(array[i]);
  }
}

const removeElement = (array: Array<any>, start: number, deleteCount: number) => {
  
}

Array.prototype.splice = function <T>(start: number, deleteCount?: number, ...items: T[]): T[] {
  const newArr = Object(this);
  const _len = newArr.length;
  let result: T[] = [];
  // 拷贝删除元素
  if (!!deleteCount) {
    copyDeleteElement(newArr, start, deleteCount, result);
  }
  return result;
};

var myFish = ['angel', 'clown', 'drum', 'mandarin', 'sturgeon'];
var removed = myFish.splice(3, 1);
console.log(removed)
console.log(myFish)
