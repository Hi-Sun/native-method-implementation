/**
 * 发布订阅模式
 * 主体：发布者Publisher + 事件中心Event Channel + 订阅者Subscriber
 * 事件中心：维护任务类型，以及每种任务下的订阅情况；给订阅者提供订阅/取消订阅服务；当发布者发布任务时，给所有订阅者发布任务；
 * on事件订阅消息；off事件取消订阅消息；emit事件发布消息
 */
class EventEmitter {
  constructor() {
    this.events = {};
  }

  //消息订阅： 订阅的方法名evtName，一个callback函数cb
  on(evtName, cb) {
    if (typeof cb !== 'function') return;

    let eventHandler = this.events[evtName] || [];

    // 判断消息队列是否有要添加的方法名，如果没有的话，就重置下，如果有的就直接添加到队列中
    if (eventHandler.length === 0) {
      eventHandler = [cb];
    } else {
      eventHandler.push(cb);
    }
    console.log(this.events)

  }

  // 取消订阅：取消订阅的方法名evtName，一个callback函数cb
  off(evtName, cb) {
    if (typeof cb !== 'function') return;

    let eventHandler = this.events[evtName] || [];

    if (eventHandler.length > 0) {
      const index = eventHandler.findIndex(item => item === cb || item.callback === cb);
      eventHandler.splice(index, 1);
    }

  }

  // 发布通知：发布者发布的方法名name, 
  // once: 将事件订阅“一次”，当这个事件触发过就不会再次触发了
  emit(evtName, once = false) {
    let eventHandler = this.events[evtName] || [];

    if (eventHandler.length > 0) {
      // 创建副本，如果回调函数内继续注册相同事件，会造成死循环
      const tasks = eventHandler.slice();
      for (let cb of tasks) {
        cb();
      }
      if (once) {
        // delete eventHandler;
        eventHandler = null
      }

    }
  }
}

// 测试
const eventBus = new EventEmitter()
const task1 = () => { console.log('task1'); }
const task2 = () => { console.log('task2'); }
eventBus.on('task', task1);
eventBus.on('task', task2);
eventBus.emit('task');

// setTimeout(() => {
//   eventBus.emit('task')
// }, 1000)
