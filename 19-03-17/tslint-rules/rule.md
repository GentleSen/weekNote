### TypeScript-specific

> 跟typescript特性有关的规则

1. adjacent-overload-signatures
如果有函数重载则必须写在一起
eg. adjacent-overload-signatures: true,

2. ban-ts-ignore
禁止使用 // @ts-ignore 进行注释
eg. ban-ts-ignore: true

3. ban-types
禁止一些特定的数据类型
eg. ban-types: [true, ['Object', 'use {} instead.'], ['String'], ['any']]

4. **member-access** 
配置类中方法的修饰符
[eg.](https://palantir.github.io/tslint/rules/member-access/) 
"member-accsee": [true, "check-constructor"]

5. member-ordering
类成员排序
[eg.](https://palantir.github.io/tslint/rules/member-ordering/)
"meber-order": [true, {
    order: "fields-first"
}],

6. no-any
不允许使用any作为类型声明
eg. "no-any": true,

7. no-empty-interface
不允许定义空接口
eg. "no-empty-interface": true,

8. no-import-side-effect
禁止声明带有副作用的import语句
[eg.](https://palantir.github.io/tslint/rules/no-import-side-effect/)
"no-import-side-effect": [true, {
    "ignore-module": "(\\.html|\\.css)$"
}]

9. on-inferrable-types
对于初始化为数字,字符串，布尔值的变量或参数，禁止声明类型，因为编译器会自动推断类型
eg. "on-inferrable-types": [true, "ignore-params", "ignore-properties"];
"ignore-params": 允许为函数参数指定可推断的类型。
"ignore-properties": 允许为类属性执行可推断的类型。

10. no-internal-module
禁止在变量赋值之外的地方使用数字,默认-1, 1, 0 可以使用
eg. "no-internal-module": [true, {
    "allowed-numbers": [1,2,3], // 配置额外的可以允许的数字
    "ignore-jsx": true, // 在jsx语法中不受这个规则的影响
}]

11. no-namespace
不允许使用内部modules和namespaces。
[eg.](https://palantir.github.io/tslint/rules/no-namespace/) 
"no-namespace": [true, "allow-declarations"]

12. no-non-null-assertion
使用！后缀运算符禁止非空断言
[eg.](https://palantir.github.io/tslint/rules/no-non-null-assertion/)
"no-non-null-assertion": true

13.  no-parameter-reassignment
不允许参数重新分配
eg. no-parameter-reassignment: true,

14. no-reference-disallows
禁止使用/// <reference path=''> 来导入，应该使用es6的方式导入
eg. no-reference-disallows: true,

15. no-unnecessary-type-assertion
如果类型断言没有更改变量的类型，则发出警告
eg. "no-unnecessary-type-assertion": [true, "Array"]

16. no-var-requires
除了import语句之外，不允许使用require语句。如: const module = require('...');会报错, 使用import module = require('...'); 不会报错
eg. "no-var-requires": true

17. only-arrow-functions
禁止使用function,而使用箭头函数。（对了函数体内有this的函数则允许使用非箭头函数）
eg. "only-arrow-functions": [true, "allow-declarations", "allow-named-functions"];
"allow-declarations": 允许独立的函数声明: function sayHi() {};
"allow-named-functions": 允许具有函数名的函数: function sayHi(){} 不被允许而function（）{} 被允许。

18. prefer-for-of
在对数据进行循环时，建议采用for...of...循环
eg. "prefer-for-of": true

19. promise-function-async
要求任何返回promise的函数或方法会被标记为async
eg. "promise-function-async": [true, "check-function-declaration", "check-function-expression", "check-arrow-function", "check-method-declaration"];
"check-function-declaration": 检查函数声明
"check-function-expression": 检查函数表达式
"check-arrow-function": 检查箭头函数
"check-method-declaration": 检查方法声明

20. typedef
警告使用联合类型或可选参数将两个重载统一为一个重载。
eg. "unified-signatures": true



### Functionality

> 这些规则捕获JS编程中的常见错误或容易产生错误的混淆结构。

1. await-promise
对于await 后面的表达式不是promise的发出警告
eg. "await-promise": true

2. ban-comma-operator
禁止使用 ',' 运算符
eg. "ban-comma-operator": true

3. ban
禁止使用特定功能或全局方法
[eg.](https://palantir.github.io/tslint/rules/ban/) 
ban: [
    true,
    "eval",
    {
        "name": "$",
        "message": "please do not use $",
    }
]

4. curly
if/for/do/while 语句必须使用{}
eg. "curly": [true, "ignore-same-line"]

5. forin
在使用for...in...语句时，需要使用hasOwnProperty过滤
eg. "forin": true

6. function-constructor
不允许使用Function构造函数
eg. 'function-constructor': true

7. import-blacklist

















