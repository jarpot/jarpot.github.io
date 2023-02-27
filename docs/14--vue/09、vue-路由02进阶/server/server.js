//node的一个框架 express  专门用来搭建服务器
const express = require('express');
//导入安装的history包
const history = require('connect-history-api-fallback')
let app = express();
const cors = require('cors');

//应用history包
app.use(history())

//配置访问静态资源
app.use(express.static(__dirname+'/public'))
//设置跨域
app.use(cors());


app.get('/index/stu',(req,resp)=>{
	console.log('请求成功');
	resp.send('你好哈哈哈')
});

app.listen(5500,()=>{
	console.log('you server running at 127.0.0.1:5500');
});


