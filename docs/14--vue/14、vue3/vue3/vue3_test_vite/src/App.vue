<template>
  <div>
    <h1>这里是APP.vue组件</h1>
    <h2>num:{{num}}</h2>
    <button @click="num++">点我num+1</button>

    <button @click="b =!b ">点我显示/隐藏father</button>
    <father v-if="b"></father>
  </div>
</template>

<script>
import { ref, computed, watch, reactive, watchEffect,onBeforeMount,onBeforeUnmount,onBeforeUpdate,onUpdated,onMounted,onUnmounted } from "vue";
import Father from "./components/Father.vue";
export default {
  name: "App",
  components: { Father },
  setup() {
    /* console.log('========onBeforeCreate===============')
    console.log('========created===============') */
    onBeforeMount(()=>{
      console.log('===========onBeforeMount===========')
    })
    onMounted(()=>{
      console.log('===========onMounted===========')
    })

    onBeforeUpdate(()=>{
      console.log('===========onBeforeUpdate===========')
    })

    onUpdated(()=>{
      console.log('===========onUpdated===========')
    })

    let num = ref(0)
    let b = ref(true)

    return {num,b}
  },
  /* beforeMount(){
    console.log('=====beforeMount=====')
  }, */
  beforeCreate() {
    console.log('========beforeCreate===============')
  },
  created() {
    console.log('========created===============')
  },
  /* beforeMount() {
    console.log('========beforeMount===============')
  }, */
};
</script>
