# 第八章：DOM编程

## 课前测试 10分钟：

页面生成50个div，并设置随机颜色。

## 回顾：

String    Number   Boolean   Math    Date 

## 本章目标 

理解文档对象模型

熟练掌握document对象访问页面元素

熟练掌握动态添加页面元素

通过DOM操作html页面中的标签，属性，样式等。



js：ECMASCript基本语法

​	DOM  document object model 

​	BOM  browser  object model

## 第一节：DOM编程概述 

js:ECMA的基本语法，DOM编程   BOM编程

#### 1.1 什么是 DOM 

文档对象模型（Document Object Model，简称DOM），是[W3C](https://baike.baidu.com/item/W3C)组织推荐的处理[可扩展置标语言](https://baike.baidu.com/item/可扩展置标语言/4605507)的标准[编程接口](https://baike.baidu.com/item/编程接口/3339711)。它是一种与平台和语言无关的[应用程序接口](https://baike.baidu.com/item/应用程序接口)(API),它可以动态地访问程序和脚本,更新其内容、结构和[www](https://baike.baidu.com/item/www/109924)文档的风格(HTML和XML文档是通过说明部分定义的)。文档可以进一步被处理，处理的结果可以加入到当前的页面。[DOM](https://baike.baidu.com/item/DOM/50288)是一种基于树的[API](https://baike.baidu.com/item/API/10154)文档，它要求在处理过程中整个文档都表示在[存储器](https://baike.baidu.com/item/存储器/1583185)中。另外一种简单的API是基于事件的SAX，它可以用于处理很大的XML文档，由于大，所以不适合全部放在存储器中处理。

DOM: 就是为了对页面上的标签做增删改查操作。通过js代码动态的操作页面上的标签。页面上有动感。

动态页面和静态页面的区别是：看页面中的数据是否会随时间，数据库等外界因素而发生改变。

#### 1.2 为什么要学习 DOM 编程  

为了对页面上的标签做增删改查操作 。

## 第二节：节点（Node）操作  

标签，元素，标记，节点

**对节点的操作  增删改查**  

#### 2.1 节点概述 

什么是节点？

- 文档是一个**文档节点。**（页面中的汉字，空格符，特殊符号）
- 所有的HTML元素都是**元素/标签节点。**  ******
- 所有 HTML 属性都是**属性节点。**  
- 文本插入到 HTML 元素是**文本节点。**

元素节点(最多)，属性节点（其次），文本节点   

#### 2.2 标签节点对象的获取  

想操作页面中的某一个标签，要先拿到这个标签。 

```
document.getElementById(“”); 一个
document.getElementsByClassName();多个
document.getElementsByName(); 多个  使用频率不高 
document.getElementsByTagName();多个   HTMLCollections

document.querySelector("选择器的值");单个元素对象
document.querySelectorAll("");多个元素   NodeLists
```

#### 2.3 节点的操作  

- #####  增加操作  

  | 名称                                 | 含义                                                         |
  | ------------------------------------ | ------------------------------------------------------------ |
  | document.createElement(标签名)       | 创建一个节点                                                 |
  | document.createTextNode("文本内容"); | 创建一个文本节点                                             |
  | 父.insertBefore(新标签,哪个标签之前) | 在哪个标签之前插入节点                                       |
  | 父.appendChild(新标签)               | 在父节点的里边**追加**子节点                                 |
  | cloneNode()                          | 复制节点，如果参数为true，还会复制当前节点的子孙节点，否则只复制当前节点。 |

- ##### 删除操作 

  | 名称                     | 含义                    |
  | ------------------------ | ----------------------- |
  | 父.removeChild（子标签） | 删除指定的子标签/子节点 |
  | 自己.remove()            | 删除自身                |

- ##### 修改操作 

  | 名称                             | 含义                             |
  | :------------------------------- | -------------------------------- |
  | 父.replaceChild(新标签, 旧标签); | 将父标签中的旧标签用新标签替换掉 |

#### 2.4 节点具有的属性 （查）

节点属性 

| 名称                   | 含义                                                         |
| ---------------------- | ------------------------------------------------------------ |
| childNodes             | 所有直接子节点（文本节点）                                   |
| children               | 所有元素子节点——获取所有的子标签                             |
| firstElementChild      | 第一个元素节点                                               |
| firstChild             | 第一个子节点                                                 |
| lastElementChild       | 最后一个元素节点                                             |
| lastChild              | 最后一个子节点                                               |
| parentNode             | 父节点                                                       |
| nextSibling            | 返回当前元素紧跟的下一个同级节点(包含文本/标签等)            |
| nextElementSibling     | 返回指定元素之后的下一个兄弟元素节点（相同节点树层中的下一个元素节点）。 |
| previousSibling        | 返回当前元素上一个节点紧挨着的                               |
| previousElementSibling | 返回指定元素的前一个兄弟元素（相同节点树层中的前一个元素节点） |

| value                           | 文本框的value值                      |
| ------------------------------- | ------------------------------------ |
| id                              | 标签的id属性值                       |
| name                            | 表单元素的name属性值                 |
| className                       | class属性值                          |
| innerHTML                       | 标签中的所有内容(包含标签)           |
| outerHTML                       | 包含标签本身以及标签体               |
| innerText                       | 标签中的所有文本内容(不包含标签本身) |
| getAttribute("属性名")          | 获取标签属性                         |
| setAttribute("属性名","属性值") | 为标签设置属性值                     |

修改本身就有的属性   只要能直接 . 出来  就表示  . 出来的属性都是本身就有的（系统规定的）

节点信息属性：

| 名称      | 含义                                        |
| --------- | ------------------------------------------- |
| nodeValue | 节点值 （文本节点的值）                     |
| nodeType  | 节点类型。1标签节点  2 属性节点  3 文本节点 |
| nodeName  | 节点名称                                    |

## 第三节：案例练习

#### 3.1 需求：给定一个地区数组，点击按钮将数组中的地区填充到下拉框中

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	<body>
		<button type="button" onclick="add()">点我</button>
		<select id="sec"></select>
		<script type="text/javascript">
			function add(){
				var addressArr = ['郑州','杭州','苏州','兰州','扬州','广州','福州','徐州'];
				for (var i = 0; i < addressArr.length; i++) {
					//创建
					var opEle = document.createElement("option");
					//美化
					opEle.innerText = addressArr[i];
					//添加
					sec.appendChild(opEle);
				}
			}
		</script>
	</body>
</html>
```

#### 3.2 去左边，去右边 

需求：点击添加选项按钮，把输入框中的内容添加到左侧输入框中，选中左侧输入框中的内容，点击`去右边`按钮，把选中的选项添加到右侧框中，点击`去左边`按钮同理。

![image-20220609170132977](https://gitee.com/Yawpot/cloudimages/raw/master/img/image-20220609170132977.png)



#### 3.3 图片放大  

![image-20211118114828989](https://gitee.com/Yawpot/cloudimages/raw/master/img/image-20211118114828989.png)

#### 3.4 购物车   

![1601088065455](https://gitee.com/Yawpot/cloudimages/raw/master/img/1601088065455.png)

分析：

​	1.先搭建ui  

​	2.新增

新增基操：（没有任何限定条件）

添加条件：

1.新增商品时要先判断购物车中是否为空，如果为空直接新增，否则就判断

该商品在购物车中是否存在，如果不存在就新增，如果存在就让数量++；

抛出问题：我要怎么做才能取出 购物车中的每一个商品名称？

​		可以看出 购物车中的每一个商品名称 都是所属tr的第二个子标签，那么我们可以通过 取出所有的tr,然后在去tr的第二个td子标签。	

3.+ - 按钮

4.计算总价，和数量

5.删除一行

6.全选和全不选

7.删除多行

**终极版代码**：

```javascript
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<style type="text/css">
			fieldset{
				width: 800px;
				/*text-align: center;*/
				margin: auto;
			}
			tr{
				height: 30px;
				text-align: center;
			}
			#aaaaa{
				margin-right:540px;
			}
		</style>
	</head>
	<body>
		<fieldset id="">
			<legend>购物车</legend>
			<div id="">
				商品名称:<input type="text" id="goodsName"/>
				商品单价:<input type="text" id="goodsPrice"/>
				商品数量:<input type="text" id="goodsNum"/>
				<button onclick="addgoods()">加入购物车</button>
			</div>
			<table width="800px" border="1" >
				<thead>
					<tr>
						<th>全选 <input id="chkAll" onclick="checkAll(this)" type="checkbox" /></th>
						<th>商品名称</th>
						<th>商品价格</th>
						<th>商品数量</th>
						<th>商品总价</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody id="tbody"></tbody>
			</table>
			
			<button id="aaaaa" onclick="delCheckGoods()">删除选中商品</button>
			总价：<span id="zongjia">0</span>
		</fieldset>
		<script type="text/javascript">
			/**
			 * 功能划分：
			 * 	    1.新增购物车
			 * 			① 先写普通新增
			 * 			② 有判断条件的新增
			 * 				点击添加：
			 * 					先判断购物车中是否有商品？
			 * 					怎么判断购物车中是否有商品？（判断tbody中是否有子节点）
			 * 						如果没有：直接调用添加方法
			 * 						如果有商品：
			 * 							再判断该商品在购物车中是否存在？
			 * 					                如何判断？使用商品名称判断。
			 * 					① 先取出购物车中所有的商品名称。(在添加时给该td添加一个类)
			 * 
			 * 		2.数量的加减按钮
			 * 		3.商品总价的计算
			 * 		4.删除单个商品
			 * 		5.删除选中商品
			 * 		6.全选/反选
			 * 		7.选中商品的总价计算
			 */
			//① 先写普通新增
			function add(){
				//字符串拼接法：
				var str="";
				//添加第1个td
				str += "<td><input class='check' type='checkbox' onclick='fanChk()'></td>";
				//添加第2个td
				str+= "<td class='gname'>"+goodsName.value+"</td>";
				//添加第3个td
				str+= "<td>"+goodsPrice.value+"</td>";
				//添加第4个td
				str+= "<td><button onclick='btnJia(this)'>+</button><input onblur='bbb(this)' type='number' value='"+goodsNum.value+"'/><button onclick='btnJian(this)'>-</button></td>";
				//添加第5个td
				str+="<td>" + goodsPrice.value * goodsNum.value + "</td>";
				//添加第6个td
				str+="<td><button onclick='delBtn(this)'>删除</button></td>";
				
				var tr = document.createElement("tr");
				tr.innerHTML = str;
				
				tbody.appendChild(tr);
			}
			
			//② 条件新增
			function addgoods(){
				//如果没有：直接调用添加方法
				//如果tbody中子节点的长度为0  说明没有子节点，就是说购物车为空，直接添加
				if(tbody.children.length==0){
					add();
				}else{
					/*如果有商品：
			 			再判断该商品在购物车中是否存在？
			 			如何判断？使用商品名称判断。
			 		*/
			 		var gNameArr = document.getElementsByClassName("gname");
			 		
			 		//借助第三方变量 给定一个状态
			 		var state = false;//假设没有相同商品
			 		for(var i=0;i<gNameArr.length;i++){
			 			//如果有相同商品
			 			if(gNameArr[i].innerText == goodsName.value){
			 				//如果有相同商品就让 state==true
			 				state = true;
			 				break;
			 			}
			 		}
			 		//只有当循环执行完毕后，确定没有相同的商品了，此时才可以add();
			 		if(state==true){//有相同商品
			 			//将数量相加
			 			//问题：如何拿到当前这个相同的商品在购物车中的数量呢？
			 			var tdEleArr = gNameArr[i].parentNode.children;
			 			tdEleArr[3].children[1].value = Number(tdEleArr[3].children[1].value) +Number(goodsNum.value);
			 			//计算总价
			 			tdEleArr[4].innerText = tdEleArr[3].children[1].value * goodsPrice.value;
			 		}else{
			 			//没有相同商品
			 			add();
			 		}
				}
			}
			//加号按钮
			function btnJia(btn){
				//数量++
				//btn.nextElementSibling.value++;
				//计算总价
				btn.parentNode.nextElementSibling.innerText = btn.parentNode.previousElementSibling.innerText * ++btn.nextElementSibling.value;
				jisuan();
			}
			
			//减号按钮
			function btnJian(btn){
				if(btn.previousElementSibling.value==1){
					alert("不能在减了呦！");
				}else{
					//计算总价
					btn.parentNode.nextElementSibling.innerText = btn.parentNode.previousElementSibling.innerText * --btn.previousElementSibling.value;
				}
				jisuan();
			}
			
			//删除单个商品
			function delBtn(btn){
				//删除当前点击的删除按钮的父节点的父节点 刚好就是tr
				btn.parentNode.parentNode.remove();
				jisuan();
			}
			
			//删除选中商品
			function delCheckGoods(){
				//var checkArr = document.querySelectorAll("tbody .check");
				var checkArr = document.getElementsByClassName("check");
				/*for(var i=0;i<checkArr.length;i++){
					if(checkArr[i].checked==true){
						checkArr[i].parentNode.parentNode.remove();
					}
				}*/
				for(var i=checkArr.length-1;i>0;i--){
					if(checkArr[i].checked==true){
						checkArr[i].parentNode.parentNode.remove();
					}
				}
				jisuan();
			}
			//全选/反选
			//全选：
			function checkAll(chk){
				var checkArr = document.querySelectorAll("tbody .check");
				for(var i=0;i<checkArr.length;i++){
					checkArr[i].checked = chk.checked;
				}
				
				jisuan();
			}
			
			//反选：
			/**
			 * 方法的三要素：
			 * 		事件源：给谁绑定？
			 * 		事件类型：绑定什么事件
			 * 		具体操作：执行的代码
			 * 
			 * 1.给每一个复选框绑定点击事件
			 * 2.获取购物车中所有的复选框
			 * 3.进行循环判断，看获取到的复选框中是否都是选中状态。
			 * 4.如果都是选中状态，就让全选框也变成选中状态。
			 */
			function fanChk(){
				//alert(111)
				var checkArr = document.querySelectorAll("tbody .check");
				var state = true;//假设不存在没有被选中的复选框
				for(var i=0;i<checkArr.length;i++){
					if(checkArr[i].checked == false){
						state = false;
						break;
					}
				}
				if(state==true){
					//alert(checkAll);
					//让全选框变成选中状态
					chkAll.checked = true;
				}else{
					chkAll.checked = false;
				}
				
				jisuan();
			}
			
			//封装一个计算总价的函数
			function jisuan(){
				var sum=0;
				var checkArr = document.querySelectorAll("tbody .check");
				for(var i=0;i<checkArr.length;i++){
					if(checkArr[i].checked == true){
						sum += Number(checkArr[i].parentNode.parentNode.children[4].innerText);
					}
				}
				zongjia.innerText = sum+"元";
			}
			
			//购物车中数量输入框的失去焦点事件
			function bbb(inp){
				inp.parentNode.nextElementSibling.innerText = inp.value * inp.parentNode.previousElementSibling.innerText;
				jisuan();
			}
		</script>
	</body>
</html>
```

#### 3.5 模板法

简化代码，比jQuery的DOM操作还要简单。

1.创建模板  

![1601193052203](https://gitee.com/Yawpot/cloudimages/raw/master/img/1601193052203.png)

2.读取模板，并替换模板中的内容  

![1601193226808](https://gitee.com/Yawpot/cloudimages/raw/master/img/1601193226808.png)

3.模板法购物车（新增）

### 总结:

​	节点的操作(增删改查)

​	节点的属性掌握

​	购物车的搭建（思路分析清楚）

​	模板法学会

### 作业：

1. 今天案例敲2遍

2. 购物车整好

3. 使用模板法改进购物车

   1. 使用模板法写购物车（主要新增功能）（30分钟）

      ```javascript
      <!DOCTYPE html>
      <html>
      	<head>
      		<meta charset="UTF-8">
      		<title></title>
      	</head>
      	<body>
      		<fieldset id="">
      			<legend>购物车</legend>
      			<div id="">
      				商品：<input type="text" id="proName"/>	
      				数量：<input type="text" id="proNum"/>	
      				价格：<input type="text" id="proPrice"/>
      				<button onclick="add()">新增</button>
      				<button onclick="delSomeRow()">删除多行</button>
      			</div>
      			<div>
      				<table border="1" cellspacing="" cellpadding="" width="800px">
      					<thead>
      						<tr>
      							<th>全选<input id="check" type="checkbox" onclick="checkAll(this)"></th>
      							<th>品类</th>
      							<th>价格</th>
      							<th>数量</th>
      							<th>总价</th>
      							<th>操作</th>
      						</tr>
      					</thead>
      					<tbody id="tbody" align="center">
      					</tbody>
      				</table>
      			</div>
      		</fieldset>
      		<!--定义一个模板-->
      		<script id="muban" type="text/template">
      			<!--<tr>-->
      				<td><input type="checkbox"></td>
      				<td>pinlei</td>
      				<td>jiage</td>
      				<td><button onclick="addNum(this)">+</button><input type="number" value="num1"><button>-</button></td>
      				<td>sum</td>
      				<td><button>删除</button></td>
      			<!--</tr>-->
      		</script>
      		
      		<script type="text/javascript">
      			function add(){
      				var str = muban.innerHTML.replace("pinlei",proName.value)												.replace("jiage",proPrice.value)												.replace("num1",proNum.value)									.replace("sum",proPrice.value*proNum.value);
      				var tr = document.createElement("tr");
      				tr.innerHTML = str;
      				tbody.appendChild(tr);
      			}		
      			//+ 号按钮
      			function addNum(a){
      				//点击让数量 ++
      				//this.nextElementSibling.value++;
      				//总价增加
      				a.parentNode.nextElementSibling.innerText = ++a.nextElementSibling.value * a.parentNode.previousElementSibling.innerText;		
      			}
      		</script>
      	</body>
      </html>
      
      <!--1.搭建UI页面-->
      		<fieldset id="" style="width: 800px; margin: auto;">
      			<legend>购物车</legend>
      			<div>
      				商品名称：<input type="text" id="goodsName"/> 
      				商品单价：<input type="text" id="goodsPrice"/>
      				商品数量：<input type="number" id="goodsNum"/>
      				<br/>
      				<button onclick="add()">添加购物车</button>
      				<button onclick="delCheckGoods()">删除选中商品</button>
      			</div>
      			<table border="1" cellpadding="0" width="800px">
      				<thead>
      					<tr>
      						<th>全选<input type="checkbox"/></th>
      						<th>商品名称</th>
      						<th>商品单价</th>
      						<th>商品数量</th>
      						<th>小计</th>
      						<th>操作</th>
      					</tr>
      				</thead>
      				<tbody align="center" id="tbody"></tbody>
      			</table>
      		</fieldset>
      	</body>
      	
      ```

4. 预习表单验证和正则表达式

## **效果：** 

**深入思考**   自己的学习所面临的问题。

1. 提出自己所面临的问题 ？
2. 你是如何解决这些问题的 ？ 

**总结：**

1. 知识点总结（记忆！） 

   2.  在案例中体现你记忆的各种知识点。
       - 根据需求：整理整体的思路流程。
       - 将整理的流程写出来。
       - 填空。



1. 购物车代码，无障碍敲出！
2. 自己制定复习计划，复习html和javaScript。

