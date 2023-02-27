(function (global) {
    //global全局
    var cookie_ = {
        NAME:'李四',
        setCookie: function (k, v, t) {
            if (k == undefined || v == undefined || t == undefined) {
                //抛出 异常
                throw  new Error('参数输入有误');
            } else {
                //获取当前系统时间对象
                var date = new Date();
                //把当前的 日  加上传入的参数  就是 cookie的有效时间
                var time = date.getDate() + t;
                //把新的天数重新设置到 date日期对象中
                date.setDate(time);
                //给cookie设置 有效时间 
                document.cookie = k + '=' + v + ';expires=' + date;
            }
        },
        getCookie: function (n) {
            var cook = document.cookie;
            var cookArr = cook.split('; ');
            for (var i in cookArr) {
                //把cookie中的每一个数据都再次进行分隔  此时得到的所有数组都是长度为2的数组
                var cArr = cookArr[i].split('=');
                //'name=张三'  ['name','张三']
                if (cArr[0] == n) {
                    return cArr[1];
                }
            }
        },
        removeCookie: function (k) {
            this.setCookie(k,'',-1);
        }
    }
    global.myCookie = cookie_;
})(window);

