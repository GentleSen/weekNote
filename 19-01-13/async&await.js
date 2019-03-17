/**
 * async&await: async function 会返回一个promise对象.
 *      当函数执行错误时,promise的reject方法会传递这个值.
 *      当函数执行成功时,promise的resolve传递这个值。
 *      如果函数返回一个固定值,async函数会封装为promise对象,在promise的resolve中传递这个值.
 * await只能在async函数中使用.否则会得到一个语法错误.(SyntaxError)
 */

// eg. 例子来源MDN-async function。地址:https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function
var resolveAfter2Seconds = function() {
    return new Promise(resolve => {
        setTimeout(function() {
            resolve(20);
        }, 2000);
    });
};
var resolveAfter1Second = function() {
    return new Promise(resolve => {
        setTimeout(function() {
            resolve(10);
        }, 1000);
    });
};
var sequentialStart = async function() {
    const slow = await resolveAfter2Seconds();  //前面加有await标识符,当resolveAfter2Seconds()返回的promise resolve之后才会执行下面的语句
    const fast = await resolveAfter1Second();
    console.log(slow);
    console.log(fast);
}
var concurrentStart = async function() {
    const slow = resolveAfter2Seconds();        
    const fast = resolveAfter1Second();         // resolveAfter2Seconds() 与 resolveAfter1Second() 几乎同时执行
    console.log(await slow);                    // 等待resolveAfter2Seconds()返回的promise状态变为resolve之后,再console slow
    console.log(await fast);                    // 同理，但是因为 resolveAfter2Seconds() 与 resolveAfter1Second() 几乎同时执行.
}                                               // 当resolveAfter2Seconds()返回的promise状态值发生改变时,resolveAfter1Second() 返回的promise状态值早已改变,故会直接console
var stillSerial = function() {
    Promise.all([resolveAfter2Seconds(), resolveAfter1Second()]).then(([slow, fast]) => {
        console.log(slow);                      // resolveAfter2Seconds()与resolveAfter1Second()返回的promise几乎同时执行,当这两个promise执行完成之后才会走.then
        console.log(fast);
    });
}
var parallel = function() {
    resolveAfter2Seconds().then((message)=>console.log(message));       // 用async 修饰function,即使return 一个常量也会返回一个promise对象。
    resolveAfter1Second().then((message)=>console.log(message));
}
