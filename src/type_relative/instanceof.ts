/**
 * object instanceof constructor: 用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
 * 原理：通过原型链查找变量A是否是B原型对象的一个实例
 */
const SimpleType = ['null', 'number', 'string', 'undefined', 'symbol', 'boolean']
function myInstanceof(left: any, right: any) {
  if (SimpleType.includes(typeof left)) {
    return false;
  }
  while (true) {
    console.log(left);
    if (left._proto_ === null) {
      return false;
    }
    if (left._proto_ === right.prototype) {
      return true;
    }
    left = left._proto_;
  }
}
class Parent { }
class Child extends Parent {
}
const child = new Child()
// console.log(myInstanceof(child, Parent), myInstanceof(child, Child), myInstanceof(child, Array));
// console.log(myInstanceof(1, Array));
