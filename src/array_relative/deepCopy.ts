/**
 * @description 数组的深复制与浅复制：浅复制复制的是地址指针，深复制复制的值
 * @param arr 复制的数组
 */
const deepCopy = <T>(arr: Array<T>): Array<T> => {
  const newArr: Array<T> = [];
  for (let i = 0; i < arr.length; i++) {
    newArr.push(arr[i]);
  }
  return newArr;
}
const example = [1, 2, 3, 4, 5];
console.log(`原数组为：${example}`);
// 浅复制
const shallow_copy_example = example;
shallow_copy_example.push(6);
// 深复制
const deep_copy_example = deepCopy(example);
deep_copy_example.push(7);
// 浅复制复制的指针，新数组改变原数组也改变；深复制复制的值，新数组改变，原数组不变
console.log(`浅复制后的数组改变后为：${example},深复制的数组改变后：${example}`)