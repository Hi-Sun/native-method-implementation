/**
 * Generator 生成器对象，标识function* + yield表达式, 
 * 调用next()方法返回yield表达式运行结果value+已经是否已经迭代结束标识done
 * 调用一个生成器函数并不会马上执行它里面的语句，而是返回一个这个生成器的 迭代器 （ iterator ）对象。
 * 当这个迭代器的 next() 方法被首次（后续）调用时，其内的语句会执行到第一个（后续）出现yield的位置为止，yield 后紧跟迭代器要返回的值。
 * 或者如果用的是 yield*（多了个星号），则表示将执行权移交给另一个生成器函数（当前生成器暂停执行）
 * @param items 
 * @returns 
 */
function myIterator(items: any) {
  let i = 0;
  return {
    next() {
      const done = i >= items.length;
      const value = done ? undefined : items[i++];
      return {
        value, // 返回迭代的值
        done // 返回是否全部迭代完成标识
      }
    }
  }
}