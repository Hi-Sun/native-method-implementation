
## 观察者模式
```js
 * 当对象之间存在一对多的依赖关系时，其中一个对象的状态发生改变，所有依赖它的对象都会收到通知
 * 主体：目标对象Subject + 观察者Observer
 * 目标对象负责：
  1. 维护观察者列表observerList；`observerList数组`;
  2. 添加观察者/移除观察者；`add(observer)` `remove(observer)`
  3. 定义通知观察者方法，当自身发生变化时，通调用自己的notify方法依次通知每个观察者执行update方法 `notify()`;
 * 观察者负责：
  1. 实现自身update方法，供目标对象改变时目标对象调用，update方法中的逻辑自定义  `update()`
```

 ## 发布订阅者模式
 ```js
 * 主体：服务发布者Publisher + 事件中心Event Channel + 服务订阅者Subscriber
 * 服务发布者Publisher：只负责发布服务
 * 服务订阅者Subscriber：只负责订阅服务
 * 事件中心Event Channel负责：
  1. 维护服务列表，包括服务类型和订阅情况；`events对象`
  2. 为服务订阅者提供订阅/取消订阅服务；`on(evtName, cb)` `off(evtName, cb)`
  3. 当服务发布者发布服务时通知服务订阅者；`emit(evtName,once:boolean)`
```
