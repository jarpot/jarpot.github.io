// pages/wineList/wineList.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    classid: '',
    wineData: [],
    //图片网络路径
    baseImgUrl: app.globalData.baseImgUrl,
    isShow:false
  },
  //获取搜索组件传递来的数据
  getValue(e){
    let that = this
    console.log(e.detail);
    //用接收到的搜索的值 发送请求
    wx.request({
      url: app.globalData.baseUrl + 'getWineClassify?name=' + e.detail,
      method: 'get',
      success(res) {
        console.log(res);
        //把查到的数据存入data中
        that.setData({
          wineData: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    //options 接收跳转页面传递来的数据
    //console.log(options.id);
    //把id存入data中
    this.setData({
      classid: options.id
    })

    //根据传递来的酒品的id 查询数据
    wx.request({
      url: app.globalData.baseUrl + 'getWineClassify?id=' + options.id,
      method: 'get',
      success(res) {
        console.log(res);
        //把查到的数据存入data中
        that.setData({
          wineData: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //先把isShow变为true
    this.setData({
      isShow:true
    })
    //开启导航栏动画
    //wx.showNavigationBarLoading()
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 2000
    })
    let that = this
    //console.log(11111)
    wx.request({
      url: app.globalData.baseUrl + 'getWineClassifys?id=' + that.data.classid + '&count=' + that.data.wineData.length,
      method: 'get',
      success(res) {
        //console.log(res);
        //如果查到了新数据才做拼接
        if (res.data.length > 0) {
          //把查到的数据存入data中
          that.setData({
            //把查到的最新的数据 存入wineData中 做合并
            //上拉触底 是往wineData的结尾拼接
            //下拉刷新 是向wineData的头做拼接
            wineData: that.data.wineData.concat(res.data),
            isShow:false
          })
          wx.hideToast()
        }else{
          that.setData({
            isShow:true
          })
        }
        //关闭导航条动画
        wx.hideNavigationBarLoading()
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})