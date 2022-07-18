/**
 * 用一个封装的工具函数来兼容各浏览器的事件处理程序(跨浏览器事件处理程序)
 * 注：1.使用attachEvent方法缺点是，this的值会变成window对象的引用而不是触发事件的元素
 *    2.E8及更早版本只支持冒泡事件流(没有捕获阶段)
 */
const EventUtils = {
  // 添加监听事件
  addEvent: function (element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      // IE事件,事件处理程序名称必须有前缀on
      element.attachEvent(`on${type}`, handler, false);
    } else {
      element[`on${type}`] = handler;
    }
  },

  // 移除监听事件
  removeEvent: function (element, type, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler);
    } else if (element.detachEvent) {
      // IE事件,事件处理程序名称必须有前缀on
      element.detachEvent(`on${type}`, handler);
    } else {
      element[`on${type}`] = null;
    }
  },

  // 获取时间目标对象
  getTarget: function (event) {
    return event.target || event.srcElement;
  },

  // 获取event事件对象的引用
  getEvent: function (event) {
    return event || window.event;
  },

  // 阻止事件冒泡/捕获
  stopPropagation: function (event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
  },

  // 取消事件默认行为
  preventDefault: function (event) {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  }
}
