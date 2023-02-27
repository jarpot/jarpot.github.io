var express = require('express');
var router = express.Router();
const registerModel = require('../mongodb_utils/reg_login_Schema');
/* GET users listing. */
router.post('/', function (req, res, next) {
  console.log(req.body);
  // 1.判断用户名密码是否为空
  if (!req.body.username || !req.body.password) {
    res.json({
      succes: false,
      message: '用户名或密码必填'
    })
    return;
  }
  // 2.查找用户名是否被注册
  registerModel.findOne({
    username: req.body.username
  }).then((user) => {
    console.log(user);
    if (user) {
      res.json({
        success: false,
        message: '用户名已注册'
      });
      return;
    }
    registerModel.create(req.body, (err, result) => {
      if (err) throw err;
      res.send({
        success: true,
        message: '用户名注册成功',
        userinfo:{
          username:req.body.username
        }
      });
    });
  });
});

module.exports = router;