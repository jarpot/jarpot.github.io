<img src="assets/image-20220315211127090.png" alt="image-20220315211127090" style="zoom:50%;" />

# 第二章：基操

## 一、uni-app中的样式 

+ rpx 即响应式px，一种根据屏幕宽度自适应的动态单位。以750宽的屏幕为基准，750rpx恰好为屏幕宽度。屏幕变宽，rpx 实际显示效果会等比放大。

+ 使用`@import`语句可以导入外联样式表，`@import`后跟需要导入的外联样式表的相对路径，用`;`表示语句结束

+ 支持基本常用的选择器class、id、element等

+ 在 `uni-app` 中不能使用 `*` 选择器。

+ `page` 相当于 `body` 节点

+ 定义在 App.vue 中的样式为全局样式，作用于每一个页面。在 pages 目录下 的 vue 文件中定义的样式为局部样式，只作用在对应的页面，并会覆盖 App.vue 中相同的选择器。

+ 如何使用scss或者less 

## 二、uni-app中的数据绑定 

在页面中需要定义数据，和我们之前的vue一摸一样，直接在data中定义数据即可

```js
export default {
  data () {
    return {
      msg: 'hello-uni'
    }
  }
}
```

##### 插值表达式的使用

+ 利用插值表达式渲染基本数据

  ```html
  <view>{{msg}}</view>
  ```

+ 在插值表达式中使用三元运算

  ```html
  <view>{{ flag ? '我是真的':'我是假的' }}</view>
  ```

+ 基本运算

  ```html
  <view>{{1+1}}</view>
  ```


##### v-bind动态绑定属性

在data中定义了一张图片，我们希望把这张图片渲染到页面上

```js
export default {
  data () {
    return {
      img: 'http://destiny001.gitee.io/image/monkey_02.jpg'
    }
  }
}
```

利用v-bind进行渲染

```html
<image v-bind:src="img"></image>
```

还可以缩写成:

```html
<image :src="img"></image>
```

##### v-for的使用

data中定以一个数组，最终将数组渲染到页面上

```js
data () {
  return {
    arr: [
      { name: '刘能', age: 29 },
      { name: '赵四', age: 39 },
      { name: '宋小宝', age: 49 },
      { name: '小沈阳', age: 59 }
    ]
  }
}
```

利用v-for进行循环

```js
<view v-for="(item,i) in arr" :key="i">名字：{{item.name}}---年龄：{{item.age}}</view>
```

## 三、uni中的事件

##### 事件绑定

在uni中事件绑定和vue中是一样的，通过v-on进行事件的绑定，也可以简写为@

```html
<button @click="tapHandle">点我啊</button>
```

事件函数定义在methods中

```js
methods: {
  tapHandle () {
    console.log('真的点我了')
  }
}
```

##### 事件传参

- 默认如果没有传递参数，事件函数第一个形参为事件对象e

  ```
  // template
  <button @click="tapHandle">点我啊</button>
  // script
  methods: {
    tapHandle (e) {
      console.log(e)
    }
  }
  ```

- 如果给事件函数传递参数了，则对应的事件函数形参接收的则是传递过来的数据

  ```
  // template
  <button @click="tapHandle(1)">点我啊</button>
  // script
  methods: {
    tapHandle (num) {
      console.log(num)
    }
  }
  ```

- 如果获取事件对象也想传递参数

  ```
  // template
  <button @click="tapHandle(1,$event)">点我啊</button>
  // script
  methods: {
    tapHandle (num,e) {
      console.log(num,e)
    }
  }
  ```

## 四、uni的生命周期

##### 应用的生命周期

生命周期的概念：一个对象从创建、运行、销毁的整个过程被称为生命周期。

生命周期函数：在生命周期中每个阶段会伴随着每一个函数的触发，这些函数被称为生命周期函数

`uni-app` 支持如下应用（全局）生命周期函数：App.vue

| 函数名   | 说明                                           |
| -------- | ---------------------------------------------- |
| onLaunch | 当`uni-app` 初始化完成时触发（全局只触发一次） |
| onShow   | 当 `uni-app` 启动，或从后台进入前台显示        |
| onHide   | 当 `uni-app` 从前台进入后台                    |
| onError  | 当 `uni-app` 报错时触发                        |

##### 页面的生命周期

`uni-app` 支持如下页面生命周期函数：

| 函数名   | 说明                                                         | 平台差异说明 | 最低版本 |
| -------- | ------------------------------------------------------------ | ------------ | -------- |
| onLoad   | 监听页面加载，其参数为上个页面传递的数据，参数类型为Object（用于页面传参），参考[示例](https://uniapp.dcloud.io/api/router?id=navigateto) |              |          |
| onShow   | 监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面 |              |          |
| onReady  | 监听页面初次渲染完成。                                       |              |          |
| onHide   | 监听页面隐藏                                                 |              |          |
| onUnload | 监听页面卸载                                                 |              |          |

[组件的生命周期钩子函数](https://uniapp.dcloud.io/collocation/frame/lifecycle?id=%e7%bb%84%e4%bb%b6%e7%94%9f%e5%91%bd%e5%91%a8%e6%9c%9f)

## 五、下拉刷新和上拉加载

### 开启下拉刷新

在uni-app中有两种方式开启下拉刷新

+ 需要在 `pages.json` 里，找到的当前页面的pages节点，并在 `style` 选项中开启 `enablePullDownRefresh`
+ 通过调用 uni.startPullDownRefresh 方法来开启下拉刷新


###### 通过配置文件开启 

创建list页面进行演示

```html
<template>
	<view>
		杭州学科
		<view v-for="(item,index) in arr" :key="index">
			{{item}}
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				arr: ['前端','java','ui','大数据']
			}
		}
	}
</script>

<style>
</style>
```

通过pages.json文件中找到当前页面的pages节点，并在 `style` 选项中开启 `enablePullDownRefresh`

```js
{
  "path":"pages/list/list",
    "style":{
      "enablePullDownRefresh": true
    }
}
```

###### 通过API开启

[api文档](https://uniapp.dcloud.io/api/ui/pulldown)

```html
uni.startPullDownRefresh()
```

##### 监听下拉刷新

通过onPullDownRefresh可以监听到下拉刷新的动作

```js
export default {
  data () {
    return {
      arr: ['前端','java','ui','大数据']
    }
  },
  methods: {
    startPull () {
      uni.startPullDownRefresh()
    }
  },
  onPullDownRefresh () {
    console.log('触发下拉刷新了')
  }
}
```

##### 关闭下拉刷新

uni.stopPullDownRefresh()

停止当前页面下拉刷新。

案例演示

```html
<template>
	<view>
		<button type="primary" @click="startPull">开启下拉刷新</button>
		杭州学科
		<view v-for="(item,index) in arr" :key="index">
			{{item}}
		</view>
	</view>
</template>
<script>
	export default {
		data () {
			return {
				arr: ['前端','java','ui','大数据']
			}
		},
		methods: {
			startPull () {
				uni.startPullDownRefresh()
			}
		},
		
		onPullDownRefresh () {
			this.arr = []
			setTimeout(()=> {
				this.arr = ['前端','java','ui','大数据']
				uni.stopPullDownRefresh()
			}, 1000);
		}
	}
</script>
```

### 上拉加载

通过在pages.json文件中找到当前页面的pages节点下style中配置onReachBottomDistance可以设置距离底部开启加载的距离，默认为50px

通过onReachBottom监听到触底的行为

```js
<template>
	<view>
		<button type="primary" @click="startPull">开启下拉刷新</button>
		杭州学科
		<view v-for="(item,index) in arr" :key="index">
			{{item}}
		</view>
	</view>
</template>
<script>
	export default {
		data () {
			return {
				arr: ['前端','java','ui','大数据','前端','java','ui','大数据']
			}
		},
		onReachBottom () {
			console.log('触底了')
		}
	}
</script>

<style>
	view{
		height: 100px;
		line-height: 100px;
	}
</style>
```

## 六、发送网络请求

在uni中可以调用uni.request方法进行请求网络请求

需要注意的是：在小程序中网络相关的 API 在使用前需要配置域名白名单。

**发送get请求**

```js
<template>
	<view>
		<button @click="sendGet">发送请求</button>
	</view>
</template>
<script>
	export default {
		methods: {
			sendGet () {
				uni.request({
					url: 'http://localhost:8082/api/getlunbo',
					success(res) {
						console.log(res)
					}
				})
			}
		}
	}
</script>
```

**发送post请求**

## 七、数据缓存

##### **uni.setStorage**

[官方文档](https://uniapp.dcloud.io/api/storage/storage?id=setstorage)

将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个异步接口。

代码演示

```js
<template>
	<view>
		<button type="primary" @click="setStor">存储数据</button>
	</view>
</template>

<script>
	export default {
		methods: {
			setStor () {
				uni.setStorage({
				 	key: 'id',
				 	data: 100,
				 	success () {
				 		console.log('存储成功')
				 	}
				 })
			}
		}
	}
</script>

<style>
</style>
```

##### uni.setStorageSync

将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。

代码演示

```js
<template>
	<view>
		<button type="primary" @click="setStor">存储数据</button>
	</view>
</template>

<script>
	export default {
		methods: {
			setStor () {
				uni.setStorageSync('id',100)
			}
		}
	}
</script>

<style>
</style>
```

##### uni.getStorage

从本地缓存中异步获取指定 key 对应的内容。

代码演示

```html
<template>
	<view>
		<button type="primary" @click="getStorage">获取数据</button>
	</view>
</template>
<script>
	export default {
		data () {
			return {
				id: ''
			}
		},
		methods: {
			getStorage () {
				uni.getStorage({
					key: 'id',
					success:  res=>{
						this.id = res.data
					}
				})
			}
		}
	}
</script>
```

##### uni.getStorageSync

从本地缓存中同步获取指定 key 对应的内容。

代码演示

```html
<template>
	<view>
		<button type="primary" @click="getStorage">获取数据</button>
	</view>
</template>
<script>
	export default {
		methods: {
			getStorage () {
				const id = uni.getStorageSync('id')
				console.log(id)
			}
		}
	}
</script>
```

##### uni.removeStorage

从本地缓存中异步移除指定 key。

代码演示

```html
<template>
	<view>
		<button type="primary" @click="removeStorage">删除数据</button>
	</view>
</template>
<script>
	export default {
		methods: {
			removeStorage () {
				uni.removeStorage({
					key: 'id',
					success: function () {
						console.log('删除成功')
					}
				})
			}
		}
	}
</script>
```

##### uni.removeStorageSync

从本地缓存中同步移除指定 key。

代码演示

```html
<template>
	<view>
		<button type="primary" @click="removeStorage">删除数据</button>
	</view>
</template>
<script>
	export default {
		methods: {
			removeStorage () {
				uni.removeStorageSync('id')
			}
		}
	}
</script>
```

## 八、组件的基本使用

- uni-app的组件，分为基础组件和扩展组件。
- 基础组件在uni-app框架中已经内置，无需将内置组件的文件导入项目，也无需注册内置组件，随时可以直接使用，比如`<view>`组件。
- 除了基础组件，都称为扩展组件。扩展组件需要将组件导入项目中才可以使用。
- uni-app为开发者提供了一系列基础组件，类似HTML里的基础标签元素。
- 但uni-app的组件与HTML不同，而是与小程序相同，可更好的满足手机端的使用习惯。
- 虽然不推荐使用HTML标签，但实际上如果开发者写了`div`等标签，在编译到非H5平台时也会被编译器转换为`view`标签，类似的还有`span`转`text`、`a`转`navigator`等，包括css里的元素选择器也会转。但为了管理方便、策略统一，新写代码时仍然建议使用view等组件。
- 开发者可以通过组合这些基础组件进行快速开发。在需要复用的情况下可封装成扩展组件。
- uni-app` 基础组件规范，与小程序规范相近。如果了解小程序开发的话，uni-app的基础组件会感觉很熟悉。但需要注意组件上的事件绑定，需要以 vue 的事件绑定语法来绑定，如 bindchange="eventName" 事件，需要写成 `@change="eventName"

- match-media
- picker
- camera
- map
- 扩展组件（uni ui）

## uni-app中组件的创建

在uni-app中，可以通过创建一个后缀名为vue的文件，即创建一个组件成功，其他组件可以将该组件通过import的方式导入，在通过components进行注册即可

+ 创建login组件，在components中创建login目录，然后新建login.vue文件

  ```
  <template>
  	<view>
  		这是一个自定义组件
  	</view>
  </template>
  
  <script>
  </script>
  
  <style>
  </style>
  ```

+ 不用导入就可以直接 使用组件

  ```
  <test></test>
  ```


##### 组件的生命周期函数

| beforeCreate  | 在实例初始化之后被调用。[详见](https://cn.vuejs.org/v2/api/#beforeCreate) |              |      |
| ------------- | ------------------------------------------------------------ | ------------ | ---- |
| created       | 在实例创建完成后被立即调用。[详见](https://cn.vuejs.org/v2/api/#created) |              |      |
| beforeMount   | 在挂载开始之前被调用。[详见](https://cn.vuejs.org/v2/api/#beforeMount) |              |      |
| mounted       | 挂载到实例上去之后调用。[详见](https://cn.vuejs.org/v2/api/#mounted) 注意：此处并不能确定子组件被全部挂载，如果需要子组件完全挂载之后在执行操作可以使用`$nextTick`[Vue官方文档](https://cn.vuejs.org/v2/api/#Vue-nextTick) |              |      |
| beforeUpdate  | 数据更新时调用，发生在虚拟 DOM 打补丁之前。[详见](https://cn.vuejs.org/v2/api/#beforeUpdate) | 仅H5平台支持 |      |
| updated       | 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。[详见](https://cn.vuejs.org/v2/api/#updated) | 仅H5平台支持 |      |
| beforeDestroy | 实例销毁之前调用。在这一步，实例仍然完全可用。[详见](https://cn.vuejs.org/v2/api/#beforeDestroy) |              |      |
| destroyed     | Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。[详见](https://cn.vuejs.org/v2/api/#destroyed) |              |      |

## 组件的通讯

##### 父组件给子组件传值

通过props来接受外界传递到组件内部的值

```
<template>
	<view>
		这是一个自定义组件 {{msg}}
	</view>
</template>

<script>
	export default {
		props: ['msg']
	}
</script>

<style>
</style>
```

其他组件在使用login组件的时候传递值

```
<template>
	<view>
		<test :msg="msg"></test>
	</view>
</template>

<script>
	import test from "@/components/test/test.vue"
	export default {
		data () {
			return {
				msg: 'hello'
			}
		},
		
		components: {test}
	}
</script>
```

##### 子组件给父组件传值

通过$emit触发事件进行传递参数

```html
<template>
	<view>
		这是一个自定义组件 {{msg}}
		<button type="primary" @click="sendMsg">给父组件传值</button>
	</view>
</template>

<script>。
	export default {
		data () {
			return {
				status: '打篮球'
			}
		},
		props: {
			msg: {
				type: String,
				value: ''
			}
		},
		methods: {
			sendMsg () {
				this.$emit('myEvent',this.status)
			}
		}
	}
</script>
```

父组件定义自定义事件并接收参数

```html
<template>
	<view>
		<test :msg="msg" @myEvent="getMsg"></test>
	</view>
</template>
<script>
	import test from "@/components/test/test.vue"
	export default {
		data () {
			return {
				msg: 'hello'
			}
		},
		methods: {
			getMsg (res) {
				console.log(res)
			}
		},
		
		components: {test}
	}
</script>
```

##### [兄弟组件通讯](https://www.cnblogs.com/wjw1014/p/13492342.html)



## 九、上传图片、预览图片

##### 上传图片

uni.chooseImage方法从本地相册选择图片或使用相机拍照。

案例代码

```html
<template>
	<view>
		<button @click="chooseImg" type="primary">上传图片</button>
		<view>
			<image v-for="item in imgArr" :src="item" :key="index"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				imgArr: []
			}
		},
		methods: {
			chooseImg () {
				uni.chooseImage({
					count: 9,
					success: res=>{
						this.imgArr = res.tempFilePaths
					}
				})
			}
		}
	}
</script>
```

##### 预览图片

结构

```html
<view>
	<image v-for="item in imgArr" :src="item" @click="previewImg(item)" :key="item"></image>
</view>
```

预览图片的方法

```js
previewImg (current) {
  uni.previewImage({
    urls: this.imgArr,
    current
  })
}
```

## 十、条件注释实现跨端兼容

条件编译是用特殊的注释作为标记，在编译时根据这些特殊的注释，将注释里面的代码编译到不同平台。

**写法：**以 #ifdef 加平台标识 开头，以 #endif 结尾。

平台标识

| 值         | 平台                                                   | 参考文档                                                     |
| ---------- | ------------------------------------------------------ | ------------------------------------------------------------ |
| APP-PLUS   | 5+App                                                  | [HTML5+ 规范](http://www.html5plus.org/doc/)                 |
| H5         | H5                                                     |                                                              |
| MP-WEIXIN  | 微信小程序                                             | [微信小程序](https://developers.weixin.qq.com/miniprogram/dev/api/) |
| MP-ALIPAY  | 支付宝小程序                                           | [支付宝小程序](https://docs.alipay.com/mini/developer/getting-started) |
| MP-BAIDU   | 百度小程序                                             | [百度小程序](https://smartprogram.baidu.com/docs/develop/tutorial/codedir/) |
| MP-TOUTIAO | 头条小程序                                             | [头条小程序](https://developer.toutiao.com/dev/cn/mini-app/develop/framework/basic-reference/introduction) |
| MP-QQ      | QQ小程序                                               | （目前仅cli版支持）                                          |
| MP         | 微信小程序/支付宝小程序/百度小程序/头条小程序/QQ小程序 |                                                              |

##### 组件的条件注释

代码演示

```html
<!-- #ifdef H5 -->
<view>
  h5页面会显示
</view>
<!-- #endif -->
<!-- #ifdef MP-WEIXIN -->
<view>
  微信小程序会显示
</view>
<!-- #endif -->
<!-- #ifdef APP-PLUS -->
<view>
  app会显示
</view>
<!-- #endif -->
```

##### api的条件注释

代码演示

```js
onLoad () {
  //#ifdef MP-WEIXIN
  console.log('微信小程序')
  //#endif
  //#ifdef H5
  console.log('h5页面')
  //#endif
}
```

样式的条件注释

代码演示

```css
/* #ifdef H5 */
view{
  height: 100px;
  line-height: 100px;
  background: red;
}
/* #endif */
/* #ifdef MP-WEIXIN */
view{
  height: 100px;
  line-height: 100px;
  background: green;
}
/* #endif */
```

## 十一、uni中的导航跳转

##### 利用navigator进行跳转

navigator详细文档：[文档地址](https://uniapp.dcloud.io/component/navigator)

跳转到普通页面

```html
<navigator url="/pages/about/about" hover-class="navigator-hover">
  <button type="default">跳转到关于页面</button>
</navigator>
```

跳转到tabbar页面

```html
<navigator url="/pages/message/message" open-type="switchTab">
  <button type="default">跳转到message页面</button>
</navigator>
```

##### 利用编程式导航进行跳转

[导航跳转文档]( [uni.navigateTo](https://uniapp.dcloud.io/api/router?id=navigateto))

**利用navigateTo进行导航跳转**

保留当前页面，跳转到应用内的某个页面，使用`uni.navigateBack`可以返回到原页面。

```html
<button type="primary" @click="goAbout">跳转到关于页面</button>
```

通过navigateTo方法进行跳转到普通页面

```js
goAbout () {
  uni.navigateTo({
    url: '/pages/about/about',
  })
}
```

**通过switchTab跳转到tabbar页面**

跳转到tabbar页面

```html
<button type="primary" @click="goMessage">跳转到message页面</button>
```

通过switchTab方法进行跳转

```js
goMessage () {
  uni.switchTab({
    url: '/pages/message/message'
  })
}
```

**redirectTo进行跳转** 

关闭当前页面，跳转到应用内的某个页面。

```html
<!-- template -->
<button type="primary" @click="goMessage">跳转到message页面</button>
<!-- js -->
goMessage () {
  uni.switchTab({
    url: '/pages/message/message'
  })
}
```

通过onUnload测试当前组件确实卸载

```js
onUnload () {
  console.log('组件卸载了')
}
```

##### 导航跳转传递参数

在导航进行跳转到下一个页面的同时，可以给下一个页面传递相应的参数，接收参数的页面可以通过onLoad生命周期进行接收

传递参数的页面

```js
goAbout () {
  uni.navigateTo({
    url: '/pages/about/about?id=80',
  });
}
```

接收参数的页面

```js
<script>
	export default {
		onLoad (options) {
			console.log(options)
		}
	}
</script>
```

#### 

[uni-simple-router](https://github.com/SilurianYang/uni-simple-router) 是 专为 [uni-app](https://uniapp.dcloud.io/) 打造的路由管理器  https://hhyang.cn/v2/start/h5/nesting.html

作业：

1. 央视app -直播页
2. 央视app-专题详情页


