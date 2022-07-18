/**
 * event targets事件目标对象
 * Element，document 和 window 是最常见的 event targets ，但是其他对象也可以作为 event targets，比如 XMLHttpRequest，AudioNode，AudioContext  等等
 * addEventListener:在 EventTarget 上注册特定事件类型的事件处理程序
 * removeEventListener: EventTarget 中删除事件侦听器
 * dispatch: 将事件分派到此 EventTarget。
 */
class EventTarget {
  constructor() {
    this.listeners = {};
  }

  addEventListener(type, callback) {
    if (!(type in this.listeners)) {
      this.listeners[type] = [];
    }
    this.listeners[type].push(callback);
  }

  removeEventListener(type, callback) {
    if (!(type in this.listeners)) {
      return;
    }

    const index = this.listeners[type].indexOf(callback);
    this.listeners[type].splice(index, 1);
    return this.removeEventListener(type, callback);
  }

  dispatch(event) {
    if (!(type in this.listeners)) {
      return;
    }
    const stack = this.listeners[event.type];
    event.target = this;
    for (let i = 0; i < stack.length; i++) {
      stack[i].call(this, event);
    }
    // stack.forEach(item => item.call(this, event));
  }
}