const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/douban', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on('open', () => {
  console.log('数据库链接成功！');
});
mongoose.connection.on('err', (err) => {
  console.log(`数据库链接失败${err}`);
});
mongoose.connection.on('disconnected', () => {
  console.log('数据库断开链接！');
});

