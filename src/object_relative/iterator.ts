/**
 * 基本可迭代对象，next()方法，返回{done: boolean, value: 值}
 */
const a: any = {
  [Symbol.iterator]() {
    let index: number = 0;
    // 迭代器对象继承于一个原型对象，如数组迭代器原型对象为数组迭代器的原型，为ArrayIteratorPrototype
    const itProperty = Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]))
    const it = Object.assign(Object.create(itProperty), {
      next: () => {
        // @ts-ignore
        if (index < this.length) {
          return {
            done: false,
            // @ts-ignore
            value: this[index++]
          }
        } else {
          return {
            done: true,
            value: undefined
          }
        }
      },
    })
    return it
  }
}


/**
 * 生成器实现可迭代对象, 生成器：双向数据流的迭代器，可暂停执行的函数
 */
const b: any = {
  [Symbol.iterator]: function* () {
    for (let index = 0; index < this.length; ++index) {
      yield this[index];
    }
  }
}

