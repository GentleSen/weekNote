## defineProperty

  在一个对象上定义一个新属性或者修改一个对象的现有属性，并返回这个对象。

    用法：
    Object.defineProperty(obj, prop, descriptor)
        obj: 要在其上定义属性的对象。
        prop： 要定义或修改的属性名称。
        descriptor： 将被定义或修改的属性描述符。
        返回值：被传递给函数的对象。
> 属性描述符： 分为 **数据描述符** 跟 **存取描述符**。<br>
> 数据描述符： 一个具有值的属性，该值可能是可以重写的，也可能是不能被重写的。<br>
> 存取描述符： 是由 **getter-setter函数对** 描述的属性。

数据描述符和存取描述符都具有以下可选键值：<br>

    configurable：当且仅当该值为true时，属性描述符才能被改变和删除。默认为false。
    enumrable:当且仅当该值为true时，属性描述符才能出现在对象的枚举属性中。默认值为false。

数据描述符的可选键值：<br>

    value: 该属性对应的值，可以为任意的js值。默认为undefined。
    writable： 当且仅当该属性的writable为true时，value才能被赋值运算符改变。默认为false。

存取描述符的可选键值：<br>

    get: 一个给属性提供getter的方法，如果没有getter则为undefined。当访问该属性时，该方法会被执行，默认值为undefined。
    set：一个给属性提供setter的方法，如果没有setter则为undefined。当修改该属性的值的时候触发。该方法可以接受的参数有一个，即该属性的新的值，默认值为undefined。

/ | configurable | enumerable | value | writable | get | set
--- | ---|--- | --- | --- | --- | ---
数据描述符 | yes | yes | yes | yes | no | no
存取描述符 | yes | yes | no | no | yes | yes

> 如果一个描述符不具有value,writable,get 和 set 任意一个关键字，那么它将被认为是一个数据描述符。如果一个描述符同时有(value或writable)和(get或set)关键字，将会产生一个异常。

