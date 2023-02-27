const mongoose = require('mongoose');
require('./connect_mongodb');
const Schema = mongoose.Schema;
const register = new Schema({
  // type:数据类型，required:是否是必填项，default:默认值
  username: {
    type: String,
    unique: true,
  },
  password:{
    type:String,
    set(val){
       // 通过bcryptjs对密码加密返回值 第一个值返回值， 第二个密码强度
       return require('bcryptjs').hashSync(val, 10);
    }
  }
});

// const studentModel = mongoose.model(数据库中集合的名字，该集合对应的文档类型);
const registerModel = mongoose.model('user', register);
module.exports = registerModel;