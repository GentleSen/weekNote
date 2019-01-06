/**
 * 函数传参
 */


/**
 * 所有函数的参数都是按值传递的，也就是说把函数外部的值赋值给函数内部的参数。
 */

var add = function(x) {
    return x = x + 1;
}
var x = 1;
var y = add(x);
function add(x) {
    return x = x + 3;
}
var z = add(x);
    
console.log(x, y, z);

// 函数的执行结果为：1 2 2