# 第九章：vue路由进阶使用

## 回顾：

路由：本质：一组对应关系   路径===》组件 

配置路由规则  routes   name:'命名路由'  path:'路径'  component=()=>import   一级路由 /

嵌套路由：children:[]  不用加/

访问二级路由时，需要带上一级路由

动态路由：/:name 占位符

​		参数：1.路由参数  2.查询参数   query:{}  params:{} 

重定向 redirect  

`router-link  router-view`   

## 本章内容 

- 掌握vue路由的历史操作
- 掌握编程式路由的使用方法
- 掌握路由守卫的使用方法 

## 一、vue路由的历史和编程式路由导航

### 1.1 vue路由的历史管理 

**简介：** 在之前的原生js中 我们可以通过一些方式去控制网页跳转的历史记录，在vue中我们同样也可以对页面渲染组件的历史进行管理。

**浏览器历史记录介绍：** 

​		**历史记录栈：**浏览器有一个数据结构来存储网页的历史记录，我们把它称之为历史记录栈，因为它的结构跟栈的使用方式有些相似。由于现在的浏览器都是多选项卡的模式，当你打开一个选项卡的时候，即使没有访问具体网页，浏览器也为这个选项卡创建好了BOM对象，比如history对象，然后把新选项卡的空白页作为历史记录里面的第一条记录。

​		**访问指针：**跟历史记录栈一起的，浏览器还有一个**访问指针来表示当前网页在历史记录栈中的位置**。默认情况下，当我们改变网页地址的时候，都会把新的页面压入到历史记录栈的顶部，同时把指针指向到这个最新的网页，每次改变了页面，当前页面的指针始终指向的是历史记录栈最顶部的那条记录；当我们通过浏览器的前进后退功能（包括按钮，快捷，右键菜单等方式）或者是history提供的go/back/forward方法，都不会改变历史记录栈的内容，只会移动一下这个指针：

1. 前进功能/go(1)/forward，只是让这个指针上移1个位置；

2. 后退功能/go(-1)/back，只是让这个指针下移1个位置；

3. go(n)让指针上移n个位置；go(-n)让指针下移n个位置。

​     **浏览器的历史记录限制：**浏览器对历史记录的管理还有一个要点就是对历史记录栈的存储总数有限制，chrome和firefox都是50。当历史记录栈的存储的量超出这个限制后，历史记录的存储就会采取滚动的方式存储，也就是新的记录会压入到栈的顶部，最底部的记录会从栈的底部移除出去。

### 1.2 vue路由对历史记录的管理模式

在vue路由中我们主要通过`<router-link> `标签来控制对历史记录得管理，主要有以下两种模式：

- `push` 模式(追加模式)   默认开启得就是push 模式  效果跟上边得介绍一样

- `replace`模式： （替换模式）

  这个模式的开启需要我们在`<router-link>`标签中添加属性`:replace='true'`可以简写成`replace`

  ```js
  <router-link replace active-class="router-link-active" to="/Subject">学科管理</router-link>
  ```

  只要我们在`<router-link>`标签中添加一个replace属性 那么这个历史就会替换掉历史记录栈中最新的一条记录。

### 1.3 编程式路由导航 

**导航分类：**编程式路由导航，声明式路由导航。

| 声明式                             | 编程式                |
| ---------------------------------- | --------------------- |
| `<router-link :to="...">`          | `router.push(...)`    |
| `<router-link :to="..."  replace>` | `router.replace(...)` |

#### 1.3.1 概念：

除了使用 `<router-link>` 创建 a 标签来定义导航链接，我们还可以借助 router 的实例方法，通过编写代码来实现。

也就是说在我们之前的代码示例中，只要跳转组件，就一定要通过路由才可以；但是我们在实际开发中有些时候(某一些组件跳转时)，可能不方便使用路由来完成，此时我们可能是需要页面中有一个按钮，我们点击按钮，不触发路由，而是通过js代码的方式来完成组件的跳转（例如：3秒后自动跳转）。这种方式被称为 **编程式路由导航**。

#### 1.3.2 使用

- **router.push()**方法

```js
#在 Vue 实例内部，你可以通过 $router 访问路由实例。因此你可以调用 this.$router.push。
```

想要导航到不同的 URL，则使用 `router.push` 方法。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。该方法的参数可以是一个字符串路径，或者一个描述地址的对象。例如：

当你点击 `<router-link>` 时，这个方法会在内部调用，所以说，点击 `<router-link :to="...">` 等同于调用 `router.push(...)`。

```js
// 字符串此时直接去匹配index.js路由中的path路径
$router.push('home')

// 对象
$router.push({ path: 'home'})

// 命名的路由
$router.push({ name: 'user', params: { userId: '123' }})

// 带查询参数，变成 /register?plan=private
$router.push({ path: 'register', query: { plan: 'private' }})
```

- **router.replace()**

跟 `router.push` 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录。

- **router.forward() & router.back()**

  前进和后退一步：

  ```js
  <button type="button" @click="$router.forward()">前进</button>
  <button type="button" @click="$router.back()">后退</button>
  ```

- **router.go()**	

这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步，类似 `window.history.go(n)`。

```js
// 在浏览器记录中前进一步，等同于 history.forward()
router.go(1)

// 后退一步记录，等同于 history.back()
router.go(-1)

// 前进 3 步记录
router.go(3)

// 如果 history 记录不够用，那就默默地失败呗
router.go(-100)
router.go(100)
```



## 二、路由导航守卫(重点)

拦截器

### 2.1 简介

vue-router 提供的导航守卫主要用来通过跳转或取消的方式守卫导航。有多种机会植入路由导航过程中：全局的, 单个路由独享的, 或者组件级的。

简单来说，**导航守卫**就是**路由跳转前、中、后过程中的一些钩子函数**，这个函数能让你操作一些其他的事儿，这就是导航守卫

例如：通过路由拦截，来判断用户是否登录，该页面用户是否有权限浏览

控制权限：后台管理系统   你是如何做的权限控制    菜单级别的权限   按钮级别的权限

token 令牌

### 2.2 全局前置守卫

**概念：**当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于 **等待中**。

 在项目中 每次发生路由的导航跳转时，都会触发这个全局前置守卫，类似于高铁站的安检，必须经过安检的检查后才可以进入。也就是说 必须先通过 全局前置守卫的检查 才可以完成组件的跳转。因此全局前置守卫可以对路由的跳转进行权限的控制。

**使用：** `router.beforeEach(fn)` 在index.js中声明路由VueRouter对象之后，给这个VueRouter对象添加 `beforeEach()`方法，完成全局前置守卫。

**确保 `next` 函数在任何给定的导航守卫中都被严格调用一次。它可以出现多于一次，但是只能在所有的逻辑路径都不重叠的情况下，否则钩子永远都不会被解析或报错**。

```js
//定义全局前置守卫
router.beforeEach(function(to,from,next){
	//to   是预期要访问的路由对象		到哪里去
    //from 是将要离开的路由对象		 从那里来
    //next 是一个函数  表示放行  有三种用法
    	next() 表示放行
        next('/login') 表示强制跳转指定路径
        next(false) 表示不允许访问  停留在当前页面
})
```

案例：登录验证+退出登录

**登录流程：** 单点登录 会给用户返回一个信息：token 在外人看来就是一段无意义的字符串。

**第一步：**

当我们登录成功后，后端会给我们返回一个token认证信息，我们要把这个token 信息存储在本地(localStorage,sessionStorage)

**第二步：**

在前端 路由中使用 全局前置守卫 来做判断  **路由放行的条件！！！** 

登录拦截操作

​    路由放行的条件，问：什么时候 路由可以放行？

1. /login 必须放心 如果不放行 我们压根儿没法登录 所以也就没法获取token

2. 有localStorage中 存在 token 信息

3. 设置/index为整个项目的根目录，只要之后的路径访问中 含有/login 就放行。

**第三步：退出登录** 

1. 清除token   2. 路由导航到登录页

```js
在index.js文件中定义
//添加配置路由的守卫
//添加路由的全局前置守卫
router.beforeEach((to, from, next) => {
    /**
     * to和from都是一个路由对象
     *      to:表示到哪里去
     *      from:表示从哪里来
     * next 这是一个函数
     *  三种用法：
     *      next()  放行
     *      next('/login') 重定向到/login
     *      next(false)  停留在当前页面
     * 路由守卫需要做什么？
     *     如果客户不登陆 无法访问 系统内部的页面
     *         在路由守卫里 ---》作用相当于一个拦截器
     *              1.哪些是可以直接放行的？
     *                    登录组件必须放行
     *                    如果是类似的商城系统：首页，登录，注册都需要放行
     *                  放行是一个路由---》 url路径  /login
     *              2.如果访问的不是/login 那是放行还是拦截？
     *                  要看客户是否已经登录过！！
     *                      怎么判断客户是否已经登录过？
     *                          判断sessionStorage中是否含有token
     *                              如果有：token
     *                                  向后端发送请求 验证token 是否在有效期
     *                                      如果有效 才是放行！！
     *                                      否则：要直接重定向到 /login
     *                              如果没有：代表客户没有登录过
     *                                      要直接重定向到 /login
     */

    let token = sessionStorage.getItem('token')
    if (to.path === '/login') {
        //直接放行
        next();
    } else if (to.path.includes('/index')) {
        //如果访问的路径中带有/index 就表示客户访问的是项目中的内容
        //先验证token 如果token有效 证明客户是登录成功后 又瞎写的路径
        if (token) {//如果token存在
            //模拟 客户向后端发送请求 验证token是否失效
            let b = true;
            if (b) {//token没有失效
                //如果token没有失效 只要客户是瞎写的路径都重定向到首页去
                next()
            } else {
                //如果token失效 就去重新登录
                next('/login')
            }
        }
    } else {
        //证明客户是瞎写的路径
        //先验证token 如果token有效 证明客户是登录成功后 又瞎写的路径
        if (token) {//如果token存在
            //模拟 客户向后端发送请求 验证token是否失效
            let b = true;
            if (b) {//token没有失效
                //如果token没有失效 只要客户是瞎写的路径都重定向到首页去
                next('/index')
            } else {
                //如果token失效 就去重新登录
                next('/login')
            }
        }
    }
})
```

**退出登录**：先清空localStorage/sessionStorage中存储的登录认证信息。再把页面重定向到登录页。

#### 路由对象的`meta`属性：表示路由对象的元数据

路由配置对象不像普通的js对象那样，我们可以随意的给对象添加属性，路由对象，我们无法添加 规定配置项之外的属性，但是如果我们真的想添加一些自己需要的数据的时候，我们可以使用内置提供的`meta`属性也是一个对象类型。可以用于对访问权限进行更加精细的设计或者跳转组件改变页面的标题。

### 2.3 全局后置守卫

**概念：**你也可以注册全局后置钩子，然而和前置守卫不同的是，这些钩子不会接受 `next` 函数也不会改变导航本身：

**前置守卫：**路由跳转之前执行

**后置守卫：**路由跳转之后执行

**场景案例：**组件跳转后可以修改 页签上的标题文字：借助router路由配置对象上的属性`meta`来完成

**语法格式：**

```js
在index.js文件中定义
//定义全局后置路由守卫
router.afterEach(function(to ,from ){
	console.log('后置守卫执行了')
	document.title = to.meta.title
})
```



### 2.4 独享路由守卫 

场景：如果我们想对某一个路由做配置，例如：权限访问限制，此时 使用 全局守卫也可以完成，但是太麻烦了 一个两个 还可以， 如果要守卫的路由比较多 就麻烦了。所以可以使用 独享路由守卫单独的去控制某一个路由

**概念：**单独给某一个路由进行守卫配置，作用跟全局路由守卫一样，但是执行顺序是 先全局再独享。

```js
在index.js文件中指定的路由上配置
#可以路由配置上直接定义 beforeEnter 守卫：
{
    path:'/about',
    name:'about',
    //配置独享路由守卫
                beforeEnter(to, from, next) {
                    /* console.log('stu的独享路由守卫被执行了')
                    next() */
                    if(to.meta.st){
                        next()
                    }else{
                        alert('无权访问')
                        next(false)
                    }
                }
}
```



### 2.5 组件内守卫

**概念：**单独给某一个组件设置路由守卫，可以定义一些业务逻辑操作

**定义位置：** 路由组件内

```js
#可以在路由组件内直接定义以下路由导航守卫：
# beforeRouteEnter beforeRouteUpdate beforeRouteLeave
# About.vue 
beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
```

独享路由守卫和组件内守卫功能很类似，都可以做到更精细化的权限控制操作。

### 2.6 路由的两种模式

- hash模式 

  默认为hash模式 也就是说路径中带有 `#` 并且这个#号后边的信息不会被发送到后台服务器中。 

- history模式 

  可以通过在index.js文件中添加 `mode`选项 把默认的`hash`模式修改为`history`模式 ，这个模式在路径访问时没有#号
  
- abstract模式 

```js
const router = new Router({
	 mode:'history',
	routes: []
})
修改成history模式后会出现如下问题：
问题一：如果路由加载使用的是懒加载  修改成history模式启动有可能会报错，但是这个错误原因暂时未知 chunk
	解决1：不要使用路由懒加载(不推荐)
	解决2：在路由的index.js文件中添加如下内容  捕获错误并重新加载页面
        router.onError((error) => {
            const pattern = /Loading chunk (\d)+ failed/g;
            const isChunkLoadFailed = error.message.match(pattern);
            const targetPath = router.history.pending.fullPath;
            if (isChunkLoadFailed) {
                window.location.reload()
            }
        });
问题二：history模式下无法刷新页面 只要刷新页面，页面就会变成空白页
	解决：在vue.config.js文件下添加如下代码：
        module.exports = {
            publicPath: './public',
            devServer: {
                historyApiFallback: {
                    index: './public/index.html'
                }
            }
        }
```



### 2.7 项目发布可能会遇到的问题

**使用node.js搭建服务器来模拟项目的部署：**

**第一步：**执行 `npm run build` 命令打包项目 会在项目下生成 dist目录

**第二步：** 把打包后的项目部署到服务器上

在hash模式下打包  部署到服务器运行上没有任何问题

但是在history模式下 部署运行 只在浏览器端点击是没有任何问题的，但是只要刷新页面就会出现404错误。

**第三步：**解决以上问题**注意：必须要在服务器端才能解决这个问题**。借助于第三方包 

安装包： `npm i --save  connect-history-api-fallback` 

node.js服务器中的文件：

```js
const express = require('express');
//导入安装的history包
const history = require('connect-history-api-fallback')
let app = express();
const cors = require('cors');

//设置跨域
app.use(cors());

//应用history包
app.use(history())


//设置静态资源访问
app.use(express.static(__dirname+'/public'))

app.get('/login',(req,resp)=>{
	console.log(req.url)
	resp.send("你好哈哈哈")
})
app.get('/index',(req,resp)=>{
	console.log(req.url)
	resp.send("这是Index的请求")
})


app.listen(5500,()=>{
	console.log('127.0.0.1:5500');
});
```



## 三、总结与作业

总结并掌握今日知识点。