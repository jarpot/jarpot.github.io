(function(gloabl){
    var obj = {
        aaa:function(){
            console.log('自己定义的js');
        }
    }
    gloabl.$ = obj;
})(window)