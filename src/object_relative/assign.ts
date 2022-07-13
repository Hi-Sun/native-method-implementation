/**
 * @description Object.assign 主要是将所有可枚举属性的值从一个或多个源对象复制到目标对象，同时返回目标对象。
 * @param target 目标对象
 * @param sources 源对象
 * @returns 返回修改后的目标对象target
 * 如果目标对象中的属性具有相同的键，则属性值将被源对象中的属性值覆盖，浅拷贝。
 * Symbol类型的属性会被拷贝，而且不会跳过那些值为null和undefined的源对象。
 */
Object.assign = function <T, U>(target: T, sources: U): T & U {
  const to = Object(target);
  for (let i = 0; i < arguments.length; i++) {
    const nextSource = arguments[i];
    if(nextSource != null){
      for(let key in nextSource){
        if(Object.prototype.hasOwnProperty.call(nextSource, key)){
          to[key] = nextSource[key];
        }
      }
    }
  }
  return to
}