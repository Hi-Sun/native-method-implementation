/**
 * setInterval定时器用于实现函数每隔一个固定时间重复调用一次，返回一个interval ID，该ID唯一标识时间间隔，可通过调用clearInterval方法传入该ID移除定时器
 * setInterval内部的实现是使用requestAnimationFrame实现的，该方法自带函数节流
 * requestAnimationFrame要求浏览器在下次重绘之前调用指定的回调函数更新动画,该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行
 * requestAnimationFrame返回一个 long 整数，请求 ID ，是回调列表中唯一的标识，可以传这个值给 window.cancelAnimationFrame() 以取消回调函数。
 * setTimeout定时器用于实现在过了一个固定时间后执行一次函数
 */


/**
 * @description 使用setTimeout实现setInterval，并可以随时取消
 * @param {*} fn 重复调用的函数，第一次执行在delay毫秒时间之后
 * @param {*} delay 每次延迟的毫秒数
 * @returns 用于取消定时器的箭头函数
 */
function mySetInterval1(fn, delay) {
  let timer;
  const loop = () => {
    timer = setTimeout(() => {
      loop();
      fn();
    }, delay)
  };
  loop();
  // 返回一个箭头函数clearInterval用于随时取消定时任务
  return () => {
    clearInterval(timer)
  }
}


/**
 * @description 使用requestAnimationFrame模拟setInterval
 * @param {} fn 
 * @param {*} delay 
 */
function mySetInterval2(fn, delay) {
  const startTime = Date.now();
  const loop = () => {
    const timer = requestAnimationFrame(loop);
    const endTime = Date.now();
    if (endTime - startTime >= delay) {
      startTime = endTime;
      fn.call(this, timer);
    }
  }
  loop();
}

// 执行mySetInterval开始定时打印，设置stop可随时取消定时任务
const stop = mySetInterval1(() => {
  console.log('test setInterval');
}, 2000);

stop();

console.log(Object.prototype.toString.call(undefined))