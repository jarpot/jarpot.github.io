## 二、React-router 6

### 2.1 安装

```
npm install react-router-dom@6
```

### 2.2 变化

```jsx
router6中的路由默认开启严格匹配
1.新增了<Routes></Routes>组件
	需要把所有的<Route></Route>组件写入其中
2.<Route>组件的变化
	取消了其中的 component,render,children属性，统一使用element属性来替代
	<Route path="路径" element={<Student/>}>
3.参数传递方面
	useParams()钩子没有变化
	useLocation()钩子没有变化
	新增了useMatch()钩子 ：用来检查当前url是否匹配某一个路由
		路径匹配：返回一个对象
		路径不匹配：返回null
	新增了useNavigate()钩子 该钩子返回一个函数 用于跳转页面 作用等同于useHistory()钩子中的跳转方法
	import {useNavigate} from 'react-router-dom'
	function Student(){
		let navigate = useNavigate(); 
		let aaa = ()=>{
            //跳转页面
            //默认是push模式
			navigate('/stu')
            //replace模式
            navigate('/stu',{replace:true})
            
		}
		return (
			<button onClick={aaa}>点我</button>
		)
	}
	
4.嵌套路由方面
	新的路由 在嵌套的路由子组件内不在需要填写 绝对路径 和拼接父级路由了  
    嵌套路由定义的父路由之内 可以自动的 拼接上父级路由。 就可以完成跳转 
    	
    路由可以在跟组件中直接定义全部路由
    App.jsx中：
		<Routes>
        	//父级路由
        	<Route path='stu'  element={<Student/>}>
             	//子级路由
            	<Route path='stuinfo' element={<StuInfo/>}></Route>
        	</Route>
        </Routes>
        因为 <StuInfo/>组件需要在<Student/>组件中显示 但是这样配置其实并没有什么连接关系 所以我们还需要借助一个组件 <Outlet/> 此组件相当于占位符  把这个组件定义在<Student/>组件中  就可以帮我们渲染 <StuInfo/>组件了。
	只有当路径匹配成功时 才会渲染,如果匹配不成功  <Outlet/>组件不会做任何渲染
        如上配置访问的时候 可以直接访问  stu/stuinfo
5.新增了<Navigate to="路径">组件  作用等同于 <Redirect to>组件
	默认使用push跳转
    可以添加replace属性 指定替换模式
6.<NavLink>组件
	<NavLink
		style={
            ({isActive})=>{
                return isActive ? {color:'red'} : null
            }
        }
	/>

<tables data: columns/>
```

