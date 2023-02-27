<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <!-- <HelloWorld msg="Hello Vue 3.0 + Vite"></HelloWorld> -->
    <test-01/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Test01 from './components/Test01.vue'
export default {
  name: 'App',
  components: {
    HelloWorld,Test01
  }
}
</script>
