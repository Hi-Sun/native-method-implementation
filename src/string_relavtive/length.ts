// 计算一个字符串的长度，单位为字节，其中一个中文字符为2字节，一个英文字符为1个字节
const strLength = (str: string) => {
  let bytes = str.length;
  for (let i = 0; i < bytes; i++) {
    if(str.charCodeAt(i) > 255){
      bytes++;
    }
  }
  return bytes
}
console.log(strLength('我test'))