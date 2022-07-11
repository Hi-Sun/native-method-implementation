/**
 * @function splice
 * @description 添加或删除数组中的元素，改变原始数组
 * @param start 必须参数，表示从何处开始插入/删除元素的索引,删除元素则包含该元素被删除，添加新元素则在该元素的前面开始添加
 * @param deleteCount 可选参数，表示删除的元素个数，未规定则为数组长度
 * @param items 可选，表示要添加到数组的新元素
 * @returns Array 如果从 arrayObject 中删除了元素，则返回的是含有被删除的元素的数组
 */

const copyDeleteElement = (array: Array<any>, start: number, deleteCount: number, deleteArr: Array<any>) => {
  for (let i = start; i < start + deleteCount; i++) {
    deleteArr.push(array[i]);
  }
  // for (let i = 0; i < deleteCount; i++) {
  //   let index = start + i;
  //   if (index in array) {
  //     let current = array[index];
  //     deleteArr[i] = current;
  //   }
  // }
}

// 处理 start
const computeStartIndex = (start: number, len: number) => {
  // 处理索引负数的情况
  if (start < 0) {
    return start + len > 0 ? start + len : 0;
  }
  return start >= len ? len : start;
}

//处理 deleteCount
const computeDeleteCount = (start: number, len: number, deleteCount: number) => {
  if (deleteCount < 0) {
    return 0;
  }
  if (deleteCount > len - start) {
    return len - start;
  }
  return deleteCount;
}

const removeElement = (array: Array<any>, start: number, len: number, deleteCount: number, ...addElements: any[]) => {
  // 删除和添加的元素个数相同时，不需要移动数组
  if (deleteCount === addElements.length) return

  // 删除元素的个数 大于 添加的元素个数时，后面的元素整体向前挪动，需要移动 len - start - deleteCount 个元素
  if (deleteCount > addElements.length) {
    for (let i = start + deleteCount; i < len; i++) {
      // 移动的起始位置
      let formIndex = i;
      // 移动到的目标位置
      let toIndex = i - (deleteCount - addElements.length);
      if (formIndex in array) {
        array[toIndex] = array[formIndex];
      } else {
        delete array[toIndex];
      }
    }
    // 目前数组长度为：len + addElements - deleteCount, 数组长度变小，需要删除冗余的元素
    for (let i = len + addElements.length - deleteCount; i < len; i++) {
      delete array[i];
    }
  }

  // 删除元素的个数 小于 添加的元素个数时，后面的元素整体向后挪动, 需要移动 len - start - deleteCount 个元素
  if (deleteCount < addElements.length) {
    for (let i = len - 1; i >= start + deleteCount; i--) {
      // 移动的起始位置
      let fromIndex = i;
      // 将要挪动到的目标位置
      let toIndex = i + (addElements.length - deleteCount);
      if (fromIndex in array) {
        array[toIndex] = array[fromIndex];
      } else {
        delete array[toIndex];
      }
    }
  }
}

Array.prototype.splice = function <T>(start = 0, deleteCount: number, ...addElementsItems: T[]): T[] {
  const array = Object(this);
  const _len = array.length;
  let deleteArr: T[] = [];

  start = computeStartIndex(start, _len);
  deleteCount = computeDeleteCount(start, _len, deleteCount);

  // 判断 sealed 对象和 frozen 对象, 即 密封对象 和 冻结对象
  if (Object.isSealed(array) && deleteCount !== addElementsItems.length) {
    throw new TypeError('the object is a sealed object!')
  } else if (Object.isFrozen(array) && (deleteCount > 0 || addElementsItems.length > 0)) {
    throw new TypeError('the object is a frozen object!')
  }

  // 拷贝删除元素
  copyDeleteElement(array, start, deleteCount, deleteArr);

  // 移动删除元素后面的元素
  removeElement(array, start, _len, deleteCount, addElementsItems);

  // 插入新元素
  for (let i = 0; i < addElementsItems.length; i++) {
    array[start + i] = addElementsItems[i];
  }

  array.length = _len - deleteCount + addElementsItems.length;

  return deleteArr;
};

var myFish = ['angel', 'clown', 'drum', 'mandarin', 'sturgeon'];
var removed = myFish.splice(1, 2, 'drog');
console.log(removed);  //['clown', 'drum']
console.log(myFish);  // ['angel', 'drog', 'mandarin', 'sturgeon']
