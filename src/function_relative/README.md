## 改变this指向
call和apply的区别
call的第二个参数为一个或多个参数组成的参数列表；
apply的第二份参数为参数组成的数组；

bind 和 call/apply 的区别
1. 是否立刻执行：
  call/apply 改变了函数的 this 上下文后 马上 执行该函数。
  bind 则是返回改变了上下文后的函数, 不执行该函数 。
1. 返回值的区别:
  call/apply 返回 fun 的执行结果。
  bind 返回 fun 的拷贝，并指定了 fun 的 this 指向，保存了 fun 的参数

## 防抖节流
防抖debounce
在一定时间内，方法被触发多次，只执行一次(首次执行/结尾执行)；
节流throttle
方法在固定时间间隔内执行一次，若在该时间内被再次触发则重新计时(首次执行/结尾执行/首次结尾均执行)；


## 函数柯里化
概念：将一个接受多个参数的函数转换为接受一个参数的函数的固定形式的技术。
柯里化实际是把简答的问题复杂化了，但是复杂化的同时，我们在使用函数时拥有了更加多的自由度，本质上是降低通用性，提高适用性。
实现原理：闭包

```js
实现过程：
收集参数，返回一个函数接收剩余参数，接收到足够的参数后，执行原函数，否则返回curry继续收集参数
当接收到的参数等于形参的个数的时候 `arguments.length >= fn.length` 调用函数fn，并且把收集到的参数传给fn作为实参
```

## 定时器
 * setInterval定时器用于实现函数每隔一个固定时间重复调用一次，方法返回一个interval ID，该ID唯一标识时间间隔，可通过调用clearInterval方法传入该ID移除定时器
 * setTimeout定时器用于实现在过了一个固定时间后执行一次函数，方法返回一个timeout ID，该ID标识定时器编号，可通过调用clearTomeout方法传入该ID移除定时器
 * requestAnimationFrame告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画,该回调函数会在浏览器下一次重绘之前执行
 关于this指向问题：由定时器调用的代码运行在与所在函数完全分离的执行环境上，这会导致，这些代码中包含的 this 关键字在非严格模式会指向 window (或全局) 对象，严格模式下setInterval中的this指向为 undefined，setTimeout中的this指向为 window对象
 解决方案：1.使用箭头函数；2.用包装函数来设置this
 ```js
  let myArray = ["zero", "one", "two"];
  myArray.myMethod = function (sProperty) {
    alert(arguments.length > 0 ? this[sProperty] : this);
  };

  setTimeout(myArray.myMethod, 2000) // [object Window]
  setTimeout(function(){
    myArray.myMethod()  //  ['zero', 'one', 'two', myMethod: ƒ]
  }, 2000)
  setTimeout(()=>{
    myArray.myMethod()  // ['zero', 'one', 'two', myMethod: ƒ]
  }, 2000)
 ```

 ## 事件
事件流：事件捕获阶段 -> 处于目标阶段 -> 事件冒泡阶段
事件处理程序：HTML、DOM0、DOM2、DOM3
DOM2中的 addEventlistener 和 removeEventListerner 方法我们可以实现绑定多个事件处理程序
IE8以下版本不支持 addEventlistener 和 removeEventListerner，需要使用 attachEvent 和 detachEvent 实现，不需要传入第三个参数，因为IE8以下版本只支持冒泡型事件
attachEvent 和 detachEvent 的回调函数中的this指向全局对象，事件处理程序名称必须有前缀on。

事件相关的接口API包括Event、EventTarget
Event：事件对象，触发方式包括：
  1. 用户触发，如鼠标键盘事件；
  2. 脚本代码触发，通过将自定义事件派发到目标对象上，如click事件等
  3. 常用API生成触发，如指示动画已完成运行的事件、视频已被暂停的事件等
Event属性：
  Event.bubble|Event.cancelBubble|
  Event.target|Event.srcElement|Event.currenttarget
  Event.defaultPrevented|Event.returnValue
  Event.eventPhase|Event.cancelable|Event.isTrust
Event方法:
  event.preventDefault()
  event.stopImmediatePropagation()
  event.stopPropagation()

EventTarget：事件目标对象，一般为：Element、document、window、XMLHttpRequest、AudioNode、AudioContext等，包含三个原型方法
  1. addEventListener:在 EventTarget 上注册特定事件类型的事件处理程序
  2. removeEventListener: EventTarget 中删除事件侦听器
  3. dispatch: 将事件分派到此 EventTarget。


