// pages/addTodo/addTodo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue:''
  },
  send(){
    //console.log(this.data.inputValue)
    //触发自定义事件
    //通过自定义事件传递参数回 原页面
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('sendValue',this.data.inputValue )

    //返回上一级页面
    wx.navigateBack({
      delta: 1
    })
  },
  //获取输入的内容 并且把内容绑定到data中
  getValue(e){
    //console.log(e)
    this.setData({
      inputValue:e.detail.value
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