var express = require('express');
var router = express.Router();
// jwt token
const jwt = require('jsonwebtoken');
const SECRET = 'ewgfvwergvwsgw5454gsrgvsvsd';
const loginModel = require('../mongodb_utils/reg_login_Schema');
/* GET users listing. */
router.post('/', function (req, res, next) {
  console.log(req.body.username);
  loginModel.findOne({
    username: req.body.username
  }).then((user) => {
    console.log(user);
    //用户名不存在
    if (!user) {
      return res.status(422).send({
        message: "用户不存在"
      })
    }
    // 如果用户输入的密码和数据库加密的一致, 就返回true
    const isPasswordValid = require('bcryptjs').compareSync(
      req.body.password,
      user.password
      )
      // 密码无效
    if (!isPasswordValid) {
      return res.status(422).send({
        message: "密码无效"
      })
    }
    const token = jwt.sign({
      id: String(user._id)
    }, SECRET)
    // 生成token
    res.send({
      user,
      token
    })
  });
  return;
  loginModel.create(req.query, (err, result) => {
    if (err) throw err;
    console.log('添加成功');
  });
  res.send('respond with a resource');
});

module.exports = router;