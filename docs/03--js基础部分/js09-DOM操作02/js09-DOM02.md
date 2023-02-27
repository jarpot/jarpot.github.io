# 第九章：DOM编程02

## 课前测试 15分钟：

默写 DOM操作的 增删改查中包括的方法(方法的参数含义 和方法的作用)和属性。

学习：

​		1.当天的基础知识点有没有记住？背住？

​		2.当天的课堂案例有没有全部搞懂？

​		3.今天的内容，我会了吗？

周末：做一波复习！！！

每个人给自己做总结！！！

对象：属性  方法

​		对象名.属性名/ 对象名[属性名]       对象名.方法名()

## 回顾：

方法：

​		增： createElement("标签名") 

​				createTextNode("文本内容");

​				父.appendChild();

​				父.insertBefore(  新 ,旧 );

​				cloneNode(true/false);

​		改：

​				父.replaceChild(新,旧);

​		删：

​				自己.remove();

​				父.removeChild(子);

​		setAttrbiute   get....

​		查：

​				1.getElementById()   getElementsByClassName   ByName  ByTagName      querySelector   All

​				2.节点属性

​							childNodes  

​							children

​							firstChild  ElementChild 

​							lastChild  ........

​							nextElementSibling   

​							previousElementSibling

​							parentNode

​							

​							id   name  class   value     innerText   innerHTML   outerHTML   outerText   

​							

​							nodeType  1 2 3     nodeName   nodeValue 

## 本章目标 

理解文档对象模型

熟练掌握document对象访问页面元素

熟练掌握动态添加页面元素

通过DOM操作html页面中的标签，属性，样式等。

元素的位置属性

## 一、js操作css样式：

```
1.通过样式直接去获取属性值，或者设置值操作 
	DOM对象.style.属性名  <p style="color:red;...">
	element.style 既支持读也支持写 读取的只是元素的内联样式，即写在元素的 style 属性上的样式
2.getComputedStyle() 用法
	document.defaultView.getComputedStyle(element[,pseudo-element]);  
	或者
	window.getComputedStyle(element[,pseudo-element]);
	有两个参数，元素和伪类。第二个参数不是必须的，当不查询伪类元素的时候可以忽略或者传入 null
	
getComputedStyle 是通过 document.defaultView 对象来调用的。 大部分情况下，这是不需要的， 因为可以直接通过 window 对象调用。但有一种情况，你必需要使用 defaultView, 那是在 Firefox 3.6 上访问子框架内的样式 (iframe)。
而且除了在 IE8 浏览器中 document.defaultView === window 返回的是 false 外，其他的浏览器（包括 IE9 ）返回的都是 true。所以后面直接使用 window 就好，不用在输入那么长的代码了。	

	getComputedStyle 仅支持读并不支持写入。我们可以通过使用 getComputedStyle 读取样式，通过 element.style 修改样式

3.兼容性
关于 getComputedStyle 的兼容性问题，在 Chrome 和 Firefox 是支持该属性的，同时 IE 9 10 11 也是支持相同的特性的，IE 8并不支持这个特性。 IE 8 支持的是 element.currentStyle 这个属性，这个属性返回的值和 getComputedStyle 的返回基本一致，只是在 float 的支持上，IE 8 支持的是 styleFloat,其余都是 cssFloat。这点需要注意。
```

```
//兼容性写法 
			if(pEle.currentStyle){
				console.log(pEle.currentStyle.height+"IE8");
				console.log(pEle.currentStyle.styleFloat+"IE8");
			}else{
				console.log(document.defaultView.getComputedStyle(pEle,null).height+"普通");
				console.log(document.defaultView.getComputedStyle(pEle,null).cssFloat+"普通");
			}
```

## 二、DOM对象常用方法和属性2 

HTML中元素位置属性

| **属性**         | **说明**                                                     |
| ---------------- | ------------------------------------------------------------ |
| **offsetLeft**   | **返回当前元素左边界到它定位的上级元素（offsetParent节点）的左边界的距离，只读属性** |
| **offsetTop**    | **返回当前元素上边界到它上级元素（offsetParent节点）的上边界的距离，只读属性** |
| **offsetHeight** | **返回元素的高度,包含边框，只读属性**                        |
| **offsetWidth**  | **返回元素的宽度，包含边框，只读属性**                       |
| **offsetParent** | **返回元素的偏移容器，即当前容器偏移对应的父容器**           |
| **scrollTop**    | **返回匹配元素的滚动条的垂直位置**                           |
| **scrollLeft**   | **返回匹配元素的滚动条的水平位置**                           |
| **clientWidth**  | **返回元素的可见宽度 不包含边框**                            |
| **clientHeight** | **返回元素的可见高度 不包含边框**                            |

元素属性应用：

兼容写法：

```
var sTop=document.documentElement.scrollTop||document.body.scrollTop;
```

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>元素位置属性</title>

    <style>
        div {
            width: 300px;
            height: 1300px;
            border: 3px solid brown;
            background-color: rgb(131, 248, 223);
        }
    </style>
</head>

<body>
    <div></div>
</body>

</html>

<script>
    var div_ = document.getElementsByTagName('div')[0];

    // offsetLeft 	返回当前元素左边界到它上级元素的左边界的距离，只读属性
    console.log(' offsetLeft:' + div_.offsetLeft);
    // offsetTop	返回当前元素上边界到它上级元素的上边界的距离，只读属性
    console.log(' offsetTop:' + div_.offsetTop);
    // offsetHeight	返回元素的高度
    console.log(' offsetHeight:' + div_.offsetHeight);
    // offsetWidth	返回元素的宽度
    console.log(' offsetWidth:' + div_.offsetWidth)
    // offsetParent	返回元素的偏移容器，即对最近的动态定位的包含元素的引用
    console.log(' offsetParent:' + div_.offsetParent);

    // clientWidth	返回元素的可见宽度
    console.log(' clientWidth:' + div_.clientWidth);
    // clientHeight	返回元素的可见高度
    console.log(' clientWidth:' + div_.clientHeight);


    // scrollTop	返回匹配元素的滚动条的垂直位置
    // scrollLeft	返回匹配元素的滚动条的水平位置


    // 查看scrollTop、left距离  
    window.onscroll = function () {
        console.log(' scroollTop:' + document.documentElement.scrollTop);
        console.log(' scroollLeft:' + div_.scrollLeft);
    }

</script>
```

## 三、案例练习 

如何实现广告图片在固定位置不动？ 

![image-20210616093532548](assets/image-20210616093532548.png)