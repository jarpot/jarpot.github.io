# 第四章：cookie和本地存储

## 课前测试：

## 回顾：

跨域：

​		原因：浏览器的同源策略  网景

​		同源：协议  域名  端口号 全部相同

​		限制：

​				无法读取非同源网页的存储数据  cookie   localStorage  indexDB

​				无法访问  DOM

​				ajax访问数据

​		解决放案：

​				1.cors请求头设置 

​				2.ajax间接

​				3.jsonp

​						①创建script标签  

​						② 设置src属性 ---》去访问  服务器地址 结尾追加一个参数  callback=回调函数的名字

​						③ 把标签添加到dom文档中

art模板引擎：

​		去看文档（语法） if(){}

​			{{if  条件}}

​			{{else if  条件}}

​			{{/if}}

{{each  遍历的对象/数组}}

{{/each}}

## 本章目标    

- 了解Cookie的概念及其特性
- 会使用JavaScript来操作Cookie
- 了解封装
- 了解Stroage本地存储
- 会使用Stroage存储数据

## 一、cookie   

### 1.1 什么是 cookie   

Cookie，有时也用其复数形式 [Cookies](https://baike.baidu.com/item/Cookies/187064)。类型为“**小型文本文件**”，是某些网站为了辨别用户身份，进行[Session](https://baike.baidu.com/item/Session/479100)跟踪而储存在用户本地终端上的数据（通常经过加密），由用户[客户端](https://baike.baidu.com/item/客户端/101081)计算机暂时或永久保存的信息。

### 1.2 为什么用 cookie 

是某些网站为了辨别用户身份，进行[Session](https://baike.baidu.com/item/Session/479100)跟踪而储存在用户本地终端上的数据（通常经过加密）。

http协议：请求和响应两部分  无连接  无状态

一次完整的请求包含  request  response两部分 ，但凡是跟后端做了一次数据交互，就是一次请求。

正常的http请求 每一次的请求都是一个独立的个体，相互之间没有关联。这样就会存在一个问题，同一个项目下的网页与网页之间没有关系，没有办法把同一个用户的所有操作都连接起来！！！为了解决这样的问题，所以产生了cookie。

cookie解决的问题就是能够把同一个用户在所有网页中的操作连接起来，形成一个整体。

session：会话

​		一次会话：包含多次请求。

### 1.3 cookie 的实现原理 

![image-20211201142219756](https://gitee.com/Yawpot/cloudimages/raw/master/img/image-20211201142219756.png)

根据cookie信息识别对应的session。一般都说cookie用于记录用户的登录状态，但实际上 能够记录用户登陆状态的是 session，但是 session的实现是依托于cookie的。

场景：我们去登录一个网页，做各种操作，但是如果你没有关闭浏览器，中途 停止操作一定的时长(30分钟) ，你回来会发现 需要重新登录，其实此时是因为session的失效了。其实就是说 cookie中携带的登录状态后台无法识别了。

**一定是登录之后，服务器会向浏览器通过  set-cookie设置一个登录状态信息(session相关的信息) 是把这个登录信息存储到客户端了** ，然后以后的每一次请求 浏览器都会自动的把这个登录信息通过 cookie发送给服务器，后台服务器就可以通过这个信息，识别用户是否是已经登陆状态。。。

cookie是客户端会话技术。    

session是服务器端会话技术。

### 1.4 cookie 的使用 

枚举：穷举 

- 设置/创建cookie 

  语法：

  ```javascript
  document.cookie=”名字=值 ”;
  ```

  > JS“=”代表覆盖，cookie“=”代表添加
  >
  > cookie中名字一样时，会覆盖原来的值

- 获取cookie 

  语法：

  ```javascript
   document.cookie; //即获取到所有存储的cookie值
  ```

  ​		原生的cookie对前端人员很不友好，获取cookie值的时候一下子把所有的cookie信息给获取出来，如果需要其中的某一个具体的值，需要进行相对应的js进行拆分

  ```html
   //封装函数
          /*
              封装的三要素：
                  函数名   getCookie();
                  参数列表  name
                  返回值    name对应的 value
          */
          function getCookie(n) {
              var cook = document.cookie;
              var cookArr = cook.split('; ');
              for (var i in cookArr) {
                  //把cookie中的每一个数据都再次进行分隔  此时得到的所有数组都是长度为2的数组
                  var cArr = cookArr[i].split('=');
                  //'name=张三'  ['name','张三']
                  if (cArr[0] == n) {
                      return cArr[1];
                  }
              }
          }
  ```

- 删除cookie，expires有效时间

  过期时间：expires=时间 【此处的时间为时间对象Date()】

   删除cookie,通过设置cookie键值对的过期时间

    通过 expires = 时间对象 

  语法：

  ```
  document.cookie = "name=value;expires="+时间对象
  ```

  ```javascript
  <script>
  		/* 
         删除cookie,通过设置cookie键值对的过期时间
         通过 expires = 时间对象
         document.cookie = "name=value;expires="+时间对象
         */
  
         var time = new Date();
  		//+1 代表一天后过期，如果想立马删除，可以设置-1
         time.setDate(time.getDate()+1);
         document.cookie="money=999999;expires="+time;
  </script>
  ```

  ![image-20210322161729731](https://gitee.com/Yawpot/cloudimages/raw/master/img/image-20210322161729731.png)


### 1.5 封装cookie 

我们通过上面的学习，学到了设置cookie,获取cookie和删除cookie，那么如果我们接下来想再次的使用设置获取和删除cookie，就需要重新再来写一遍，这样非常的不方便。这里就用到了封装

**封装三个函数**

- setCookie()——创建Cookie
- getCookie()——获取Cookie
- removeCookie()——删除Cookie

**封装：** 

封装  继承  多态

封装是**面向对象**的三个基本特征之一，将现实世界的事物抽象成计算机领域中的对象,对象同时具有属性和行为（方法），这种抽象就是封装。
函数（function）-- 最简单的封装 
将零散的的语句写进函数的花括号内，成为函数体，然后就可以调用了。
函数对**任何语言**来说都是一个**核心的概念**。通过函数可以封装任意多条语句，而且可以在任何地方、任何时候调用执行。

> 封装的含义就是把复杂的东西都封装起来，让别人调用的时候可以简单调用
>
> 该隐藏的隐藏，该暴露的暴露  

> 我要看电视，只需要按一下开关和换台就可以了。有必要了解电视机内部的结构吗?有必要碰碰显像管吗?制造厂家为了方便我们使用电视，把复杂的内部细节全部封装起来，只给我们暴露简单的接口，比如:电源开关。具体内部是怎么实现的,我们不需要操心。
>
> 需要让用户知道的才暴露出来，不需要让用户知道的全部隐藏起来，这就是封装。说的专业一点，
> 封装就是把对象的属性和操作结合为一个独立的整体，并尽可能隐藏对象的内部实现细节。



![image-20210322163716960](https://gitee.com/Yawpot/cloudimages/raw/master/img/image-20210322163716960.png)



**如果我就不呢？就不封装**

![jb](https://gitee.com/Yawpot/cloudimages/raw/master/img/jb.jpg)



不封装的缺点：

- 代码繁琐、冗余、复用率低、开发效率低
- 易被同名变量覆盖--因为在全局作用域下声明的变量，容易被同名变量覆盖
- 立即执行--解析器读取到此处立即执行

封装为函数的优点: 

- 避免了全局变量--因为存在函数作用域
- 按需执行--解析器读取到此处，函数并未执行，只有当你需要的时候，调用此函数即可
- 提高代码重用性 

案例：cookie三个函数的封装

```js
(function (global) {
    //global全局
    var cookie_ = {
        setCookie: function (k, v, t) {
            if (k == undefined || v == undefined || t == undefined) {
                //抛出 异常
                throw  new Error('参数输入有误');
            } else {
                //获取当前系统时间对象
                var date = new Date();
                //把当前的 日  加上传入的参数  就是 cookie的有效时间
                var time = date.getDate() + t;
                //把新的天数重新设置到 date日期对象中
                date.setDate(time);
                //给cookie设置 有效时间 
                document.cookie = k + '=' + v + ';expires=' + date;
            }
        },
        getCookie: function (n) {
            var cook = document.cookie;
            var cookArr = cook.split('; ');
            for (var i in cookArr) {
                //把cookie中的每一个数据都再次进行分隔  此时得到的所有数组都是长度为2的数组
                var cArr = cookArr[i].split('=');
                //'name=张三'  ['name','张三']
                if (cArr[0] == n) {
                    return cArr[1];
                }
            }
        },
        removeCookie: function (k) {
            var date = new Date();
            //把当前的 日  加上传入的参数  就是 cookie的有效时间
            var time = date.getDate() - 1;
            //把新的天数重新设置到 date日期对象中
            date.setDate(time);
            document.cookie = k + "=;expires=" + date;
        }
    }
    global.myCookie = cookie_;
})(window);
```

### 案例：使用cookie 实现记住密码功能。



## 二、Storage  存储

![image-20210322211602824](https://gitee.com/Yawpot/cloudimages/raw/master/img/image-20210322211602824.png)

和stroage对比cookie 的缺点：

- 只能存储4KB
- 浪费带宽，每次会随着HTTP请求发送给服务器
- 操作数据很繁琐，没有方便的API

Storage 本地存储：

- 大小最小5MB，可以申请更大的空间
- 不会随HTTP请求发送给服务器
- 非常容易操作，Storage提供了方便的api(操作方法和属性) 供你使用
- 移动端普及高
- localStorage与sessionStorage两种

### 2.1 localStorage

#### localStorage存储数据：

语法：

```
localStorage.setItem(key,value);
```

> **localSorage存储的值，必须是字符串，如果存储的是对象，则无法正常显示**

> localStroage存储数据，value必须是字符串，
>
> 所以如果想要存储的值是对象，需要先把对象转为字符串
>
> ```
> <script>
>         localStorage.setItem('name','李四');
>         //添加时 如果key值相同  会把之前覆盖掉
>         localStorage.setItem('age','18');
>         localStorage.setItem('age','20');
>         var obj = {
>             "name":'张三',
>             "age":18,
>             "address":'郑州'
>         }
>         localStorage.setItem('obj',JSON.stringify(obj));
>     </script>
> ```

> localStorage.setItem(key , value)，保存或设置数据
> 如果key已经存在，则覆盖key对应的value
> 如果不存在则添加新的key与value

#### localStorage获取数据：

语法：

localStorage.getItem(key);   获取key对应的value。

如果key不存在则返回null

```javascript
 // 取值 localStorage.getItem(key);
        var user_message = localStorage.getItem('user_message');
        console.log(user_message);
```

返回的字符串如果是一个对象字符串，最好转为对象，这样方便接收数据

JSON.parse();

eval(  '('+obj+')' );

```javascript
 var user_message = JSON.parse(localStorage.getItem('user_message'));
        console.log(user_message.address);
```

#### localStorage删除数据：

clear(); 

将**同域名下**的所有localStorage数据都清空

removeItem('key'):
删除数据，通过key来删除相应的value

```javascript
// 删除数据  localStorage.removeItem(key)
        localStorage.removeItem('username');
```

length 获取localStorage一共有多少条数据

```
// length获取localStorage的长度
        console.log(localStorage.length)  //2
```

配合key(index)方法可以实现遍历localStorage数据的方法

```javascript
// localStorage以键值对的方式存在
        // localStorage.key(0)  根据下标获取键名
        console.log(localStorage.key(0)); //username
```

遍历localStorage

```javascript
 //遍历获取信息
        for(var i=0;i<localStorage.length;i++){
            var k_ = localStorage.key(i)
            var value = localStorage.getItem(k_);
            console.log(k_+":"+value);
        }
```

#### storage 同源事件：

当同源的localStorage有更改以后，会触发这个事件(storage)

![image-20210322222258266](https://gitee.com/Yawpot/cloudimages/raw/master/img/image-20210322222258266.png)

### 2.2 sessionStorage

sessionStorage为临时性保存数据，当页面关闭就会消失。其他一切与localStorage一样

sessionStorage不能跨页面访问，也不会触发跨标签页的storage事件。它只局限在当前的标签页

存储临时性数据 

其他的方法属性和localStorage一样

sessionStroage.setItem();   sessionStroage.getItem   sessionStroage.removeItem   sessionStroage.clear()

cookie和localStorage 和sessionStorage的区别：

![image-20210322223121313](https://gitee.com/Yawpot/cloudimages/raw/master/img/image-20210322223121313.png)

面试高频题：cookie 和localStorage和sessionStorage的区别？

## 三、总结与作业  

1.cookie的封装

2.记住密码