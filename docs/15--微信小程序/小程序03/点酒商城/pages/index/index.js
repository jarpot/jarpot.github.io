
//导入全局的app.js 取出其中的globalData
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    wineClassifyData:[
      {id:1,text:'啤酒',imgUrl:'/imgs/navWine/pijiu.png'},
      {id:2,text:'白酒',imgUrl:'/imgs/navWine/baijiu.png'},
      {id:3,text:'红酒',imgUrl:'/imgs/navWine/hongjiu.png'},
      {id:4,text:'洋酒',imgUrl:'/imgs/navWine/yangjiu.png'},
      {id:'',text:'全部',imgUrl:'/imgs/navWine/all.png'}
    ],
    wineData:[],
    baseImgUrl:app.globalData.baseImgUrl
  },
  //点击跳转到列表页  要把商品的类别id带过去
  goWineList(e){
    //console.log(e)
    wx.navigateTo({
      url: '/pages/wineList/wineList?id='+ e.currentTarget.dataset.classid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    //页面加载时 请求首页的酒品数据
    wx.request({
      url: app.globalData.baseUrl + 'getFoursWine',
      method:'get',
      success(res){
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