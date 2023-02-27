//导入全局配置的图片路径和请求路径
const app = getApp()
// pages/wineList/wineList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classid:'',
    wineData:[],
    baseImgUrl:app.globalData.baseImgUrl,
    isShowBottom:false,
    sonValue:''
  },
  //获取搜索框组件传递来的数据
  getSearchValue(e){
    let that = this
    //e中包含的detail就是组件传递来的数据
    //console.log(e,'搜索框数据')
    //调用接口发送请求 按照条件查询数据
    wx.request({
      url: app.globalData.baseUrl+'/wxview/getWineClassify?name='+e.detail,
      method:'get',
      success(res){
        console.log(res)
        if(res.data.length>0){
          that.setData({
            wineData:res.data
          })
        }else{
          wx.showToast({
            title: '暂时没有数据',
          })
        }
        
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    //console.log(options,1111)
    this.setData({
      classid:options.id
    })
    wx.request({
      url: app.globalData.baseUrl+'/wxview/getWineClassify?id=' + options.id,
      method:'get',
      success(res){
        console.log(res.data)
        that.setData({
          wineData:res.data,
          isShowBottom:false
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
    let that = this
    console.log('触底了')

    wx.showLoading({
      title: '加载中',
    })
    //开启上拉加载动画
    wx.showNavigationBarLoading()
    wx.request({
      method:getApp,
      url: app.globalData.baseUrl+'/wxview/getWineClassifys?id=' + that.data.classid + '&count=' + that.data.wineData.length,
      success(res){
          
        //如果查到数据
        if(res.data.length>0){
          //就把新的数据拼接到wineData中去
          
          console.log(that.data.wineData)
          that.setData({
            wineData:that.data.wineData.concat(res.data)
          })
        }else{
          that.setData({
            isShowBottom:true
          })
        }
      },
      complete(){
        //停止加载动画
        wx.hideNavigationBarLoading()
        wx.hideLoading()
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})