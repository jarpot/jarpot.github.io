<template>
  <div>
      <h1>这里是父组件</h1>
      <h4>儿子叫:{{sonName}}</h4>
      <son :fname='fname' :fage='fage' @sendName='bbb'></son>
  </div>
</template>

<script>
import Son from './Son.vue'
import {ref,reactive,provide} from 'vue'
export default {
    components:{Son},
    
    setup() {
        let fname = ref('张三的爹')
        let fage = ref(50)

        let sonName = ref('')

        function bbb(val){
            sonName.value = val
        }

        //定义privade传递数据
        provide('fage',fage.value)

        return{
            fname,fage,bbb,sonName
        }
    },
    //privade对象形式  里边的数据只能写死  不能从 组件的实例中取值
    /* provide:{
        fage:"张三的爹"
    }, */
}
</script>

<style scoped>

</style>