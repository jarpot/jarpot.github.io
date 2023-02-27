//扩展工具方法

 /*  案例：需求：给Jquery添加工具方法

1. 去除字符串左侧空格
2. 去除字符串右侧空格
3. 去除字符串中所有空格 */
$.extend({
    min: function(a, b) { return a < b ? a : b; },
    max: function(a, b) { return a > b ? a : b; },
    leftTrim:function(str){
        var reg = /^\s+/g;
        return str.replace(reg,'');
    }
  });

//扩展jquery原型对象的方法
$.fn.extend({
    //全选
    allCheck:function(){
        //此时这个this代表jquery对象
        this.prop('checked',true);
    },
    //全不选
    unAllChk:function(){
        this.prop('checked',false);
    }
})

