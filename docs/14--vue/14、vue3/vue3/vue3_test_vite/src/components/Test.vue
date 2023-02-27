<template>
  <div>
    <h1>-------------------侦听reactive数据------------------------------------</h1>
    <h3>姓名:{{name}}</h3>
    <button @click="name+='*'">点我改名</button>
    <h3>年龄:{{age}}</h3>
    <button @click="age++">点我改龄</button>
    <h3>地址:{{address}}</h3>
    <button @click="address+='&'">点我改地址</button>
    <h3>班级:{{classs.c1}}</h3>
    <button @click="classs.c1+='%'">点我改班级</button>
  </div>
</template>

<script>
import {ref,computed,watch,reactive,watchEffect, toRef, toRefs} from 'vue'
export default {
  name: 'App',
  components: {},
  setup() {
    


    let obj = reactive({
      name:'小明',
      age:20,
      address:'郑州',
      classs:{
        c1:'qy147',
        c2:'qy141'
      }
    })
    

    return {
      /* name:toRef(obj,'name'),
      age:toRef(obj,'age'),
      classs:toRef(obj,'classs') */
      ...toRefs(obj)
    }
  },
  /* computed:{
    upMsg(){
      return this.msg.toUpperCase()
    }
  } */
}
</script>
