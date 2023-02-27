<template>
  <div id="son">
      <h1>这里是Son组件</h1>
      <sun></sun>
  </div>
</template>

<script>
import sun from './Sun.vue'
export default {
  components:{sun}
}
</script>

<style scoped>
#son{
    width: 350px;
    height: 350px;
    background-color: blue;
}
</style>
