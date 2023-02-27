<template>
  <div>
      <h1>这里是子组件</h1>
      <p>接收到父组件的数据:{{fname}}</p>
      <button @click="aaa">子向父传递数据，自定义事件</button>
  </div>
</template>

<script>
import {ref} from 'vue'
export default {
 /*  props:{
    fname:{
      type:String
    },
    fage:{
      type:Number
    }
  }, */
  //规范
  emits:['sendName'],
  //在组件创建时执行
  setup(props,context) {
    //props参数 主要用来接收 父向子传递的数据
    /* console.log(props.fname)

    let fname = ref(props.fname)
    console.log(fname) */
    let fname = context.attrs.fname
    console.log(context)

    //定义儿子的名字  
    let sonName = ref('张三')

    //定义函数
    function aaa(){
      context.emit('sendName',sonName.value)
    }

    return{
      fname,aaa
    }
  }
}
</script>

<style>

</style>