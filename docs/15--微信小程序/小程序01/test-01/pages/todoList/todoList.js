// pages/todoList/todoList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {id:1,text:'学习javascript',isFinish:false},
      {id:2,text:'学习java',isFinish:true},
      {id:3,text:'学习vue',isFinish:true},
      {id:4,text:'学习html',isFinish:false}
    ],
    idx:5
  },
  //定义函数
  finished(e){
    let id = e.currentTarget.dataset.id;
    //console.log(id)
    this.data.list.forEach(item=>{
      if(item.id == id){
        item.isFinish = !item.isFinish
      }
    })
    //wx小程序转有的赋值方式
    this.setData({
      list:this.data.list
    })
  },
  //定义跳转页面的goAddTodo函数
  goAddTodo(){
    let that = this
    //console.log(111111111)
    wx.navigateTo({
      url: '/pages/addTodo/addTodo',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        sendValue: function(data) {
          //console.log(data)

          //定义一个对象
          let obj = {
            id:that.data.idx++,
            text:data,
            isFinish:false
          }

          that.data.list.push(obj)

          that.setData({
            list:that.data.list
          })
        }
      }
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