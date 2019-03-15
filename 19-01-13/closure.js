/**
 * 全局变量：            可以重用
 *                      但是会造成全局污染。
 * 
 * 函数内重建的局部变量： 仅函数内部可以使用,函数执行完成之后因为js垃圾回收机制被销毁。(绑定在为函数临时创建的活动对象OA上)
 *                      不会造成全局污染。
 * 
 * 闭包：               闭包是由函数以及创建该函数的词法环境组合而成。这个环境包含了这个闭包创建时所能访问的所有局部变量。
 *                      希望重用一个数据,又想让该对象不被污染篡改时,可以使用闭包。
 */

// 例：创建简单数据类型name,在window作用域下访问不到,且不被垃圾回收机制清理
var getName = (function () {
    var name = 'hesen';
    return function () {
        return name;
    }
})();
console.log(name);                          // 返回空值,不会报错是因为在下面的语句中用var创建了name,变量提升故不会报错。
var name_1 = getName();                       
name_1 = 'hahaha';                         
console.log(name_1);                        // hahaha       将name的值赋给name_1,又改变了name_1的值,并没有改变闭包中name的值。重新获取即可得到name的值。
var name = getName();
console.log(name);                          // hesen

// 例: 创建引用数据类型obj,在window作用域下访问不到,且不被垃圾回收机制清理
var getObj = (function () {
    var obj = {
        name: 'hesen',
        id: '950828',
    }
    return function () {
        return obj;
    }
})()
console.log(obj);                           // Err: obj is not defined; 因为在下文中并没有创建obj,不存在变量提升,也没有声明变量,故报错。
var obj_1 = getObj();
console.log(obj_1);                         // { name: 'hesen', id: '950828' }
obj_1.sex = '男';
var obj_2 = getObj();                       
console.log(obj_2);                         // { name: 'hesen', id: '950828', sex: '男' }
/**
 * 假设obj对象所存储的堆为：堆A, getObj 函数中的 obj 存储的指针为 *A;
 * 则 *A 在函数getObj的活动对象OA上, *A为闭包函数所能访问到的局部变量,故不会被垃圾回收机制回收.
 * var obj_1 = getObj();  getObj() 返回的值为 *A, 将 *A 赋值给 obj_1, 假设obj_1 存储的指针为 *B, 则 *B 也指向 堆A.    
 * obj_1.sex = '男';  通过 *B 改变 堆A中的值.
 * obj_2 = getObj(); 重新获取 *A, 此时 *A 依旧指向 堆A, 但是堆A的值已经被 *B 给改变了, 故最后obj_2 中含有键名 sex.
 */

/**
 * 在异步操作中对arr赋值,将i的值绑定在setInterval的活动对象OA上
 */
var arr = [];
for (var i = 0 ; i < 5 ; i++) {
    (function(i){
        setTimeout(function() {                        
            arr[i] = i;
        }, 0);       
    })(i);
}                                       

var arr = [];
for ( var i = 0 ; i < 5; i++ ) {
    setInterval((function(i) {
        return function () {
            arr[i] = i;
        }
    })(i), 0);
}

/**
 * 利用setInterval可以传递第三个参数
 */
var arr = [];
for (var i = 0 ; i < 5 ; i++) {
    setInterval(function(i) {
        arr[i] = function() {
            return i;
        };
    }, 0, i);
}

/**
 * demo return i++; 与 i++; return i;
 */
var num = 0;
var num_1 = (function() {
    return num++;
})()
console.log(num, '第一个函数');                     // 1 "第一个函数"  return num++; return ++num;   num++ 是先返回再+1; ++num 先+1 再返回;
console.log(num_1, '第一个函数');                   // 0 "第一个函数"

var num = 0;
var num_2 = (function() {
    console.log(num++);                             // 0        console.log(num++) === console.log(num); num = num + 1;
    return num++;
})()
console.log(num, '第二个函数');                     // 2 "第二个函数"
console.log(num_2, '第二个函数');                   // 1 "第二个函数"
var num = 0;
var num_3 = (function() {
    num++;
    return num;
})()
console.log(num, '第三个函数');                     // 1 "第三个函数"
console.log(num_3, '第三个函数');                   // 1 "第三个函数"

/**
 * 实现I驻留内存中累加
 */
var add = (function () {
    var i = 0;
    return function () {
        return ++i;
    }
})();
console.log(add());                             // 1
console.log(add());                             // 2

/**
 * 返回数组，数组中每一项都是一个匿名函数，执行该匿名函数得到该项的结果。
 */
var arr = (function () {
    var tempArr = [];
    for (let i = 0 ; i < 5 ; i ++) {
        tempArr[i] = (function () {             // tempArr[i] 为一个自执行函数，返回tempArr中存储的匿名函数。
            return function () {                
                return i;                       // 因为在返回的函数中对局部变量i进行了引用,故i被保存在了匿名函数的活动对象OA上.
            };
        })();
    }
    i = null;                                   
    return tempArr;
}) ();
console.log(arr);
arr[1]()                                        // 1
arr[3]()                                        // 3

/**
 * 模拟块级作用域
 */
(function() {
    var a = 0;
    var b = 2;
    console.log(a, b);                          // 0, 2
    a, b = null;
})();
console.log(a, b);                              // a is not defined