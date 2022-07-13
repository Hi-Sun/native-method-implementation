/**
 * 防抖：在一定时间内多次触发只执行一次，如快速多次点击按钮，只执行第一次点击或最后一次点击 debounce
 * @param fn 重复调用的函数
 * @param delay 防抖的时间
 */
function debounce(fn, delay) {
  // 设置一个定时器
  let timer = null;
  // 返回一个闭包函数，用闭包保存定时器timer使其不被销毁，重复触发会清理上一次的定时器
  return function () {
    // 保存事件参数，防止fn函数需要事件参数里面的数据
    const args = arguments;
    // 调用一次就清除上一次的定时器timer
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    // 开启这一次的定时器
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay)
  }
}