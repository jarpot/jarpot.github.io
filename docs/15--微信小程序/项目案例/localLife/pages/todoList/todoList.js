// pages/todoList/todoList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textList:[
      {id:1,text:'学习java',isFinish:false},
      {id:2,text:'学习html',isFinish:false},
      {id:3,text:'学习javascript',isFinish:false},
      {id:4,text:'学习vue',isFinish:false}
    ],
    idx:5
  },
  aaa(e){
    //console.log('触摸事件触发了')
    //console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id
    this.data.textList.forEach(item=>{
      if(id == item.id){
        item.isFinish = !item.isFinish
      }
    })
    //需要把修改后的数据重新设置回 data中
    this.setData({
      textList:this.data.textList
    })
  },
  //点击新增代办
  goTodos(){
    let that = this;
    //跳转到todos页面
    wx.navigateTo({
      url: '/pages/todos/todos',
      events:{
        getInputValue:function(data){
          //console.log(data.data)
          let res = data.data;
          let obj = {
            id:that.data.idx++,
            text:res,
            isFinish:false
          }
          //添加数据
          that.data.textList.push(obj)

          //设置数据
          that.setData({
            textList:that.data.textList
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