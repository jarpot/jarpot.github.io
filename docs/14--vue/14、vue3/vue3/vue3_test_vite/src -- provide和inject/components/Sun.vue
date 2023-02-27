<template>
  <div>
      <h1>这里是孙子组件</h1>
      <h3>接收到爷爷组件传递来的数据:{{fage}}</h3>
  </div>
</template>

<script>
import {inject} from 'vue'
export default {
    //接收privade方式一
    //inject:['fage']
    setup() {
        //接收privade数据的方式二
       let fage =  inject('fage')
       return{fage}
    }
}
</script>

<style>

</style>