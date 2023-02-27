/* 
  token验证中间件

*/
// jwt token
const jwt = require('jsonwebtoken');
const SECRET = 'ewgfvwergvwsgw5454gsrgvsvsd';
module.exports = function (req, res, next) {
  var allowUrl = ['/register', '/login']
  if (allowUrl.indexOf(req.url) != '-1') return next() // 如果访问的页面在allowUrl数组里,就允许访问
  // 1.验证token是否存在
  var token;
  // 如果用户请求头携带了token  并且  token前面 带有 Bearer
  // console.log(req.headers);
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    token = req.headers.authorization.split(' ')[1]
  } else if(req.headers.token){
    token = req.headers.token;
  } else if (req.query.token) {
    token = req.query.token;
  }
  // 2.如果token不存在,
  if (!token) {
    return res.status(401).send({
      success: false,
      message: 'error.request error'
    })
  }
  // 3.先解密token,然后判断token是否正确;
  // verify解密    decoded是解密后的信息(也就是被加密的信息)
  jwt.verify(token, SECRET, function (err, decoded) {
    if (err) {
      return res.status(401).send({
        suceess: false,
        messag: 'token过期,请重新登录'
      })
    }
    //5. 解析出来的数据存入req
    req.decoed = decoded;
    next() // next()  功能就是 运行下一个函数
  })
}