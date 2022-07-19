/**
 * 工厂模式
 */
function createPerson1(name, age) {
  var o = new Object();
  o.name = name;
  o.age = age;
  o.sayName = function () {
    console.log(`hello, my name is ${this.name}, I am ${this.age} years old`)
  }
  return o
}

/**
 * 构造函数模式
 */
function createPerson2(name, age) {
  this.name = name;
  this.age = age;
  this.sayName = function () {
    console.log(`hello, my name is ${this.name}, I am ${this.age} years old`)
  };
  return o
}

/**
 * 原型模式
 */
function Person() {

}
Person.prototype.name = 'Jim';
Person.prototype.age = 10;
Person.sayName = function () {
  console.log(`hello, my name is ${this.name}, I am ${this.age} years old`)
};

/**
 * 组合使用构造函数模式和原型模式
 */
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype = {
  constructor: Person,
  sayName: function () {
    console.log(`hello, my name is ${this.name}, I am ${this.age} years old`)
  }
}

/**
 * 动态原型模式
 */
function Person(name, age) {
  this.name = name;
  this.age = age;
  if (typeof this.sayName !== "function") {
    Person.prototype.sayName = function () {
      console.log(`hello, my name is ${this.name}, I am ${this.age} years old`)
    }
  }
}

/**
 * 寄生构造函数模式:该模式和工厂模式基本上是一摸一样的，只不过我们是采用 new 操作符最后来创建对象。
 * 缺点：和寄生构造函数一样，没有办法使用 instanceof 操作符来判断对象的类型
 */