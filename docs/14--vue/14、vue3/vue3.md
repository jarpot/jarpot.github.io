# vue3 入门 

## 本章内容 

- vue3简介
- vue3项目构建工具vite  vue-cli
- vue3组合式API
- vue3响应式原理--Proxy+Object.defineProperty()   
- computed计算属性
- watch侦听器
- 函数的使用 
- 新增内置组件

## 一、vue3 

面试题：vue2和vue3区别 ?

### 1.1 简介

<img src="https://gitee.com/Yawpot/cloudimages/raw/master/img/image-20220308085212341.png" alt="image-20220308085212341" style="zoom: 50%;" />

- 2020年9月18日发布，3.0版本 代号 ‘one piece’。  vue2.7   vue2.6
- 3.0版本代表了超过2年的开发工作，包括30多个RFC、2600多个提交、来自99个贡献者的628个请求，以及核心回购之外的大量开发和文档工作。
- gitHub地址：https://github.com/vuejs/core/releases/tag/v3.0.0

### 1.2 优势

- 与Vue 2相比，Vue 3在打包大小（体积最多轻41%）、初始渲染（最多快55%）、更新（最多快133%）和内存使用（最多少54%）方面都有显著的性能改进。
- 使用Proxy代替Object.defineProperty()实现响应式
- 重写虚拟DOM的实现 diff 算法  
- 更好的支持 TypeScript    ts   js是ts子集 
- TreeShaking(打包时把无关代码全部干掉，体积更小)

### 1.3 新的特性

- Vue 3 中一些需要关注的新功能包括：

  - [组合式 API](https://v3.cn.vuejs.org/guide/composition-api-introduction.html)
    - setUp配置
    - ref和reactive
    - watch和watchEffect
    - provide与inject
  - [Teleport](https://v3.cn.vuejs.org/guide/teleport.html) 传送门
  - [片段](https://v3.cn.vuejs.org/guide/migration/fragments.html)
  - [触发组件选项](https://v3.cn.vuejs.org/guide/component-custom-events.html)
  - 新的生命周期钩子
  - [来自 `@vue/runtime-core` 的 `createRenderer` API ](https://github.com/vuejs/vue-next/tree/master/packages/runtime-core)[ ](https://github.com/vuejs/vue-next/tree/master/packages/runtime-core)，用于创建自定义渲染器

  - [Suspense](https://v3.cn.vuejs.org/guide/migration/suspense.html) 实验性
  - 。。。。。。

## 二、Vue3 项目构建 

### 2.1 vue-cli构建项目(现阶段开发必用)

```js
#vue3对vue-cli的版本要求必须在4.5.0以上
执行命令：vue -V查看vue-cli版本
如果版本低于4.5.0 可以重新执行命令 npm install -g @vue/cli安装最新版
## 创建项目
vue create 项目名
## 启动项目
cd  项目目录
npm run serve
```

### 2.2 vite 构建项目(vue官方出版的) 

#### 2.2.1 vite简介 

官网地址：https://vitejs.cn/

<img src="https://gitee.com/Yawpot/cloudimages/raw/master/img/image-20220308093236762.png" alt="image-20220308093236762" style="zoom:50%;" />

Vite（法语意为 "快速的"，发音 `/vit/`

，发音同 "veet"）是一种新型前端构建工具，能够显著提升前端开发体验。它主要由两部分组成：

- 一个开发服务器，它基于 [原生 ES 模块](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) 提供了 [丰富的内建功能](https://vitejs.cn/guide/features.html)，如速度快到惊人的 [模块热更新（HMR）](https://vitejs.cn/guide/features.html#hot-module-replacement)。
- 一套构建指令，它使用 [Rollup](https://rollupjs.org) 打包你的代码，并且它是预配置的，可输出用于生产环境的高度优化过的静态资源。

Vite 意在提供开箱即用的配置，同时它的 [插件 API](https://vitejs.cn/guide/api-plugin.html) 和 [JavaScript API](https://vitejs.cn/guide/api-javascript.html) 带来了高度的可扩展性，并有完整的类型支持。

grant  gulp  webpack

#### 2.2.2 传统构建与vite构建对比图

<img src="https://gitee.com/Yawpot/cloudimages/raw/master/img/image-20220308100305723.png" alt="image-20220308100305723" style="zoom: 150%;" />

基于打包器启动时，重建整个包的效率很低。原因显而易见：因为这样更新速度会随着应用体积增长而直线下降。

一些打包器的开发服务器将构建内容存入内存，这样它们只需要在文件更改时使模块图的一部分失活[[1\]](https://vitejs.cn/guide/why.html#footnote-1)，但它也仍需要整个重新构建并重载页面。这样代价很高，并且重新加载页面会消除应用的当前状态，所以打包器支持了动态模块热重载（HMR）：允许一个模块 “热替换” 它自己，而不会影响页面其余部分。这大大改进了开发体验 —— 然而，在实践中我们发现，即使采用了 HMR  模式，其热更新速度也会随着应用规模的增长而显著下降。

在 Vite 中，HMR 是在原生 ESM 上执行的。当编辑一个文件时，Vite 只需要精确地使已编辑的模块与其最近的 HMR 边界之间的链失活[[1\]](https://vitejs.cn/guide/why.html#footnote-1)（大多数时候只是模块本身），使得无论应用大小如何，HMR 始终能保持快速更新。

#### 2.2.3 构建vite项目

```js
## 创建项目
npm init vite-app 项目名
## 进入项目
cd 项目名
## 安装依赖包  vite项目需要自己手动安装依赖包  
npm install
## 运行项目
npm run dev
```

#### 2.2.4 vite构建vue3项目的结构分析  

1. **目录结构基本没有什么变化，用法一样**  

2. **main.js分析**  

   <img src="https://gitee.com/Yawpot/cloudimages/raw/master/img/image-20220308103113880.png" alt="image-20220308103113880" style="zoom:50%;" />

   ```js
   //此处的引入import 不在是 Vue的构造函数了 引入的是一个名为  createApp 的工厂函数。
   createApp(App).mount("#app")这句代码可以拆分成两部分代码
   //创建实例对象
   //注意：此处创建的app跟之前的vm实例对象不一样了，可以看成是一个轻量级的vm实例对象。
   let app = createApp(App)
   //挂载模板
   app.mount('#app')
   ```

3. **vue2实例对象与vue3实例对象的对比**

   **vue2的实例对象：**

   ![image-20220308104303764](https://gitee.com/Yawpot/cloudimages/raw/master/img/image-20220308104303764.png)

   **vue3的实例对象：**

   ![image-20220308104022830](https://gitee.com/Yawpot/cloudimages/raw/master/img/image-20220308104022830.png)

   **注意：**在vue3构建的项目中无法再使用vue2创建vue实例的`Vue`构造方法了。必须使用vue3的写法，引入`createApp()`工厂方法

4. **普通组件中的变化** 

   ![image-20220308104731384](https://gitee.com/Yawpot/cloudimages/raw/master/img/image-20220308104731384.png)

   **注意：**定义组件时 DOM结构可以不用根标签包括了。

### 2.3 vue3配套的开发者工具 

打开chrome应用商店 下载beta版  就是vue3的开发者工具版本，之前安装的应该也可以使用。

![image-20220308112040949](https://gitee.com/Yawpot/cloudimages/raw/master/img/image-20220308112040949.png)

## 三、vue3常用的组合式(Composition) API

### 3.1 什么是组合式API 

通过创建 Vue  组件，我们可以将界面中重复的部分连同其功能一起提取为可重用的代码段。仅此一项就可以使我们的应用在可维护性和灵活性方面走得相当远。然而，我们的经验已经证明，光靠这一点可能并不够，尤其是当你的应用变得非常大的时候——想想几百个组件。处理这样的大型应用时，共享和重用代码变得尤为重要。

使用 (`data`、`computed`、`methods`、`watch`) 组件选项来组织逻辑通常都很有效。然而，当我们的组件开始变得更大时，**逻辑关注点**的列表也会增长。尤其对于那些一开始没有编写这些组件的人来说，这会导致组件难以阅读和理解。

![Vue 选项式 API: 按选项类型分组的代码](https://gitee.com/Yawpot/cloudimages/raw/master/img/options-api.png)

这是一个大型组件的示例，其中**逻辑关注点**按颜色进行分组。

这种碎片化使得理解和维护复杂组件变得困难。选项的分离掩盖了潜在的逻辑问题。此外，在处理单个逻辑关注点时，我们必须不断地“跳转”相关代码的选项块。

如果能够将同一个逻辑关注点相关代码收集在一起会更好。而这正是组合式 API 使我们能够做到的。

### 3.2 组合式API基础使用----setup

既然我们知道了**为什么**，我们就可以知道**怎么做**。为了开始使用组合式 API，我们首先需要一个可以实际使用它的地方。在 Vue 组件中，我们将此位置称为 `setup`。

**为什么要使用setup()函数：** https://zhuanlan.zhihu.com/p/68477600

#### 3.2.1 `setup` 组件选项 

**注意：**在 `setup` 中你应该避免使用 `this`，因为它不会找到组件实例。`setup` 的调用发生在 `data` property、`computed` property 或 `methods` 被解析之前，所以它们无法在 `setup` 中被获取。

`setup` 选项是一个接收 `props` 和 `context` 的函数，我们将在[之后](https://v3.cn.vuejs.org/guide/composition-api-setup.html#参数)进行讨论。**此外**，我们将 `setup` 返回的所有内容都暴露给组件的其余部分 (计算属性、方法、生命周期钩子等等) 以及组件的模板。

**使用方式一：**在vue3中 之前定义的data,methods,computed,watch,directives还都仍然可以使用 用法跟vue2是完全一样的，但是过滤器不能使用了

```vue
<template>
	<h1>{{ msg }}</h1>
	<button @click="count++">count is: {{ count }}</button>
	<p>{{msg1}}</p>
	<p v-color='"blue"'>计算属性{{aaa}}</p>
	<p>过滤器{{count | bbb}}</p>
	<button type="button" @click="changeMsg">改变msg</button>
</template>
<script>
	import {ref} from 'vue'
	export default {
		name: 'HelloWorld',
		props: {
			msg: String
		},
		data(){
			return {
				count:0,
				msg1:'',
			}
		},
		methods:{
			changeMsg(){
				this.msg1 = this.msg
			}
		},
		computed:{
			aaa(){
				return this.count+1
			}
		},
		watch:{
			count(newVal,oldVal){
				console.log(newVal,oldVal)
			}
		},
		filters:{
			bbb(val){
				return val+5
			}
		},
		directives:{
			color(el,binding){
				el.style.color = binding.value
			}
		}
	}
</script>
```

**使用方式二:setup基本用法**

在实例中不在配置data,methods,computed.....等独立配置项 而是在其中添加一个`setup(){}`项, 所有的配置内容都写在其中,最终把页面中需要用到的数据通过return{} 暴漏出去。

```vue
<template>
	<h1>这里是组件{{age}}</h1>
	<button type="button" @click="age+=1">点我</button>
</template>

<script>
	import {ref} from 'vue'
	export default {
		components:{},
        //定义setup函数
		setup(){
			let name = '张三'
			let age = ref(58)
			return{
				name,age
			}
		}
	}
</script>
```

**注意:**

- setup是vue3中的一个配置项 组合式api

- 组件中需要用到的所有的数据, 函数,等都要配置在setup函数中

- setup函数中需要有return返回值  返回的是一个对象 其中包含的数据,可以在页面中直接使用;

- 在vue3中仍然可以使用vue2的data,methods等配置项,并且 这些配置项中也可以访问到setup中配置的信息.

  但是setup中无法访问到vue2配置中的信息。 重名变量,setup优先.

- vue2和vue3的语法推荐大家不要混合使用, 用哪一个就全部都用那一个!

### 3.3 ref 函数的使用

#### 3.3.1 ref函数的使用----基本数据类型

**发现问题:**在以上案例中,如果我们想点击按钮修改age的值,会发现 页面中是无法更新渲染age数据的 为什么?

**带 `ref` 的响应式变量**

在 Vue 3.0 中，我们可以通过一个新的 `ref` 函数使任何响应式变量在任何地方起作用，如下所示：

```js
//一定要先导入
import { ref } from 'vue'

const counter = ref(0)
```

`ref` 接收参数并将其包裹在一个带有 `value` property 的对象中返回，然后可以使用该 property 访问或更改响应式变量的值：

```js
import { ref } from 'vue'

const counter = ref(0)

console.log(counter) // { value: 0 }
console.log(counter.value) // 0

counter.value++
console.log(counter.value) // 1
```

将值封装在一个对象中，看似没有必要，但为了保持 JavaScript 中不同数据类型的行为统一，这是必须的。这是因为在 JavaScript 中，`Number` 或 `String` 等基本类型是通过值而非引用传递的：

![按引用传递与按值传递](https://gitee.com/Yawpot/cloudimages/raw/master/img/pass-by-reference-vs-pass-by-value-animation.gif)

在任何值周围都有一个封装对象，这样我们就可以在整个应用中安全地传递它，而不必担心在某个地方失去它的响应性。

换句话说，`ref` 为我们的值创建了一个**响应式引用**。在整个组合式 API 中会经常使用**引用**的概念。

**使用:** `let age = ref(58)` 此句代码 58 被ref包括后  并不是说age=58  此时的age是一个对象`RefImpl{}` 其中包含一个属性value, 我们使用`age.value`才可以真正的取到数值58 ;

<img src="https://gitee.com/Yawpot/cloudimages/raw/master/img/image-20220308201136314.png" alt="image-20220308201136314" style="zoom:33%;" />

此处的控制台输出为:

<img src="https://gitee.com/Yawpot/cloudimages/raw/master/img/image-20220308201230731.png" alt="image-20220308201230731" style="zoom: 50%;" />

<img src="https://gitee.com/Yawpot/cloudimages/raw/master/img/image-20220308201522830.png" alt="image-20220308201522830" style="zoom:50%;" />

**小结:**

- 页面模板中展示数据直接使用向外返回的属性名就可以了  不需要加.value

- 在setup中定义的基本数据类型如果想实现响应式,必须用ref()包括  , 并且如果在setup中想对数据做修改 , 必须通过 `属性名.value`才可以完成 ; 



#### 3.3.2 ref函数的使用----对象类型

在setup中添加如下代码 son 对象: 点击按钮 改变 son中的数据 

```vue
<template>
	<h2>儿子的名字:{{son.name}}</h2>
	<h2>儿子的年龄:{{son.age}}</h2>
	<button type="button" @click="changeSonAge">点我改变儿子的年龄+1</button>
</template>

<script>
    //需要先导入ref函数
	import {ref} from 'vue'
	export default {
		components:{},
		setup(){
			let son = ref({
				name:'张三',
				age:18
			})
			
			function changeSonAge(){
                //报错
				son.value.age.value += 1 
                
                //有效代码
                son.value.age += 1
				console.log(son)
			}
			//返回页面中需要使用的数据
			return{
				son,changeSonAge
			}
		}
	}
</script>
```

此时虽然同样是用 ref包括的数据  但是操作时 只需要取出 `son.value`操作属性就可以了, 不需要使用`son.value.age.value`这样会报错 ; 

**原因:** 此处我们打印 `son`对象 发现 被ref()包括的son对象是如下形式:

<img src="https://gitee.com/Yawpot/cloudimages/raw/master/img/image-20220308203320032.png" alt="image-20220308203320032" style="zoom:50%;" />

此时虽然整体的son还是 `RefImpl`形式 , 但是其中的`value` 属性却变成了 `proxy` 形式  是 ES6的新特性 : **代理**  

**小结:**

- ref包括对象类型的数据 生成也是`RefImpl` 形式
- 其中的value属性 是 `proxy` 形式

**注意:**

- **vue3中ref 对基本类型的响应式原理 仍然是 `Object.defineProperty()` getter和setter**
- **vue3中ref 对引用对象类型的响应式原理是 ES6中的`proxy`** 

### 3.4 reactive 函数的使用 

**简介:** 

- 使用reactive来定义一个对象类型的响应式数据, (基本类型使用ref函数)
- 基于ES6的proxy代理来实现 响应式原理

**使用:**

```vue
<template>
	<h2>儿子的名字:{{son.name}}</h2>
	<h2>儿子的年龄:{{son.age}}</h2>
	<button type="button" @click="changeSonAge">点我改变儿子的年龄+1</button>
</template>

<script>
	import {ref,reactive} from 'vue'
	export default {
		components:{},
		setup(){
			let son = reactive({
				name:'张三',
				age:18
			})
			
			function changeSonAge(){
				son.age += 1 
				console.log(son)
			}
			
			return{
				name,age,son,changeSonAge
			}
		}
	}
</script>
```

此处把son对象使用`reactive`函数包括起来 此时再想操作son中的age属性就不需要添加value了  可以直接使用`son.age`操作, 因为此时返回的直接就是 `proxy`代理对象  把son对象换成数组 一样可以操作 , 并且可以直接通过下标来对数组进行修改(vue2中不行) ;

**注意:** ref函数包括对象类型实现响应式就是因为  ref在底层调用了`reactive`函数 ;

**小结：**

- vue3中基本类型都使用ref函数包括
- 对象(引用类性)都是用 reactive函数包括
- 使用之前记得先引入函数。

### 3.5 setup函数中的两个参数和自定义事件的使用

**setup完整语法格式：** `setup(props,context){}`

- props 参数 表示接收父组件传递来的数据

- context是当前组件的上下文 我们在控制台打印context可以得到如下图所示内容

  ![image-20220308220827367](https://gitee.com/Yawpot/cloudimages/raw/master/img/image-20220308220827367.png)
  - **attrs:** 当子组件中没有声明props属性时， 父向子传递的数据会保存在attrs中

  - **emit:** 自定义事件会保存在此处

    子组件中：

    ```js
    <button @click="bbb">子组件中触发自定义事件</button>
    export default{
        //此处添加emits属性 把自定义的事件类型填入
        emits:['hello'],
        setup(props,context){
            function bbb(){
                console.log('hello自定义事件触发了')
                //通过context调用emit方法来完成自定义事件
                context.emit('hello','你好哈哈哈')
            }
    
            return{
                bbb
            }
    	}
    }
    ```

    父组件中：

    ```js
    <Son @hello='aaa'></Son>
    setup(){
        //自定义事件触发aaa函数 val就是子组件传递来的数据
        function aaa(val){
            console.log('接收到子组件传递来的数据:',val)
        }
    
        return{
            aaa
        }
    }
    ```

    

  - **slots:** 插槽内容会保存在此处（了解）

    其中包含的只是 虚拟DOM 
  
  

### 3.6 provide与inject / 祖孙(后代)传递数据

**简介：**通常，当我们需要从父组件向子组件传递数据时，我们使用 [props](https://v3.cn.vuejs.org/guide/component-props.html)。想象一下这样的结构：有一些深度嵌套的组件，而深层的子组件只需要父组件的部分内容。在这种情况下，如果仍然将 prop 沿着组件链逐级传递下去，可能会很麻烦。

对于这种情况，我们可以使用一对 `provide` 和 `inject`。无论组件层次结构有多深，父组件都可以作为其所有子组件的依赖提供者。这个特性有两个部分：父组件有一个 `provide` 选项来提供数据，子组件有一个 `inject` 选项来开始使用这些数据。

<img src="https://gitee.com/Yawpot/cloudimages/raw/master/img/components_provide.png" alt="Provide/inject scheme" style="zoom:50%;" />

**主要作用：**父组件向后代组件传递数据。

在`祖组件`使用`privade`定义要传递的数据，在`后代组件`中通过`inject`来接收参数。

```js
//祖组件中 定义privade传递数据
import {provide} from 'vue'
provide('fage',fage.value)
//后代组件 接收privade数据的方式二
import {inject} from 'vue'
let fage =  inject('fage')
```



## 四、vue3中的响应式原理

### 4.1 vue2中的响应式原理

通过 `Object.defineProperty()` 方法来实现。通过`getter` 和`setter`方法来完成。数据劫持

```
Object.defineProperty(obj,'属性',{
	get(){},set(){}
})
```



### 4.2 vue3的响应式原理

ref()  ===> reactive()

**通过`Es6`中的 `proxy` 代理来完成的。**

#### 4.2.1 回顾ES6中proxy的使用 

```html
	<body>
		<script type="text/javascript">
			let obj = {
				name:'张三',
				age:18,
				address:'郑州'
			}
            
			obj = new Proxy(obj,{
				//target表示 被代理对象  propKey表示读取的属性值
				get(target,propKey){
					console.log(`获取了${propKey}属性`)
					return target[propKey]
				},
				set(target,propKey,value){
					console.log(`修改了${propKey}属性`)
					target[propKey] = value
				},
				deleteProperty(target,propKey){
					console.log(`删除了${propKey}属性`)
					return delete target[propKey]
				}
			})
		</script>
	</body>
</html>
获取属性调用get()方法
修改或者新增属性调用set()方法
删除属性调用deleteProperty()方法
```

#### 4.2.2 ES6 中的  `Reflect`  反射

反射：获取对象中的属性值

**概念：** 见教程：https://es6.ruanyifeng.com/#docs/reflect

**使用：**Reflect是与Proxy 完全对应的方法，我们可以通过Proxy代理对 对象的操作添加一些拦截 做一些事情，同时可以使用Reflect反射 来从对象中获取数据。**主要用途：封装底层框架，保证代码顺利执行** 

Proxy 与 Reflect 是 ES6 为了操作对象引入的 API 。
Proxy 可以对目标对象的读取、函数调用等操作进行拦截，然后进行操作处理。它不直接操作对象，而是像代理模式，通过对象的代理对象进行操作，在进行这些操作时，可以添加一些需要的额外操作。
Reflect 可以用于获取目标对象的行为，它与 Object 类似，但是更易读，为操作对象提供了一种更优雅的方式。它的方法与 Proxy 是对应的。

```html
	<body>
		<script type="text/javascript">
			let obj = {
				name:'张三',
				age:18,
				address:'郑州'
			}
			let p = new Proxy(obj,{
				//target表示 被代理对象  propKey表示读取的属性值
				get(target,propKey){
					console.log(`获取了${propKey}属性`)
                    //return target[propKey]
					return Reflect.get(target,propKey)
				},
				set(target,propKey,value){
					console.log(`修改了${propKey}属性`)
					Reflect.set(target,propKey,value)
				},
				deleteProperty(target,propKey){
					console.log(`删除了${propKey}属性`)
					return Reflect.deleteProperty(target,propKey)
				}
			})
		</script>
	</body>
</html>
```

## 五、computed 计算属性

仍然可以按照vue2中的语法来实现计算属性。

但是这里我们推荐使用vue3 

- 首先引入computed 

  ```js
  import {computed} from 'vue'
  ```

- 在setup中定义计算属性

  ```vue
  <template>
  	<input v-model="msg"/>
  	<p>转为大写：{{newVal}}</p>
  </template>
  <script>
  	import {ref,computed} from 'vue'
  	export default{
  		setup(){
  			let msg = ref('')
  			
  			//定义计算属性
  			let newVal = computed(()=>{
  				return msg.value.toUpperCase()
  			})
  			
  			return {msg,newVal}
  		}
  	}
  </script>
  ```

## 六、watch侦听器

首先：vue2中侦听器的使用方式在vue3中仍然可以使用

### 6.1 watch侦听

**vue3的方式定义侦听器：**

**语法格式：**

```js
import {watch} from 'vue'
export default{
     //watch(被监视的数据,监视的回调函数),
     watch(name,(newVal,oldVal)=>{})
}
```

**案例：**

```vue
<template>
	<!-- vue3中的侦听器 -->
	<h1>数量:{{count}}</h1>
	<button type="button" @click='count++'>点我+1</button>
	<h1>数量:{{num}}</h1>
	<button type="button" @click='num+=2'>点我+2</button>
	<h1>===========================reactive数据监听====================================</h1>
	<h1>姓名:{{obj.name}}</h1>
	<button type="button" @click='obj.name+="#"'>点我改变名字</button>
	<h1>年龄:{{obj.age}}</h1>
	<button type="button" @click='obj.age+=1'>点我改变年龄</button>
	<h1>班级:{{obj.class.c1}}</h1>
	<button type="button" @click='obj.class.c1+="--"'>点我改变班级</button>
</template>

<script>
	import {ref,reactive,watch} from 'vue'
	export default{
		setup(){
			let count = ref(0)
			let num = ref(10)
			
			let obj = reactive({
				name:'张三',
				age:18,
				address:'郑州',
				class:{
					c1:'qy147',
					c2:'qy148'
				}
			})
			//监视一个数据
			/* watch(count,(newVal,oldVal)=>{
				console.log(newVal,oldVal)
			}) */
			//监听多个数据  此时的newVal,oldVal 都是以数组形式展示数据
			/* watch([count,num],(newVal,oldVal)=>{
				console.log(newVal,oldVal)
			}) */
			
			//监听reactive对象数据
			//注意：此处可以监听到数据的改变，但是无法获取到oldVal
			//reactive响应式数据的监听，vue3会自动开启深度监听 并且是强制开启的 deep配置没有效果
			/* watch(obj,(newVal,oldVal)=>{
				console.log(newVal,oldVal)
			},{immediate:true}) */
			
			//监听对象中单独的属性
			//注意：需要把要监听的属性以函数的形式返回 才可以监视到
			//此时的oldVal也可以使用
			/* watch(()=>obj.class.c1,(newVal,oldVal)=>{
				console.log(newVal,oldVal)
			},{immediate:true}) */
			
			
			//此时直接监听class对象  此时需要开启 deep:true属性
			watch(()=>obj.class,(newVal,oldVal)=>{
				console.log(newVal,oldVal)
			},{immediate:true,deep:true})
			
			return {count,num,obj}
		}
	}
</script>
```

### 6.2 `watchEffect` 侦听

**简介：**立即执行传入的一个函数，同时响应式追踪其依赖，并在其依赖变更时重新运行该函数。也就是说监视的回调函数中用到了哪个属性，那么当这个属性发生改变时，watchEffect回调就会执行。

```js
watchEffect(()=>{
    num.value+=1
    console.log('watchEffect执行了')
})
```

只要num的值 发生了改变 watchEffect中的回调函数就会执行。

## 七、vue3 内置组件 

### 7.1 Fragment组件 

概念：Fragment就是一个虚拟的元素，vue3中元素不必使用根元素包括，其实就是放在一个Fragment虚拟元素中了。

<img src="https://gitee.com/Yawpot/cloudimages/raw/master/img/image-20220309095438266.png" alt="image-20220309095438266" style="zoom:50%;" />

### 7.2 Teleport 组件 传送门 

**简介：**Vue 鼓励我们通过将 UI 和相关行为封装到组件中来构建 UI。我们可以将它们嵌套在另一个内部，以构建一个组成应用程序 UI 的树。

然而，有时组件模板的一部分,逻辑上属于该组件，而从技术角度来看，最好将模板的这一部分移动到 DOM 中 Vue app 之外的其他位置。

一个常见的场景是创建一个包含全屏模式的组件。在大多数情况下，你希望模态框的逻辑存在于组件中，但是模态框的快速定位就很难通过 CSS 来解决，或者需要更改组件组合。

**语法格式：**

```
<teleport to="#Father"></teleport>
通过to属性指定要传送的位置。to属性的值： 可以是html标签名  也可以是标签的id值
```

**官方案例：** 点击按钮 打开弹出框，teleport内置组件可以让弹出框显示在指定的位置

![image-20220309110532944](https://gitee.com/Yawpot/cloudimages/raw/master/img/image-20220309110532944.png)

Father.vue组件：

```vue
<template>
	<div id="Father">
		<h1>这里是父组件</h1>
		<Son></Son>
	</div>
</template>

<script>
	import Son from './Son.vue'
	export default{
		components:{Son}
	}
</script>

<style scoped>
	#Father{
		border:1px solid red;
		background-color: red;
		line-height: 100px;
	}
</style>
```

Son.vue组件

```vue
<template>
	<div id="son">
		<h1>这里是儿子组件</h1>
		<Child></Child>
		<button type="button" @click='isShow=true'>打开弹窗</button>
		<Dialog v-if="isShow" @closeDialog='bbb'></Dialog>
	</div>
</template>
<script>
	import Child from './Child.vue'
	import Dialog from './Dialog.vue'
	import {ref} from 'vue'
	export default{
		components:{Child,Dialog},
		//emits:['closeDialog'],
		setup(props,context){
			let isShow = ref(false)
			
			function bbb(val){
				isShow.value = val
			}
			
			return {isShow,bbb}
		}
	}
</script>

<style scoped>
	#son{
		border:1px solid red;
		background-color: gray;
		line-height: 100px;
	}
</style>
```

Child.vue组件

```vue
<template>
	<div id="child">
		<h1>这里是孙子组件</h1>
		<button type="button" @click='isShow=true'>打开弹窗</button>
		<Dialog v-if="isShow" @closeDialog='bbb'></Dialog>
	</div>
</template>

<script>
	import Dialog from './Dialog.vue'
	import {ref} from 'vue'
	export default{
		components:{Dialog},
		//emits:['closeDialog'],
		setup(){
			let isShow = ref(false)
			
			function bbb(val){
				isShow.value = val
			}
			
			return {isShow,bbb}
		}
	}
</script>

<style scoped>
	#child{
		border:1px solid red;
		background-color: blue;
		line-height: 100px;
		color: white;
	}
</style>
```

Dialog.vue组件：

```vue
<template>
	<teleport to="#Father">
		<div id="dialog">
			<div class="dialog">
				<h2>这里是弹出层组件</h2>
				<h3>你好啊哈哈哈</h3>
				<button type="button" @click="close">点我关闭</button>
			</div>
		</div>
	</teleport>
</template>

<script>
	import {ref} from 'vue'
	export default{
		emits:['closeDialog'],
		setup(props,context){
			let isShow = ref(true)
			
			function close(){
				context.emit('closeDialog',false)
			}
			
			return{isShow,close}
		}
	}
</script>

<style scoped>
	#dialog{
		background-color: rgba(0,0,0,0.5);
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.dialog{
		width: 300px;
		height: 300px;
		background-color: yellow;
		margin: auto;
		margin-top: 200px;
	}
</style>
```

完成效果：让dialog弹出层 能够显示在teleport的to属性指定的位置。

### 7.3 Suspense组件 

<img src="https://gitee.com/Yawpot/cloudimages/raw/master/img/image-20220309110907958.png" alt="image-20220309110907958" style="zoom: 50%;" />

## 八、vue3的生命周期 

### 8.1 vue2的生命周期

<img src="https://gitee.com/Yawpot/cloudimages/raw/master/img/image-20220206165435204.png" alt="image-20220206165435204" style="zoom:50%;" />

### 8.2 vue3生命周期

**注意：**vue2的生命周期写法在vue3中同样可以使用。

**vue3生命周期图解：**

<img src="https://gitee.com/Yawpot/cloudimages/raw/master/img/image-20220309111951676.png" alt="image-20220309111951676" style="zoom: 40%;" />

你可以通过在生命周期钩子前面加上 “on” 来访问组件的生命周期钩子。

下表包含如何在 [setup ()](https://v3.cn.vuejs.org/guide/composition-api-setup.html) 内部调用生命周期钩子：

| 选项式 API        | Hook inside `setup` |
| ----------------- | ------------------- |
| `beforeCreate`    | setup()             |
| `created`         | setup()             |
| `beforeMount`     | `onBeforeMount`     |
| `mounted`         | `onMounted`         |
| `beforeUpdate`    | `onBeforeUpdate`    |
| `updated`         | `onUpdated`         |
| `beforeUnmount`   | `onBeforeUnmount`   |
| `unmounted`       | `onUnmounted`       |
| `errorCaptured`   | `onErrorCaptured`   |
| `renderTracked`   | `onRenderTracked`   |
| `renderTriggered` | `onRenderTriggered` |
| `activated`       | `onActivated`       |
| `deactivated`     | `onDeactivated`     |

**注意：**因为 `setup` 是围绕 `beforeCreate` 和 `created` 生命周期钩子运行的，所以不需要显式地定义它们。换句话说，在这些钩子中编写的任何代码都应该直接在 `setup` 函数中编写。

**vue3中生命周期钩子的使用方法(组合API形式)：**

这些函数接受一个回调函数，当钩子被组件调用时将会被执行:

```vue
<template>
	<h1>App.vue组件</h1>
	<h3>{{age}}</h3><button @click="age+=1">点我</button>
</template>

<script>
    //首先导入需要使用生命周期钩子函数
	import {ref,onBeforeMount,onMounted,onBeforeUpdate,onUpdated,onBeforeUnmount,onUnmounted} from 'vue'
	export default {
		name: 'App',
		components: {},
		setup(){
			let age = ref(18)
			
			console.log('================beforeCreate======================')
			console.log('================created======================')
			onBeforeMount(()=>{
				console.log('================onBeforeMount======================')
			})
			
			onMounted(()=>{
				console.log('================onMounted======================')
			})
			
			onBeforeUpdate(()=>{
				console.log('================onBeforeUpdate======================')
			})
			
			onUpdated(()=>{
				console.log('================onUpdated======================')
			})
			
            //当组件进行切换时 可以调用卸载钩子函数
			onBeforeUnmount(()=>{
				console.log('================onBeforeUnmount======================')
			})
			
			onUnmounted(()=>{
				console.log('================onUnmounted======================')
			})
			
			return {age}
		}
	}
</script>
```

## 九、响应式API的使用 

### 9.1 响应性基础API

#### 9.1.1 reactive 与 shallowReactive

- **reactive** 

  **概念：**返回对象的响应式副本

  ```js
  const obj = reactive({ count: 0 })
  ```

  响应式转换是“深层”的——它影响所有嵌套 property。在基于 [ES2015 Proxy ](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)[ ](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 的实现中，返回的 proxy 是**不**等于原始对象的。建议只使用响应式 proxy，避免依赖原始对象。

- **shallowReactive** 

  **概念：**创建一个响应式代理，它跟踪其自身 property 的响应性，但不执行嵌套对象的深层响应式转换 (暴露原始值)。

  只处理对象最外层属性的响应式，内层嵌套的数据就不再是响应式数据了。
  
  ```js
  const state = shallowReactive({
    foo: 1,
    nested: {
      bar: 2
    }
  })
  
  // 改变 state 本身的性质是响应式的
  state.foo++
  // ...但是不转换嵌套对象
  isReactive(state.nested) // false
  state.nested.bar++ // 非响应式
  ```

#### 9.1.2 readonly 与 shallowReadonly

- **readonly**  

  **概念：**接受一个对象 (响应式或纯对象) 或 [ref](https://v3.cn.vuejs.org/api/refs-api.html#ref) 并返回原始对象的只读代理。只读代理是深层的：任何被访问的嵌套 property 也是只读的。

  让一个数据变为只读的，深只读，内部嵌套的数据也是只读的

  ```js
  const original = reactive({ count: 0 })
  
  const copy = readonly(original)
  
  watchEffect(() => {
    // 用于响应性追踪
    console.log(copy.count)
  })
  
  // 变更 original 会触发依赖于副本的侦听器
  original.count++
  
  // 变更副本将失败并导致警告
  copy.count++ // 警告!
  ```

- **shallowReadonly** 

  **概念：**创建一个 proxy，使其自身的 property 为只读，但不执行嵌套对象的深度只读转换 (暴露原始值)。

  ```js
  const state = shallowReadonly({
    foo: 1,
    nested: {
      bar: 2
    }
  })
  
  // 改变 state 本身的 property 将失败
  state.foo++
  // ...但适用于嵌套对象
  isReadonly(state.nested) // false
  state.nested.bar++ // 适用
  ```

  让一个数据变为只读的，浅层只读，内部嵌套的数据不是只读的
  
  ```js
  <script>
  	import {reactive,ref,toRef,toRefs,shallowReadonly,readonly} from 'vue'
  	export default{
  		name:"Father",
  		components:{Son},
  		setup(){
  			let fname = ref('父亲')
  			let person = reactive({
  				name:'张三',
  				age:18,
  				job:{
  					salary:20
  				}
  			})
              //把person对象重新使用shallowReadonly包括 重新赋值给person
  			person = shallowReadonly(person)
  			
  			return {
  				...toRefs(person)
  			}
  		}
  	}
  </script>
  ```
  
  

#### 9.1.3 isProxy 、isReactive 、isReadonly

- **isProxy**

  **概念：**检查对象是否是由 [`reactive`](https://v3.cn.vuejs.org/api/basic-reactivity.html#reactive) 或 [`readonly`](https://v3.cn.vuejs.org/api/basic-reactivity.html#readonly) 创建的 proxy。

- **isReactive** 

  **概念：**检查对象是否是由 [`reactive`](https://v3.cn.vuejs.org/api/basic-reactivity.html#reactive) 创建的响应式代理。

  ```js
  import { reactive, isReactive } from 'vue'
  export default {
    setup() {
      const state = reactive({
        name: 'John'
      })
      console.log(isReactive(state)) // -> true
    }
  }
  ```

- **isReadonly**

  **概念：**检查对象是否是由 [`readonly`](https://v3.cn.vuejs.org/api/basic-reactivity.html#readonly) 创建的只读代理

#### 9.1.4 toRaw和markRaw 

- **toRaw**

  **概念：**返回 [`reactive`](https://v3.cn.vuejs.org/api/basic-reactivity.html#reactive) 或 [`readonly`](https://v3.cn.vuejs.org/api/basic-reactivity.html#readonly) 代理的原始对象。这是一个“逃生舱”，可用于临时读取数据而无需承担代理访问/跟踪的开销，也可用于写入数据而避免触发更改。**不**建议保留对原始对象的持久引用。请谨慎使用。

  把一个响应式对象转变成普通对象。

  ```js
  const foo = {}
  const reactiveFoo = reactive(foo)
  
  console.log(toRaw(reactiveFoo) === foo) // true
  ```

- **markRaw**

  **概念：**标记一个对象，使其永远不会转换为 proxy。返回对象本身。

  ```js
  const foo = markRaw({})
  console.log(isReactive(reactive(foo))) // false
  
  // 嵌套在其他响应式对象中时也可以使用
  const bar = reactive({ foo })
  console.log(isReactive(bar.foo)) // false
  ```

### 9.2 refs引用型API

#### 9.2.1 ref 和 unref 和 isRef

- **ref**

  **概念：**接受一个内部值并返回一个响应式且可变的 ref 对象。ref 对象仅有一个 `.value` property，指向该内部值。

  **示例：**

  ```js
  const count = ref(0)
  console.log(count.value) // 0
  
  count.value++
  console.log(count.value) // 1
  ```

  如果将对象分配为 ref 值，则它将被 [reactive](https://v3.cn.vuejs.org/api/basic-reactivity.html#reactive) 函数处理为深层的响应式对象。

- **unref**

  **概念：**如果参数是一个 [`ref`](https://v3.cn.vuejs.org/api/refs-api.html#ref)，则返回内部值，否则返回参数本身。这是 `val = isRef(val) ? val.value : val` 的语法糖函数。

- **isRef**

  **概念：**检查值是否为一个 ref 对象

#### 9.2.2 toRef 和 toRefs

- **toRef**

  **概念：**可以用来为源响应式对象上的某个 property 新创建一个 [`ref`](https://v3.cn.vuejs.org/api/refs-api.html#ref)。然后，ref 可以被传递，它会保持对其源 property 的响应式连接。

  ```js
  const state = reactive({
    foo: 1,
    bar: 2
  })
  
  //toRef(参数1，参数2)语法
  //参数1代表要操作的那个目标响应式对象   参数2表示目标对象中的要操作的那个属性
  
  const fooRef = toRef(state, 'foo')
  
  fooRef.value++
  console.log(state.foo) // 2
  
  state.foo++
  console.log(fooRef.value) // 3
  ```

  我们可以把对象中的常用数据通过toRef引用出来，这样就不需要再把整个对象向外返回了，写法上会简单些。

  ```js
  export default{
  		name:"Father",
  		setup(){
  			let fname = ref('父亲')
  			let person = reactive({
  				name:'张三',
  				age:18
  			})
  			
  			return {
  				name:toRef(person,'name')
  			}
  		}
  	}
  我们可以通过toRef把一个响应式对象中的单个数据向外暴漏  并且这个单个数据 不会丢失对person对象的响应性。
  ```

  toRef引用响应式对象中的单个数据

- **toRefs** 

  **简介：**将响应式对象转换为普通对象，其中结果对象的每个 property 都是指向原始对象相应 property 的 [`ref`](https://v3.cn.vuejs.org/api/refs-api.html#ref)。
  
  当从组合式函数返回响应式对象时，`toRefs` 非常有用，这样消费组件就可以在不丢失响应性的情况下对返回的对象进行解构/展开：
  
  `toRefs` 引用响应式对象中的多个数据，可以以解构赋值的形式解析响应式对象
  
  ```js
  export default{
  		name:"Father",
  		setup(){
  			let fname = ref('父亲')
  			let person = reactive({
  				name:'张三',
  				age:18
  			})
  			
  			return {
  				...toRefs(person)
  			}
  		}
  	}
  可以直接把整个person对象中所有的数据都变成 toRef形式 使用的时候 直接使用person对象的属性名就可以了。
  ```

## 十、vue3中其余的新增特性 

### 10.1 全局定义----自定义指令，组件，混入，全局挂载。。。。

app.mixin  app.use  app.directive   

```js
全局挂载
app.config.globalProperties.foo = 'bar' 
```

### 10.2 其它特性

- data必须定义为函数式
- 移除`keycodes.数字`
- 移除过滤器
- 。。。。。。更多新特性请自行探索。