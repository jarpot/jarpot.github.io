<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <father></father>
  </div>
</template>

<script>
import Father from './components/Father.vue'

export default {
  name: 'App',
  components: {
    Father
  }
}
</script>
