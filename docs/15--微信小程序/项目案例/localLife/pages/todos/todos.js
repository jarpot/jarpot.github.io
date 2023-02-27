// pages/todos/todos.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue:''
  },
  getInValue(e){
    //console.log(e.detail.value)
    this.setData({
      inputValue:e.detail.value
    })
  },
  //发送数据
  send(){
    console.log(111)
    //通过自定义事件传递参数回 原页面
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('getInputValue', {data: this.data.inputValue});

    //关闭当前页面返回上一级页面
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})