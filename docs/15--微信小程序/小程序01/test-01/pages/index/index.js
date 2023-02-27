//导入全局配置的图片路径和请求路径
const app = getApp()
// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classifyData:[
      {
        classId: 1,
        classImg: "../imgs/navWine/pijiu.png",
        classText: "啤酒"
      },
      {
        classId: 2,
        classImg: "../imgs/navWine/baijiu.png",
        classText: "白酒"
      },
      {
        classId: 3,
        classImg: "../imgs/navWine/hongjiu.png",
        classText: "红酒"
      },
      {
        classId: 4,
        classImg: "../imgs/navWine/yangjiu.png",
        classText: "洋酒"
      },
      {
        classId: "",
        classImg: "../imgs/navWine/all.png",
        classText: "全部"
      }],
    wineData:[],
    baseImgUrl:app.globalData.baseImgUrl
  },
  //调用摄像机
  aaa(){
    /* wx.scanCode({
      success (res) {
        console.log(res)
      }
    }) */
    //调用地址
    /* wx.chooseAddress({
      success (res) {
        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)
      }
    }) */

    //获取地理位置
    wx.getLocation({
      type: 'wgs84',
      success (res) {
        console.log(11111111)
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        console.log(latitude,longitude,speed,accuracy)
      }
     })
  },

  //点击跳转到酒品列表页
  toWineList(e){
    let id = e.currentTarget.dataset.wineid
    wx.navigateTo({
      url: '/pages/wineList/wineList?id='+id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    //页面加载完成加载首页酒品分类的数据
    wx.request({
      url: app.globalData.baseUrl+'/wxview/getFoursWine',
      success:res=>{
        //console.log(res.data)
        that.setData({
          wineData:res.data
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})