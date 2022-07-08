/**
 * 原生抽象操作ToPrimitive方法-作为对象的函数值属性存在的,是JS原始值转换算法
 * step1.valueOf(); step2.ToString();step3.Type Error
 */

type PrimitiveType = 'string' | 'number' | '';
const BasicType = ['string', 'number', 'boolean', 'symbol', 'undefined']
const isBasicType = (value: any) => {
  return BasicType.includes(typeof value) || value === null
}

/**
 * @description ToPrimitive
 * @description 转换过程如下
 * @description number: val → val.valueOf() → val.toString() → error
 * @description string: val → val.toString() → val.valueOf() → error
 * @description default: 同 number
 * @param input 调用的对象
 * @param PreferredType 期望返回的结果类型
 */
const ToPrimitive = (input: any, PreferredType: PrimitiveType = '') => {
  if (typeof input !== 'object' || input === null) {
    return input;
  }
  if (PreferredType === 'string') {
    if (isBasicType(input.toString())) {
      return input.toString();
    } else if (isBasicType(input.valueOf())) {
      return input.valueOf();
    } else {
      throw new Error('TypeError 异常')
    }
  } else {
    if (isBasicType(input.valueOf())) {
      return input.valueOf();
    } else if (isBasicType(input.toString())) {
      return input.toString();
    } else {
      throw new Error('TypeError 异常')
    }
  }
}
console.log(ToPrimitive(3))