/**
 * 非构造函数的继承
 */

// 方法1. 把子对象的prototype属性指向父对象

var object = function (o){
    function F(){};
    F.prototype = o;
    return new F();
}

var dog = {
    name: 'dog',
};
var husky = {
    type: 'husky',
};

var newObj = object(dog)
newObj.type = 'husky';

// 方法2. 拷贝
/**
 * 深拷贝
 * @param {object} obj 要拷贝的函数
 */
var copyFun = function(obj){
    var resObj;
    if(obj instanceof Array){
        resObj = [];
    } else {
        resObj = {};
    }
    for(var key in obj){
        if(typeof obj[key] !== 'object'){
            resObj[key] = obj[key];
        } else {
            if(obj[key] instanceof Array){
                resObj[key] = [];
            } else {
                resObj[key] = {};
            }
            resObj[key] = copyFun(obj[key]);
        }
    }
    return resObj;
};
var obj = {
    name: 'hesen',
    arr: [1,2,3,4,5],
    tempArr: [
        'hesen',
        {
            name: 'haha',
            id: 'shh',
        },
    ],
    tempJson: {
        name: 'haha',
        id: '123'
    },
};
var resObj = copyFun(obj);