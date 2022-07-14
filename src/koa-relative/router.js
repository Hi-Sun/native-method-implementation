class Router {
  constructor() {
    this._routes = []; // 缓存路由规则
  }
  get(url, handler) {  // 设置method为get的路由规则
    this._routes.push({ // 将规则加入缓存中
      url: url,
      method: 'GET',
      handler
    });
  }
  routes() {
    return async (ctx, next) => {
      const { method, url } = ctx; // 获取当前请求的method和URL
      const methodRouter = this._routes.find(r => r.method === method && r.url === url); // 从缓存规则中找出匹配的规则
      if (methodRouter && methodRouter.handler) {
        await methodRouter.handler(context, next); // 执行路由规则中的处理函数，响应请求
      } else {
        await next();
      }
    }
  }
}
module.export = Router