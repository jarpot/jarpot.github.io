var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');


/* 轮播图接口. */
router.get('/carousel', function (req, res, next) {
  let url_ = path.resolve(__dirname, '../public/json/carousel.json');
  fs.readFile(url_, 'utf-8', (err, data) => {
    if (err) throw err;
    let date = JSON.parse(data);
    res.json(date);

    return;
  });
});
// 小组
router.get('/group', function (req, res, next) {
  let url_ = path.resolve(__dirname, '../public/json/groupData.json');
  fs.readFile(url_, 'utf-8', (err, data) => {
    if (err) throw err;
    let date = JSON.parse(data);
    res.json(date);
    return;
  });
});
// 首页
router.get('/home', function (req, res, next) {
  let url_ = path.resolve(__dirname, '../public/json/homeData.json');
  fs.readFile(url_, 'utf-8', (err, data) => {
    if (err) throw err;
    let date = JSON.parse(data);
    res.json(date);
    return;
  });
});
// 正在上映
router.get('/movie_now', function (req, res, next) {
  let url_ = path.resolve(__dirname, '../public/json/movie_now.json');
  fs.readFile(url_, 'utf-8', (err, data) => {
    if (err) throw err;
    let date = JSON.parse(data);
    res.json(date);
    return;
  });
});
// 即将上映
router.get('/movie_future', function (req, res, next) {
  let url_ = path.resolve(__dirname, '../public/json/movie_future.json');
  fs.readFile(url_, 'utf-8', (err, data) => {
    if (err) throw err;
    let date = JSON.parse(data);
    res.json(date);
    return;
  });
});



module.exports = router;