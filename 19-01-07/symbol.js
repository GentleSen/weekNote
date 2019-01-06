/**
 * for 循环简写
 */

for(var i = 0; i++ < 3;) {
    setTimeout(function() {
        console.log(i);
    }, 0);
}
/**
 * 第三次循环： i(2) 小于3,i++继续执行
 * 第四次循环： i(3) 不满足 i < 3 , 退出循环, i++， 最后i的值为4。
 */

// 最后的执行结果为 4 4 4
