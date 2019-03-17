// 相同类型会开辟一整块内存区域,其读取速度以及插入速度与arrayBuffer差不多。
{
    // 相同类型数组的读取
    const arrLength = 50000000;
    const arr = new Array(arrLength);
    arr.fill(123);
    let value_1;
    console.time('array');
    for(let i = 0; i < arr.length; i++) {
        value_1 = arr[i];
    }
    console.timeEnd('array'); // array: 12ms
    // arrayBuffer的读取
    const arrBuffer = new ArrayBuffer(4 * arrLength);
    const int32Arr = new Int32Array(arrBuffer); 
    int32Arr.fill(123);
    let value_2;
    console.time('int32Arr');
    for (let i = 0 ; i < int32Arr.length; i++) {
        value_2 = int32Arr[i];
    }
    console.timeEnd('int32Arr'); // int32Arr: 11ms
    // int32Arr 与 array 耗费的时间差不多
}

{
    // 相同类型数组的插入
    const arrLength = 50000000;
    const arr = new Array(arrLength);
    console.time('array');
    for(let i = 0 ; i < arr.length; i++) {
        arr[i] = i;
    }
    console.timeEnd('array'); // array: 12ms
    // arrayBuffer的插入
    const arrBuffer = new ArrayBuffer(4 * arrLength);
    const int32Arr = new Int32Array(arrBuffer); 
    console.time('int32Arr');
    for (let i= 0 ; i < int32Arr.length; i++) {
        int32Arr[i] = i;
    }
    console.timeEnd('int32Arr'); // int32Arr: 13ms
    // int32Arr 与 array 耗费的时间差不多
}


{
    // 不同数据类型的读取
    const arrLength = 50000000;
    const arr = new Array(arrLength);
    arr.fill(123);
    arr[0] = '234';
    let value_1;
    console.time('array');
    for(let i = 0 ; i < arr.length; i++) {
        value_1 = arr[i];
    }
    console.timeEnd('array'); // array: 37ms
    // arrayBuffer的读取
    const arrBuffer = new ArrayBuffer(4 * arrLength);
    const int32Arr = new Int32Array(arrBuffer); 
    int32Arr.fill(123);
    int32Arr[0] = '234';
    let value_2;
    console.time('int32Arr');
    for (let i = 0; i < int32Arr.length; i++) {
        value_2 = int32Arr[i];
    }
    console.timeEnd('int32Arr'); // int32Arr: 37ms
    // 不同类型的情况下,arrayBuffer 的插入速度与array差不多
}

{
    // 不同类型的插入
    const arrLength = 50000000;
    const arr = new Array(arrLength);
    arr[0] = '234';
    console.time('array');
    for(let i = 1 ; i < arr.length; i++) {
        arr[i] = i;
    }
    console.timeEnd('array'); // 1352ms
    // arrayBuffer的插入
    const arrBuffer = new ArrayBuffer(4 * arrLength);
    const int32Arr = new Int32Array(arrBuffer); 
    int32Arr[0] = '234';
    console.time('int32Arr');
    for (let i= 1 ; i < int32Arr.length; i++) {
        int32Arr[i] = i;
    }
    console.timeEnd('int32Arr'); // int32Arr: 39ms
    // 不同类型的情况下, arrayBuffer 的插入速度比array快,但是第一项数据丢失,(因为声明的是int类型的)存储的为0;
}