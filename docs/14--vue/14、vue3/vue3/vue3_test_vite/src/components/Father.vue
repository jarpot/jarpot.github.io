<template>
  <div id="father">
      <h1>这里是Father组件</h1>
      <son></son>
  </div>
</template>

<script>
import Son from './Son.vue'
import Dialog from './Dialog.vue'
import {ref,onBeforeUnmount,onUnmounted} from 'vue'
export default {
  components:{Son,Dialog},
  setup(props) {
    onBeforeUnmount(()=>{
      console.log('onBeforeUnmount')
    })
    onUnmounted(() => {
      console.log('onUnmounted')
    })
  }

}
</script>

<style scoped>
#father{
    width: 500px;
    height: 500px;
    background-color: red;
}
</style>
