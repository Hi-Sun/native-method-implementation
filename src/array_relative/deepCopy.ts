/**
 * @description 数组的深复制与浅复制：浅复制复制的是地址指针，深复制复制的值
 * @param arr 复制的数组
 */
type ObjectProps = {
  [key: string]: any;
  [key: number]: any;
}

const deepCloneObj = <T>(obj: ObjectProps | Array<T>): ObjectProps | Array<T> => {
  if (typeof obj !== 'object') return obj;

  const objClone: Array<T> | ObjectProps = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    if (obj[key] && typeof obj[key] === 'object') {
      objClone[key] = deepCloneObj(obj[key]);
    } else {
      objClone[key] = obj[key];
    }
  }

  return objClone;
}

const exampleArray = [1, 2, 3, 4, 5];
console.log(`原数组为：${exampleArray}`);
// 浅复制
const shallow_copy_example = exampleArray;
shallow_copy_example.push(6);
// 深复制
const deep_copy_example = deepCloneObj(exampleArray);
deep_copy_example.push(7);
// 浅复制复制的指针，新数组改变原数组也改变；深复制复制的值，新数组改变，原数组不变
console.log(`浅复制后的数组改变后为：${exampleArray},深复制的数组改变后：${exampleArray}`);