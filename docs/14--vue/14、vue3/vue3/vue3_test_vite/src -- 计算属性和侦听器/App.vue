<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <input type="text" v-model="msg">
    <h3>{{upMsg}}</h3>
    <h1>num的值:{{num}}</h1>
    <button @click="num++">点我num+1</button>
    <h1>-------------------侦听reactive数据------------------------------------</h1>
    <h3>姓名:{{obj.name}}</h3>
    <button @click="obj.name+='*'">点我改名</button>
    <h3>年龄:{{obj.age}}</h3>
    <button @click="obj.age++">点我改龄</button>
    <h3>地址:{{obj.address}}</h3>
    <button @click="obj.address+='&'">点我改地址</button>
    <h3>班级:{{obj.class.c1}}</h3>
    <button @click="obj.class.c1+='%'">点我改班级</button>
  </div>
</template>

<script>
import {ref,computed,watch,reactive,watchEffect} from 'vue'
export default {
  name: 'App',
  components: {},
  setup() {
    let msg = ref('')
    let num = ref(0)
    //vue3 定义计算属性
    let upMsg = computed(()=>{
      return msg.value.toUpperCase()
    })


    //vue3定义侦听器
    //格式：watch(要侦听的属性，回调函数,{immediate和deep})
    //侦听ref类型的数据
    //侦听一个数据
    /* watch(msg,(newVal,oldVal)=>{
      console.log(newVal,oldVal)
    }) */

    //侦听多个数据  以数组形式
    /* watch([msg,num],(newVal,oldVal)=>{
      console.log(newVal,oldVal)
    }) */

    let obj = reactive({
      name:'小明',
      age:20,
      address:'郑州',
      class:{
        c1:'qy147',
        c2:'qy141'
      }
    })
    //侦听 reactive对象数据
    //直接侦听对象 此时 无法获取到 oldval的值
    //immediate:true  默认执行一次
    //deep:true 深度侦听
    //如果我们侦听的是整个对象，会默认开启deep:true 深度侦听 并且deep设置无效
    /* watch(obj,(newVal,oldVal)=>{
      console.log(newVal,oldVal)
    },{immediate:true,deep:false}) */

    //侦听对象中的某个属性 
    //此时如果侦听的是 嵌套对象中的属性  需要开启deep:true
    /* watch([()=>obj.class,()=>obj.name],(newVal,oldVal)=>{
      console.log(newVal,oldVal)
    },{immediate:true,deep:true}) */

    //watchEffect侦听
    //回调函数中  使用了哪个数据 就侦听哪个数据
    watchEffect(()=>{
      console.log(obj.name)
      console.log(obj.age)
    })

    return {
      msg,upMsg,num,obj
    }
  },
  /* computed:{
    upMsg(){
      return this.msg.toUpperCase()
    }
  } */
}
</script>
