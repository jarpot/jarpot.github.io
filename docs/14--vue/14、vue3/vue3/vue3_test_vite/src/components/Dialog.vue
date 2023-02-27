<template>
  <div>
    <button @click="isShow = true">点我打开弹窗</button>
    <teleport to="body">
      <div v-if="isShow" id="zhe">
        <div id="dialogs">
          <h4>这是一个弹出框</h4>
          <h4>这是一个弹出框</h4>
          <h4>这是一个弹出框</h4>
          <button @click="isShow = false">点我关闭弹窗</button>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup(props) {
    let isShow = ref(false);

    return { isShow };
  },
};
</script>

<style scoped>
#dialogs {
  width: 150px;
  height: 150px;
  background-color: blueviolet;
  margin: auto;
  margin-top:300px ;
}
#zhe {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>