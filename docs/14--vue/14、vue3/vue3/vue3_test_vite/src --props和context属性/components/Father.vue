<template>
  <div>
      <h1>这里是父组件</h1>
      <h4>儿子叫:{{sonName}}</h4>
      <son :fname='fname' :fage='fage' @sendName='bbb'></son>
  </div>
</template>

<script>
import Son from './Son.vue'
import {ref,reactive} from 'vue'
export default {
    components:{Son},
    setup() {
        let fname = ref('张三的爹')
        let fage = ref(50)

        let sonName = ref('')

        function bbb(val){
            sonName.value = val
        }

        return{
            fname,fage,bbb,sonName
        }
    }
}
</script>

<style scoped>

</style>