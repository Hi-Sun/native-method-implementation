/**
 * koa-compose：洋葱模型依赖的核心库-控制中间件内部内容的执行顺序
 */

function compose(middleware) {
  // 参数校验：判断middleware是否为数组
  if (!Array.isArray(middleware)) {
    throw new TypeError('Middleware stack must be an array!')
  }

  // 数组内容校验：中间件数组中每一项必须是一个方法
  const filter = middleware.filter(item => typeof item !== 'function');
  if (filter.length !== 0) {
    throw new TypeError('Middleware must be composed of functions!')
  }

  return function (context, next) {
    // 开始中间件执行，从数组第一个开始
    return dispatch(0);

    // 中间件执行函数
    function dispatch(i) {
      // 取出需要执行的中间件
      let fn = middleware[i];

      // 如果i等于数组长度，说明数组已经执行完了
      if (i === middleware.length) {
        // fn等于外部传进来的next，结束执行
        fn = next;
      }

      // 如果外部没有传结束执行的next，直接就resolve
      if (!fn) {
        return Promise.resolve();
      }

      // 执行中间件，注意传给中间件接收的参数应该是context和next
      // 传给下一个中间件的next是函数，一定注意这里是使用的bind dispatch.bind(null, i + 1)
      // 所以中间件里面调用 next 的时候其实调用的是dispatch(i + 1)，也就是执行下一个中间件
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return promise.reject(err);
      }
    }

  };
}