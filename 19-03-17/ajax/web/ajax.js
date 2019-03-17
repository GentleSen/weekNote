(function(that) {
    function ajax(config) {
        var throwErr = function(err) {
            if(config.error) {
                config.error(err);
            } else {
                throw err;
            }
        }
        var statusErrMsg = {
            404: 'Not Found',
            500: 'Internal Server Error',
        }
        try {
            var url = config.url || '';
            var timeout = config.timeout || 6000;
            var dataType = config.dataType || 'string';
            var async = typeof(config.async) == 'boolean' ? config.async : true;
            var header = config.header || {};
            var method = config.method || 'post';
            var data = config.data || null;
            // 设置默认请求头
            if (!header['Content-Type'] && (method == 'post' || method == 'POST')) {
                header['Content-Type'] = 'application/json';
            }
            // 当为get请求时，添加data
            if (method == 'get' || method == 'GET') {
                if (url.indexOf('?') < 0) {
                    url += '?';
                }
                var tempArr = [];
                for (let key in data) {
                    tempArr.push(key + '=' + data[key]);
                }
                var paramsUrl = tempArr.join('&');
                url += paramsUrl;
            }
            console.log(url);
            var xhttp = new XMLHttpRequest();
            xhttp.open(method, url, async);
            xhttp.timeout = timeout;
            xhttp.responseType = dataType;
            xhttp.addEventListener('error', function(err) {
                throwErr(err);
            });
            for(var key in header) {
                xhttp.setRequestHeader(key, header[key]);
            }
            xhttp.addEventListener('timeout', function() {
                throwErr(new Error('request timeout'));
            })
            xhttp.addEventListener('load', function() {
                const status = xhttp.status;
                if ((status >= 200 && status < 300) || status == 304) {
                    if(xhttp.dataType == 'text') {
                        config.success(xhttp.responseText);
                    } else if(xhttp.dataType == 'html'){
                        config.success(xhttp.responseXML);
                    } else {
                        config.success(xhttp.response);
                    }
                } else {
                    throwErr(new Error(statusErrMsg[status]));
                }
            })
            if (method != 'get' && method != 'GET') {
                if(typeof data == 'string') {
                    xhttp.send(data);
                } else if(data instanceof FormData) {
                    xhttp.send(data);
                } else {
                    xhttp.send(JSON.stringify(data));
                }
            } else {
                xhttp.send();
            }
        } catch(err) {
            throwErr(err);
        }
    }
    that.ajax = ajax;
})(window);