<template>
  <div id="sun">
      <h1>这里是sun组件</h1>
      <Dialog/>
  </div>
</template>

<script>
import Dialog from './Dialog.vue'
export default {
  components:{Dialog}
}
</script>

<style scoped>
#sun{
    width: 200px;
    height: 200px;
    background-color: yellow;
}
</style>
