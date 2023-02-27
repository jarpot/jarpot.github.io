// pages/home/home.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userinfo:null,
    isShow:false
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        //console.log(res.userInfo);
        //获取到用户信息 并且把用户信息设置到data数据中
        this.setData({
          userinfo:res.userInfo,
          isShow:true
        })

        //把用户信息存储到本地存储中  防止重复授权
        wx.setStorageSync('userinfo', res.userInfo)

        //调用wx的登录接口 返回 oppenid和session_key等信息
        wx.login({

          success:res=>{
            //console.log(res.code);
            //用户登录凭证（有效期五分钟）。开发者需要在开发者服务器后台调用 auth.code2Session，使用 code 换取 openid、unionid、session_key 等信息
            //GET https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
            let url = `https://api.weixin.qq.com/sns/jscode2session?appid=wxb81df0e7a09f642d&secret=175071331d3abd6e56080b00aedbfadb&js_code=${res.code}&grant_type=authorization_code`;
            wx.request({
              url: url,
              method:'get',
              success:res=>{
                console.log(res);
              }
            })
          }
        })
      }

      //
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options)
    //当页面进来时先判断本地存储中有没有用户信息
    //如果没有需要用户授权，如果有 直接取出userinfo并赋值给data中
    wx.getStorage({
      key:'userinfo',
      success:(res)=>{
        //console.log(res)
        this.setData({
          userinfo:res.data
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
    console.log('home主页隐藏了')
    wx.showToast({
      title: '请先登录',
      success:()=>{
        return ;
      }
    })
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
    console.log('用户下拉了')
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