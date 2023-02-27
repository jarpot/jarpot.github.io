// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //定义对象存储 获取的用户信息
    userInfo:null
  },
  getUserProfile(){
    //1.调用微信提供的接口 请求 头像和昵称
    wx.getUserProfile({
      desc: '获取用户信息',
      success:res=>{
        //console.log(res.userInfo)
        this.setData({
          userInfo:res.userInfo
        })

        //2.用户信息获取成功后 存入 storage中
        wx.setStorage({
          key:"userinfo",
          data:res.userInfo
        })

        //3.向后端服务器发送请求  得到token
        wx.login({
          success (res) {
            //获取到登录凭证
            let code = res.code;
            //根据code获取 openid 和session_key
            //GET https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
            let url = `https://api.weixin.qq.com/sns/jscode2session?appid=wxb81df0e7a09f642d&secret=175071331d3abd6e56080b00aedbfadb&js_code=${code}&grant_type=authorization_code`;
            if(code){
              wx.request({
                method:'get',
                url,
                success(res){
                  console.log(res)
                  
                },
                fail(fail){
                  console.log(fail)
                }
              })
            }else{
              console.log('登录失败')
            }
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    //从stoage中获取 userInfo 看是否存在，如果存在 直接赋值
    wx.getStorage({
      key: 'userinfo',
      success (res) {
        that.setData({
          userInfo:res.data
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