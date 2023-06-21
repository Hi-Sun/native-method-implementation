
// 构造函数
function Foo() {
  // 静态属性
  getName = function() {
    console.log(1)
  };
  return this;
}
// 静态属性
Foo.getName = function() {
  console.log(2)
};
// 原型方法
Foo.prototype.getName = function() {
  console.log(3)
};
// 函数变量表达式创建函数
var getName = function() {
  console.log(4)
};
// 函数声明
function getName() {
  console.log(5)
}
//请写出以下输出结果：
Foo.getName(); // 2 访问对象的静态属性
getName(); // 4 变量提升｜赋值
Foo().getName(); // 1 this指向
getName(); // 4
// JS的运算符优先级问题: 成员访问 = new (带参数列表) > new (无参数列表) = 函数调用
// new Foo.getName() -> new (Foo.getName)()
new Foo.getName(); // 2 
// new Foo().getName() -> (new Foo()).getName()
new Foo().getName(); // 3
// new new Foo().getName() -> new ((new Foo()).getName)()
new new Foo().getName(); // 3