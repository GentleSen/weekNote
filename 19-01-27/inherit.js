/**
 * 构造函数的继承
 */

// 方法1. 构造函数绑定，调用call或者apply，将父对象的构造函数绑定在子对象上
// 没有把prototype上的方法与属性继承过来.

// 父类
var Dog = function(name, type) {
    this.name = name;
    this.type = type;
}
Dog.prototype.sayInfo = function() {
    console.log(`name: ${this.name},type: ${this.type}`);
}
// 子类
var Husky = function(name) {
    Dog.call(this, name, '哈士奇');
    this.name =  name;
}
Husky.prototype.sayName = function() {
    console.log(this.name);
}

// 方法2. prototype 模式，把子类的prototype对象指向一个父类的实例。
// 继承了父类的属性和方法
// 父类
var Dog = function(name, type) {
    this.name = name;
    this.type = type;
}
Dog.prototype.sayInfo = function() {
    console.log(`name: ${this.name},type: ${this.type}`);
}
// 子类
var Husky = function(name) {
    this.name =  name;
}
Husky.prototype = new Dog(this.name, '哈士奇'); // 将父类的实例赋值给子类的prototype
Husky.prototype.constructor = Dog; // 将子类的prototype.constructor赋值为父类，如果不重新赋值子类的prototype.constructor会导致继承链絮乱。
Husky.prototype.sayName = function() {
    console.log(this.name);
}
// 对一个对象的prototype进行覆盖时，下一步一定要修改该对象的prototype.constructor属性。

// 方法3. 直接继承prototype,讲子类的prototype指向父类的prototype，无法继承父类本身的属性和方法
// 效率比较高，不用建立父类的实例
// 父类的prototype与子类的prototype指向的是同一个对象，修改子类的prototype实际上也把父类的prototype修改了
// 父类
var Dog = function(name, type) {
    this.name = name;
    this.type = type;
}
Dog.prototype.sayInfo = function() {
    console.log(`name: ${this.name},type: ${this.type}`);
}
// 子类
var Husky = function(name) {
    this.name =  name;
}
Husky.prototype = Dog.prototype;
Husky.prototype.constructor = Dog;
Husky.prototype.sayName = function() {
    console.log(this.name);
}

// 方法4. 利用空对象作为中介
// 父类
var Dog = function(name, type) {
    this.name = name;
    this.type = type;
}
Dog.prototype.sayInfo = function() {
    console.log(`name: ${this.name},type: ${this.type}`);
}
// 子类
var Husky = function(name) {
    this.name =  name;
}
var TempFun = function(){};
TempFun.prototype = Dog.prototype;
Husky.prototype = new TempFun(); 
Husky.prototype.constructor = Husky;
Husky.prototype.sayName = function() {
    console.log(this.name);
}

// 方法5. 拷贝继承
var Dog = function(name, type) {
    this.name = name;
    this.type = type;
}
Dog.prototype.sayInfo = function() {
    console.log(`name: ${this.name},type: ${this.type}`);
}
// 子类
var Husky = function(name) {
    this.name =  name;
}
let dog = new Dog(Husky.name, '哈士奇');
for(let key in dog){
    Husky.prototype[key] = dog[key];
} 
Husky.prototype.sayName = function() {
    console.log(this.name);
}