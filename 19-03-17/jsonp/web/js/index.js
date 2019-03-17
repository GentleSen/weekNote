var jsonp = function(option) {
    var oscript = document.createElement('script');
    window.random = Math.floor(Math.random() * 100000);
    var data = option.data;
    window.timer = null;
    if (!option.url) {
        option.error( new Error('没有url路径'));
    }
    window.option = option;
    if (!option.callback) {
        option.error(new Error('没有回调字段'));
    }
    function cbFun(data) {
        clearTimeout(timer);
        option.success(data);
        var oscript = document.getElementById(random);
        document.getElementsByTagName('body')[0].removeChild(oscript);
        random = null;
    };
    oscript.src = option.url + '?' + option.callback + '=' + cbFun + '&timeStamp=' + random;
    oscript.setAttribute('id', random);
    if(data) {
        for (var key in data) {
            oscript.src += '&' + key + '=' + data[key]; 
        }
    }
    document.getElementsByTagName('body')[0].appendChild(oscript);
    timer = setTimeout(function(){
        option.error(new Error('请求超时'));
    }, +option.timeout);
};