// components/serach.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    sonValue:{
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    value:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getValue(e){
      //console.log(e.detail.value)
      this.setData({
        value:e.detail.value
      })
    },
    sendValue(){
      console.log('sendValue触发了',this.data.value);
      //通过自定义事件向父组件传递数据
      this.triggerEvent('sValue', this.data.value)
    }
  },
  onLoad(){
    
  }
})
