/**
 *  创建对象
 */

// 原始模式 => 缺点： 1. 多次生成对象比较麻烦。2. 实例与圆型之间没有联系。（即father跟Father）
var Father = {
    name: '',
    sayName: '',
}
var father = {};
father.name = 'father';
father.sayName = function() {
    console.log(this.name)
}

// 改进原始模式 => 缺点：oldFather 与 newFather 之间没有内在的联系，不能确定是同一个圆型的实例。(解决多次生成对象比较麻烦)
var Father = function() {
    return {
        name: 'father',
        sayName: function() {
            console.log(this.name);
        }
    };
}
var oldFather = Father();
var newFather = Father();

// 构造函数（构造函数其实就是一个普通的函数，但是内部使用了this变量，使用 new 运算符会改变this指针的指向）： father_1 与 father_2 会自动含有一个constructor 属性，指向Father构造函数。
// father_1.constructor === father_2.constructor    true
// father_1 instanceof Father
// 存在浪费内存的问题   father_1.sayName == father_2.sayName   false
var Father = function() {
    this.name = 'father';
    this.sayName = function() {
        console.log(this.name);
    }
}
var father_1 = new Father();
var father_2 = new Father();

// prototype 模式： 每一个构造函数都有一个prototype属性，指向另外一个对象。这个对象的所有属性和方法都会被该构造函数的实例所继承
// 可以把不变的属性和方法定义到prototype对象上 
var Father = function(name) {
    this.name = name;
}
Father.prototype.sonName = 'sonName';
Father.prototype.sayName = function() {
    console.log(this.name);
}
var father_3 = new Father('father');
var father_4 = new Father('father');
father_3.sayName == father_4.sayName;   // true

// other

// 1. isprototypeOf() : 用来判断某个 prototype 对象和某个实例之间的关系
Father.prototype.isPrototypeOf(father_3);

// 2. 每一个实例都有 hasOwnProperty 来判断属性是实例自身的还是继承自prototype的
for(let key in father_4){
    console.log(father_4.hasOwnProperty(key));
}