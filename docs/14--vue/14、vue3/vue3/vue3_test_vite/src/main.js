import { createApp } from 'vue'
import App from './App.vue'
// import Test from './components/Test.vue'
import './index.css'

//创建vue实例 轻量级的对象
const app = createApp(App)
//console.log(app)
//vue3中如果像设置一些全局的  就直接挂载到 app上

//挂载
app.mount('#app')
