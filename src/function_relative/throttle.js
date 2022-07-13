
// 节流：固定时间段内触发一次执行一次，若中间段内再次触发则重新计算时间。每隔一定时间，执行一次函数


/**
 * @description 定时器版(尾节流)；第一次触发时不会执行，而是在delay秒之后才执行，当最后一次停止触发后，还会再执行一次函数。
 * @param fn 重复调用的函数
 * @param delay 节流的时间
 */
function throttle1(fn, delay) {
  // 重置定时器
  let timer = null;
  // 返回闭包函数
  return function () {
    // 记录事件参数
    const args = arguments;
    // 如果定时器为空
    if (!timer) {
      // 开启定时器
      timer = setTimeout(() => {
        // 执行函数
        fn.apply(this, args);
      }, delay)
    }
  }
}

/**
 * @description 时间戳版(首节流)：触发事件时立即执行，以后每过delay秒之后才执行一次，并且最后一次触发事件若不满足要求不会被执行
 * @param fn 重复调用的函数
 * @param delay 节流的时间
 */
function throttle2(fn, delay) {
  // 记录第一次的调用时间
  let prev = null;
  // 返回闭包函数
  return function () {
    // 保存事件参数
    const args = arguments;
    // 记录现在调用的时间
    const now = new Date();
    // 如果间隔时间大于等于设置的节流时间
    if (now - prev >= delay) {
      // 执行函数
      fn.apply(this, args);
      // 将现在的时间设置为上一次执行时间
      prev = now;
    }
  }
}

/**
 * @description 时间戳+定时器版：触发事件时立即执行，以后每过delay秒之后才执行一次，并且最后一次触发事件也会被执行
 * @param fn 重复调用的函数
 * @param delay 节流的时间
 */
function throttle3(fn, delay) {
  // 记录第一次的调用时间
  let prev = null;
  // 初始化定时器
  let timer = null;
  // 返回闭包函数
  return function () {
    // 保存事件参数
    const args = arguments;
    // 记录现在调用的时间
    const now = new Date();
    // 清除定时器
    clearTimeout(timer);
    // 如果间隔时间大于等于设置的节流时间
    if (now - prev >= delay) {
      // 执行函数
      fn.apply(this, args);
      // 将现在的时间设置为上一次执行时间
      prev = now;
    } else {
      // 否则，过了剩余时间执行最后一次fn
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, delay)
    }
  }
}