/**
 * 地址：
 * https://github.com/aooy/blog/issues/5
 */


/**
 * task: js中每一个eventloop 都有一个或多个task任务队列,是一个先进先出的任务队列,根据任务源来区分任务应该放在哪个task任务队列中。
 *      任务源有dom操作任务源,网络请求任务源,I/O操作任务源等...(setTimeout,setInterval,setImmediate的回调函数会重新起一个task任务队列)
 * microtask: 每一个eventloop都有且只有一个microtask任务队列,也是一个先进先出的任务队列。(promise,process.nextTick会被放到microtask任务队列中)
 * 
 * 在一次eventloop中会先执行task任务队列中的任务,然后执行microtask任务队列中的任务.
 */

setTimeout(function () {
    console.log(1);
}, 0);

new Promise(function (resolve, reject) {
    resolve();
}).then(function () {
    console.log(2);
});

setTimeout(function () {
    console.log(3);
});

setTimeout(function () {
    console.log(4);
    new Promise(function (resolve, reject) {
        resolve();
    }).then(function () {
        console.log(5);
    });
    new Promise(function (resolve, reject) {
        resolve();
    }).then(function () {
        console.log(6);
    });
}, 0);
// 输出结果为：2 1 3 4 5 6 
