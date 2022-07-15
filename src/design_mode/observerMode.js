/**
 * 观察者模式：当对象之间存在一对多的依赖关系时，其中一个对象的状态发生改变，所有依赖它的对象都会收到通知
 * 主体：目标对象Subject + 观察者Observer
 * 目标对象维护观察者列表observerList，定义观察者方法，当自身发生变化时，通调用自己的notify方法依次通知每个观察者执行update方法
 * 观察者需要实现自身update方法，供目标对象改变时目标对象调用，update方法中的逻辑自定义
 */
class Observer {
  constructor(name) {
    this.name = name;
  }
  update() {
    console.log(`${this.name}收到更新通知`);
  }
}

class Subject {
  // 观察者列表
  constructor() {
    this.observerList = [];
  }

  // 添加观察者
  add(newOberser) {
    this.observerList.push(newOberser)
  }

  // 移除其中的某个观察者
  remove(observer) {
    const index = this.observerList.findIndex(item => item === observer);
    this.observerList.splice(index, 1);
  }

  //通知每个观察者
  notify() {
    this.observerList.forEach((item) => {
      item.update();
    })
  }
}

let notifier = new Subject()
let observer1 = new Observer("张三");
let observer2 = new Observer("李四");
notifier.add(observer1);
notifier.add(observer2);

// notifier.remove(observer1); //测试删除
notifier.notify();;
