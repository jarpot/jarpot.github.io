<template>
  <div>
      <h1>计数：{{num}}</h1>
      
      <button @click="num++">点我+1</button>
      <button @click="changeName">点我改变名字</button>
      <h2>姓名：{{obj1.name}}</h2>
      <h2>年龄：{{obj1.age}}</h2>
      <button @click="obj.age++">点我改变年零1</button>
      <button @click="changeAge">点我改变年零2</button>
  </div>
</template>

<script>
//导入vue中的ref函数  refenerce 引用
import {ref,reactive} from 'vue'
export default {
    mounted() {
        //console.log(this)
    },
    /* data() {
        return {
            name:"张三"
        }
    }, */
    methods: {
        changeName(){
            this.name += '='
        }
    },
    setup(){
        //基本类型：Number  String  Boolean  undefined  null
        //Object  Function  Array   Symbol
        //这种定义方式  num只是一个数字 0  不具备响应式
        //let num = 0
        //使用ref函数包括的数据就会变成响应式的数据
        let num = ref(0)
        //等同于以下代码
        /* num:{
            value:0
        } */
        //使用ref包装对象的响应式
        let obj1 = ref({
            name:'张三',
            age:18
        })
        //console.log(++num.value)
        console.log(obj1)

        let obj2 = reactive({
            name:'张三',
            age:18
        })
        console.log(obj2)
        
        //在setup中无法访问到 data中的数据
        //console.log(this.name)
        //let name = ref("李四")

        //对于对象类型 如果是使用ref包装 要取数据  obj.value.属性名
        function changeAge(){
            console.log(obj1.value.age)
        }

        //此处等同于 vue2中data配置项
        return {
            num,obj1,changeAge
        }
    }
}
</script>

<style>

</style>