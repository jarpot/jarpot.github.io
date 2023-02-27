# token的使用场景

无状态请求
保持用户的登录状态
第三方登录（token+auth2.0）

# 基于token的验证原理

后端不再存储认证信息，而是在**用户登录**的时候生成一个token，然后返回给前端，前端进行存储，在需要进行验证的时候将token一并发送到后端，后端进行验证
加密的方式：对称加密和非对称加密，对称加密指的是加密解密使用同一个密钥，非对称加密使用公钥和私钥，加密用私钥加密，解密用公钥解密

# 基于Token的身份验证的过程如下:

1).客户端：用户名和密码请求登录
2).服务器：收到请求，验证用户名和密码，验证成功后，分发一个Token返回给客户端
3).客户端：将Token存储，例如放在 Cookie 里或者 Local Storage / sessionStorage里，后续每次请求，带上此Token 
4).服务器：收到请求，验证Token是否正确，验证成功返回请求数据
5).服务端收到请求，然后去验证客户端请求里面带着的 Token，如果验证成功，就向客户端返回请求的数据

## 豆瓣接口地址 

baseurl:  http://localhost:3000  

------

注意：接口除注册登录，均要验证token,在请求头中添加token字段
headers['token'] = token; 

------



#### 注册： 
  http://localhost:3000/register

  path: /register
  method: post
  params: 
    -- username 用户名 必传项
    -- password 密码  必传项

#### 登录：

  path: /login
  method: post 
  params: 
    -- username 用户名   必传项
    -- password 密码   必传项

#### 轮播图：

  path: /carousel
  method: get

#### 首页：

  path: /home
  method: get

#### 小组：

  path: /group
  method: get

#### 正在上映

  path: /movie_now
  method: get


####  即将上映
  path: /movie_future
  method: get

