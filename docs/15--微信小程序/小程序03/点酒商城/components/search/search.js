// components/search/search.js
//Component声明组件
Component({
  /**
   * 组件的属性列表
   */
  properties: {  //====？props
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    inputValue:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //获取input框的值 存储到data中
    getValue(e){
     this.setData({
       inputValue:e.detail.value
     })
    },
    //点击按钮触发 自定义事件
    sendVlaue(){
      //触发自定义事件
      this.triggerEvent('sendValues', this.data.inputValue)
    }
  }
})
