# 前言

ECMAScript 6.0（以下简称 ES6）是 JavaScript 语言的下一代标准，已经在 2015 （ES2015）年 6 月正式发布了。它的目标，是使得 JavaScript 语言可以用来编写复杂的大型应用程序，成为企业级开发语言。

## 1.ECMAScript 和 JavaScript 的关系 

1996 年 11 月，JavaScript 的创造者 Netscape 公司，决定将 JavaScript 提交给标准化组织 ECMA，希望这种语言能够成为国际标准。次年，ECMA 发布 262 号标准文件（ECMA-262）的第一版，规定了浏览器脚本语言的标准，并将这种语言称为 ECMAScript，这个版本就是 1.0 版。

该标准从一开始就是针对 JavaScript 语言制定的，但是之所以不叫 JavaScript，有两个原因。一是商标，Java 是 Sun 公司的商标，根据授权协议，只有 Netscape 公司可以合法地使用 JavaScript 这个名字，且 JavaScript 本身也已经被 Netscape 公司注册为商标。二是想体现这门语言的制定者是 ECMA，不是 Netscape，这样有利于保证这门语言的开放性和中立性。

因此，ECMAScript 和 JavaScript 的关系是，前者是后者的规格，后者是前者的一种实现（另外的 ECMAScript 方言还有 JScript 和 ActionScript）。日常场合，这两个词是可以互换的。

## 2.ECMAScript 的历史 

- ES6 从开始制定到最后发布，整整用了 15 年
- 2000 年，ECMAScript 4.0 开始酝酿
- 2007 年 10 月，ECMAScript 4.0 版草案发布
- 2009 年 12 月，ECMAScript 5.0 版正式发布
- 2011 年 6 月，ECMAScript 5.1 版发布，并且成为 ISO 国际标准（ISO/IEC 16262:2011）。
- 2013 年 3 月，ECMAScript 6 草案冻结，不再添加新功能。新的功能设想将被放到 ECMAScript 7。
- 2013 年 12 月，ECMAScript 6 草案发布。然后是 12 个月的讨论期，听取各方反馈。
- 2015 年 6 月，ECMAScript 6 正式通过，成为国际标准。从 2000 年算起，这时已经过去了 15 年。
- 目前，各大浏览器对 ES6 的支持可以查看[kangax.github.io/compat-table/es6/](https://kangax.github.io/compat-table/es6/)。

## 3.Babel 转码器 

[Babel](https://babeljs.io/) 是一个广泛使用的 ES6 转码器，可以将 ES6 代码转为 ES5 代码，从而在老版本的浏览器执行。这意味着，你可以用 ES6 的方式编写程序，又不用担心现有环境是否支持。下面是一个例子。（知道就行，后面webpack课程会讲到）

```js
// 转码前 es6 箭头函数
input.map(item => item + 1);

// 转码后 es5
input.map(function (item) {
  return item + 1;
});
```

# 第一章：let & const & 解构赋值

## 一、let 命令

### 1.1 基本用法

变量作用域：

​		ES5: 全局作用域，函数作用域  

​		ES6: 块级 作用域  {}

ES6 新增了`let`命令，用来声明变量。它的用法类似于`var`，但是所声明的变量，只在`let`命令所在的代码块（｛｝）内有效。

```javascript
{
  let a = 10;
  var b = 1;
}

a // ReferenceError: a is not defined.
b // 1
```

上面代码在代码块之中，分别用`let`和`var`声明了两个变量。然后在代码块之外调用这两个变量，结果`let`声明的变量报错，`var`声明的变量返回了正确的值。这表明，`let`声明的变量只在它所在的代码块有效。

`for`循环的计数器，就很合适使用`let`命令。

```javascript
for (let i = 0; i < 10; i++) {
  // ...
}

console.log(i);
// ReferenceError: i is not defined
```

上面代码中，计数器`i`只在`for`循环体内有效，在循环体外引用就会报错。

下面的代码如果使用`var`，最后输出的是`10`。

```javascript
for(var i=0;i<10;i++){}
console.log(i); //10

var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10
```

上面代码中，变量`i`是`var`命令声明的，在全局范围内都有效，所以全局只有一个变量`i`。每一次循环，变量`i`的值都会发生改变，而循环内被赋给数组`a`的函数内部的`console.log(i)`，里面的`i`指向的就是全局的`i`。也就是说，所有数组`a`的成员里面的`i`，指向的都是同一个`i`，导致运行时输出的是最后一轮的`i`的值，也就是 10。

如果使用`let`，声明的变量仅在块级作用域内有效，最后输出的是 6。

```javascript
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6
```

上面代码中，变量`i`是`let`声明的，当前的`i`只在本轮循环有效，所以每一次循环的`i`其实都是一个新的变量，所以最后输出的是`6`。你可能会问，如果每一轮循环的变量`i`都是重新声明的，那它怎么知道上一轮循环的值，从而计算出本轮循环的值？这是因为 JavaScript 引擎内部会记住上一轮循环的值，初始化本轮的变量`i`时，就在上一轮循环的基础上进行计算。

另外，`for`循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。(作用域相互独立)

```javascript
for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);
}
// abc
// abc
// abc
```

上面代码正确运行，输出了 3 次`abc`。这表明函数内部的变量`i`与循环变量`i`不在同一个作用域，有各自单独的作用域。

### 1.2 不存在变量提升

`var`命令会发生“变量提升”现象，即变量可以在声明之前使用，值为`undefined`。这种现象多多少少是有些奇怪的，按照一般的逻辑，变量应该在声明语句之后才可以使用。

为了纠正这种现象，`let`命令改变了语法行为，它所声明的变量一定要在声明后使用，否则报错。

```javascript
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;
```

上面代码中，变量`foo`用`var`命令声明，会发生变量提升，即脚本开始运行时，变量`foo`已经存在了，但是没有值，所以会输出`undefined`。变量`bar`用`let`命令声明，不会发生变量提升。这表示在声明它之前，变量`bar`是不存在的，这时如果用到它，就会抛出一个错误。

### 1.3 暂时性死区

只要块级作用域内存在`let`命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。

```javascript
var tmp = 123;

if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}
```

上面代码中，存在全局变量`tmp`，但是块级作用域内`let`又声明了一个局部变量`tmp`，导致后者绑定这个块级作用域，所以在`let`声明变量前，对`tmp`赋值会报错。

ES6 明确规定，如果区块中存在`let`和`const`命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。

总之，在代码块内，使用`let`命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。

```javascript
if (true) {
  // TDZ开始
  tmp = 'abc'; // ReferenceError
  console.log(tmp); // ReferenceError

  let tmp; // TDZ结束
  console.log(tmp); // undefined

  tmp = 123;
  console.log(tmp); // 123
}
```

上面代码中，在`let`命令声明变量`tmp`之前，都属于变量`tmp`的“死区”。

“暂时性死区”也意味着`typeof`不再是一个百分之百安全的操作。

```javascript
{
    console.log(typeof x);//如果下边不声明 x  就可以使用  使用let声明 后 就报错
            
    let x;
}
```

上面代码中，变量`x`使用`let`命令声明，所以在声明之前，都属于`x`的“死区”，只要用到该变量就会报错。因此，`typeof`运行时就会抛出一个`ReferenceError`。

作为比较，如果一个变量根本没有被声明，使用`typeof`反而不会报错。

```javascript
 console.log(typeof a);// "undefined"
 var a = 10; 
```

上面代码中，typeof a 结果返回“undefined”。所以，在没有`let`之前，`typeof`运算符是百分之百安全的，永远不会报错。现在这一点不成立了。**这样的设计是为了让大家养成良好的编程习惯，变量一定要在声明之后使用，否则就报错。**

有些“死区”比较隐蔽，不太容易发现。

```javascript
//函数参数默认值的写法
function bar(x = y, y = 2) {
  return [x, y];
}

bar(); // 报错
```

上面代码中，调用`bar`函数之所以报错（某些实现可能不报错），是因为参数`x`默认值等于另一个参数`y`，而此时`y`还没有声明，属于“死区”。如果`y`的默认值是`x`，就不会报错，因为此时`x`已经声明了。

```javascript
function bar(x = 2, y = x) {
  return [x, y];
}
bar(); // [2, 2]
```

另外，下面的代码也会报错，与`var`的行为不同。

```javascript
// 不报错
var x = x;

// 报错
let x = x;
// ReferenceError: x is not defined
```

上面代码报错，也是因为暂时性死区。使用`let`声明变量时，只要变量在还没有声明完成前使用，就会报错。上面这行就属于这个情况，在变量`x`的声明语句还没有执行完成前，就去取`x`的值，导致报错”x 未定义“。

ES6 规定暂时性死区和`let`、`const`语句不出现变量提升，主要是为了减少运行时错误，防止在变量声明前就使用这个变量，从而导致意料之外的行为。这样的错误在 ES5 是很常见的，现在有了这种规定，避免此类错误就很容易了。

总之，暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。

### 1.4 不允许重复声明

`let`不允许在相同作用域内，重复声明同一个变量。

```javascript
// 报错
function func() {
  let a = 10;
  var a = 1;
}

// 报错
function func() {
  let a = 10;
  let a = 1;
}
```

因此，不能在函数内部重新声明参数。

```javascript
function func(arg) {
  let arg;
}
func() // 报错

function func(arg) {
  {
    let arg;
  }
}
func() // 不报错
```

### 1.5 块级作用域

#### 1.5.1 为什么需要块级作用域？

ES5 只有全局作用域和函数作用域，没有块级作用域，这带来很多不合理的场景。

第一种场景，内层变量可能会覆盖外层变量。

```javascript
var tmp = new Date();

function f() {
  console.log(tmp);
  if (false) {
    var tmp = 'hello world';
  }
}

f(); // undefined
```

上面代码的原意是，`if`代码块的外部使用外层的`tmp`变量，内部使用内层的`tmp`变量。但是，函数`f`执行后，输出结果为`undefined`，原因在于变量提升，导致内层的`tmp`变量覆盖了外层的`tmp`变量。

**第二种场景，用来计数的循环变量泄露为全局变量。**  

```javascript
var s = 'hello';
var i;
for (i = 0; i < s.length; i++) {
  console.log(s[i]);
}

console.log(i); // 5
```

上面代码中，变量`i`只用来控制循环，但是循环结束后，它并没有消失，泄露成了全局变量。

#### 1.5.2 ES6 的块级作用域

`let`实际上为 JavaScript 新增了块级作用域。

```javascript
function f1() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n); // 5
}
```

上面的函数有两个代码块，都声明了变量`n`，运行后输出 5。这表示外层代码块不受内层代码块的影响。如果两次都使用`var`定义变量`n`，最后输出的值才是 10。

ES6 允许块级作用域的任意嵌套。

```javascript
{{{{
  {let insane = 'Hello World'}
  console.log(insane); // 报错
}}}};
```

上面代码使用了一个五层的块级作用域，每一层都是一个单独的作用域。第四层作用域无法读取第五层作用域的内部变量。

内层作用域可以定义外层作用域的同名变量。

```javascript
{{{{
  let insane = 'Hello World';
  {let insane = 'Hello World'}
}}}};
```

块级作用域的出现，实际上使得获得广泛应用的匿名立即执行函数表达式（匿名 IIFE）不再必要了。

```javascript
// IIFE 写法
;(function () {
  var tmp = ...;
  ...
}());
IIFE的好处：
1.避免作用域命名污染
2.提升性能（减少了对作用域的查找）
3.避免全局命名冲突
4.保存闭包状态

// 块级作用域写法
{
  let tmp = ...;
  ...
}
  
  同理案例：
  	页面三个按钮  点击 弹出点的是 第几个按钮？
    	之前：两种方式解决：1.自执行函数  2.自定义属性绑定到 固定的按钮上。
        现在：只需使用let声明变量就可以了  替换var
```

#### 1.5.3 块级作用域与函数声明

函数能不能在块级作用域之中声明？这是一个相当令人混淆的问题。

ES5 规定，函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明。

```javascript
// 情况一
if (true) {
  function f() {}
}

// 情况二
try {
  function f() {}
} catch(e) {
  // ...
}
```

上面两种函数声明，根据 ES5 的规定都是非法的。

但是，浏览器没有遵守这个规定，为了兼容以前的旧代码，还是支持在块级作用域之中声明函数，因此上面两种情况实际都能运行，不会报错。

ES6 引入了块级作用域，明确允许在块级作用域之中声明函数。ES6 规定，块级作用域之中，函数声明语句的行为类似于`let`，在块级作用域之外不可引用。

```javascript
function f() { console.log('I am outside!'); }

(function () {
  if (false) {
    // 重复声明一次函数f
    function f() { console.log('I am inside!'); }
  }

  f();
}());
```

上面代码在 ES5 中运行，会得到“I am inside!”，因为在`if`内声明的函数`f`会被提升到函数头部，实际运行的代码如下。

```javascript
// ES5 环境
function f() { console.log('I am outside!'); }

(function () {
  function f() { console.log('I am inside!'); }
  if (false) {
      
  }
  f();
}());
```

ES6 就完全不一样了，理论上会得到“I am outside!”。因为块级作用域内声明的函数类似于`let`，对作用域之外没有影响。但是，如果你真的在 ES6 浏览器中运行一下上面的代码，是会报错的，这是为什么呢？

```javascript
// 浏览器的 ES6 环境
function f() { console.log('I am outside!'); }

(function () {
  if (false) {
    // 重复声明一次函数f
    function f() { console.log('I am inside!'); }
  }

  f();
}());
// Uncaught TypeError: f is not a function
```

上面的代码在 ES6 浏览器中，都会报错。

原来，如果改变了块级作用域内声明的函数的处理规则，显然会对老代码产生很大影响。为了减轻因此产生的不兼容问题，ES6 在[附录 B](http://www.ecma-international.org/ecma-262/6.0/index.html#sec-block-level-function-declarations-web-legacy-compatibility-semantics)里面规定，浏览器的实现可以不遵守上面的规定，有自己的[行为方式](http://stackoverflow.com/questions/31419897/what-are-the-precise-semantics-of-block-level-functions-in-es6)。

- 允许在块级作用域内声明函数。
- 函数声明类似于`var`，即会提升到全局作用域或函数作用域的头部。
- 同时，函数声明还会提升到所在的块级作用域的头部。

注意，上面三条规则只对 ES6 的浏览器实现有效，其他环境的实现不用遵守，还是将块级作用域的函数声明当作`let`处理。

根据这三条规则，浏览器的 ES6 环境中，块级作用域内声明的函数，行为类似于`var`声明的变量。上面的例子实际运行的代码如下。

```javascript
// 浏览器的 ES6 环境
function f() { console.log('I am outside!'); }
(function () {
  var f = undefined;
    var a = undefined;
  if (false) {
      a = 5;
    function f() { console.log('I am inside!'); }
  }

  f();
}());
// Uncaught TypeError: f is not a function
```

考虑到环境导致的行为差异太大，应该避免在块级作用域内声明函数。如果确实需要，也应该写成函数表达式，而不是函数声明语句。

```javascript
// 块级作用域内部的函数声明语句，建议不要使用
{
  let a = 'secret';
  function f() {
    return a;
  }
}

// 块级作用域内部，优先使用函数表达式
{
  let a = 'secret';
  let f = function () {
    return a;
  };
}
```

另外，还有一个需要注意的地方。ES6 的块级作用域必须有大括号，如果没有大括号，JavaScript 引擎就认为不存在块级作用域。

```javascript
// 第一种写法，报错 
if (true) let x = 1;

// 第二种写法，不报错
if (true) {
  let x = 1;
}
```

上面代码中，第一种写法没有大括号，所以不存在块级作用域，而`let`只能出现在当前作用域的顶层，所以报错。第二种写法有大括号，所以块级作用域成立。

## 二、const 命令  

### 2.1 基本用法  

变量    常量

`const`声明一个只读的常量。一旦声明，常量的值就不能改变。

```javascript
const PI = 3.1415;
PI // 3.1415

PI = 3;
// TypeError: Assignment to constant variable.
```

上面代码表明改变常量的值会报错。

`const`声明的变量不得改变值，这意味着，`const`一旦声明变量，**就必须立即初始化**，不能留到以后赋值。

```javascript
const foo;
// SyntaxError: Missing initializer in const declaration
```

上面代码表示，对于`const`来说，只声明不赋值，就会报错。

`const`的作用域与`let`命令相同：只在声明所在的块级作用域内有效。

```javascript
if (true) {
  const MAX = 5;
}

MAX // Uncaught ReferenceError: MAX is not defined
```

`const`**命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用**。

```javascript
if (true) {
  console.log(MAX); // ReferenceError
  const MAX = 5;
}
```

上面代码在常量`MAX`声明之前就调用，结果报错。

`const`声明的常量，也与`let`一样**不可重复声明**。

```javascript
var message = "Hello!";
let age = 25;

// 以下两行都会报错
const message = "Goodbye!";
const age = 30;
```

### 2.2 本质

`const`实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，`const`只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了。因此，将一个对象声明为常量必须非常小心。

```javascript
const foo = {};

// 为 foo 添加一个属性，可以成功
foo.prop = 123;
foo.prop // 123

// 将 foo 指向另一个对象，就会报错
foo = {}; // TypeError: "foo" is read-only

```

上面代码中，常量`foo`储存的是一个地址，这个地址指向一个对象。不可变的只是这个地址，即不能把`foo`指向另一个地址，但对象本身是可变的，所以依然可以为其添加新属性。

下面是另一个例子。

```javascript
const a = [];
a.push('Hello'); // 可执行
a.length = 0;    // 可执行
a = ['Dave'];    // 报错
```

上面代码中，常量`a`是一个数组，这个数组本身是可写的，但是如果将另一个数组赋值给`a`，就会报错。

如果真的想将对象冻结，应该使用`Object.freeze`方法。

```javascript
const foo = Object.freeze({});

// 常规模式时，下面一行不起作用；
// 严格模式时，该行会报错
foo.prop = 123;
```

上面代码中，常量`foo`指向一个冻结的对象，所以添加新属性不起作用，[严格模式](https://www.runoob.com/js/js-strict.html)时还会报错。

除了将对象本身冻结，对象的属性也应该冻结。下面是一个将对象彻底冻结的函数。

```javascript
var constantize = function(obj){
  Object.freeze(obj);
    //Object.values();
  Object.keys(obj).forEach( (key, i) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};
```

## ES6 声明变量的六种方法

ES5 只有两种声明变量的方法：`var`命令和`function`命令。ES6 除了添加`let`和`const`命令，后面章节还会提到，另外两种声明变量的方法：`import`命令和`class`命令。所以，ES6 一共有 6 种声明变量的方法。

## 三、顶层对象的属性

### 3.1 顶层对象

顶层对象，在浏览器环境指的是`window`对象，在 Node 指的是`global`对象。ES5 之中，顶层对象的属性与全局变量是等价的。

```javascript
window.a = 1;
a // 1

a = 2;
window.a // 2
```

上面代码中，顶层对象的属性赋值与全局变量的赋值，是同一件事。

顶层对象的属性与全局变量挂钩，被认为是 JavaScript 语言最大的设计败笔之一。这样的设计带来了几个很大的问题，首先是没法在编译时就报出变量未声明的错误，只有运行时才能知道（因为全局变量可能是顶层对象的属性创造的，而属性的创造是动态的）；其次，程序员很容易不知不觉地就创建了全局变量（比如打字出错）；最后，顶层对象的属性是到处可以读写的，这非常不利于模块化编程。另一方面，`window` 对象有实体含义，指的是浏览器的窗口对象，顶层对象是一个有实体含义的对象，也是不合适的。

ES6 为了改变这一点，一方面规定，为了保持兼容性，`var`命令和`function`命令声明的全局变量，依旧是顶层对象的属性；另一方面规定，`let`命令、`const`命令、`class`命令声明的全局变量，不属于顶层对象的属性。也就是说，从 ES6 开始，全局变量将逐步与顶层对象的属性脱钩。

```javascript
var a = 1;
// 如果在 Node 的 REPL 环境，可以写成 global.a
// 或者采用通用方法，写成 this.a
window.a // 1

let b = 1;
window.b // undefined
```

上面代码中，全局变量`a`由`var`命令声明，所以它是顶层对象的属性；全局变量`b`由`let`命令声明，所以它不是顶层对象的属性，返回`undefined`。

### 3.2 globalThis 对象

JavaScript 语言存在一个顶层对象，它提供全局环境（即全局作用域），所有代码都是在这个环境中运行。但是，顶层对象在各种实现里面是不统一的。

- 浏览器里面，顶层对象是`window`，但 Node 和 Web Worker 没有`window`。
- 浏览器和 Web Worker 里面，`self`也指向顶层对象，但是 Node 没有`self`。
- Node 里面，顶层对象是`global`，但其他环境都不支持。

同一段代码为了能够在各种环境，都能取到顶层对象，现在一般是使用`this`变量，但是有局限性。

- 全局环境中，`this`会返回顶层对象。但是，Node.js 模块中`this`返回的是当前模块，ES6 模块中`this`返回的是`undefined`。
- 函数里面的`this`，如果函数不是作为对象的方法运行，而是单纯作为函数运行，`this`会指向顶层对象。但是，严格模式下，这时`this`会返回`undefined`。
- 不管是严格模式，还是普通模式，`new Function('return this')()`，总是会返回全局对象。但是，如果浏览器用了 CSP（Content Security Policy，内容安全策略），那么`eval`、`new Function`这些方法都可能无法使用。

综上所述，很难找到一种方法，可以在所有情况下，都取到顶层对象。

[ES2020](https://github.com/tc39/proposal-global) 在语言标准的层面，引入`globalThis`作为顶层对象。也就是说，任何环境下，`globalThis`都是存在的，都可以从它拿到顶层对象，指向全局环境下的`this`。 

```js
//demo.js

//浏览器环境：
console.log(globalThis); //window
//node环境
console.log(globalThis); //global
```

## 四、变量的解构赋值

### 4.1 概述

解构赋值是对赋值运算符的扩展。他是一种针对**数组或者对象**进行模式匹配，然后对其中的变量进行赋值。在代码书写上简洁且易读，语义更加清晰明了；也方便了复杂对象中数据字段获取。

1. 数组的解构赋值
2. 对象的解构赋值
3. 字符串的解构赋值
4. 函数参数的解构赋值
5. 圆括号问题
6. 用途

### 4.2 数组的解构赋值

#### 4.2.1 基本用法

ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。以前，为变量赋值，只能直接指定值。

```js
let a = 1;
let b = 2;
let c = 3;
```

ES6 允许写成下面这样。

```javascript
let [a, b, c] = [1, 2, 3];
数组解构赋值：就是等号左右两边按照位置对应关系，从数组中提取值，对变量进行赋值的操作。
本质上，这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。
```

案例分析：

```js
let [foo, [[bar], baz]] = [1, [[2], 3]];
foo // 1
bar // 2
baz // 3

let [ , , third] = ["foo", "bar", "baz"];
third // "baz"

let [x, , y] = [1, 2, 3];
x // 1
y // 3
```

如果解构不成功，变量的值就等于`undefined`。

```js
let [foo] = [];
let [bar, foo] = [1];
```

不完全解构，即等号左边的模式，只匹配一部分的等号右边的数组。这种情况下，解构依然可以成功。

```js
let [x, y] = [1, 2, 3];
x // 1
y // 2

let [a, [b], d] = [1, [2, 3], 4];
a // 1
b // 2
d // 4
```

如果等号的右边不是数组（或者严格地说，不是可遍历的结构），那么将会报错。

```js
// 报错
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};

Iterator  迭代器 接口：是一个遍历器对象，为各种不同的数据结构提供统一的访问机制
原生具备 Iterator 接口的数据结构如下。
Array
Map
Set
String
TypedArray
函数的 arguments 对象
NodeList 对象 
```

#### 4.2.2 默认值

- 解构赋值允许指定默认值。

- ```js
  let [foo = true] = [];
  foo // true
  
  let [x, y = 'b'] = ['a']; // x='a', y='b'
  let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'
  ```

- 注意，ES6 内部使用严格相等运算符（`===`），判断一个位置是否有值。所以，只有当一个数组成员严格等于`undefined`，默认值才会生效。

- ```js
  let [x = 1] = [undefined];
  x // 1
  
  let [x = 1] = [null];
  x // null
  ```

- 如果默认值是一个表达式，那么这个表达式是**惰性求值**的，即只有在用到的时候，才会求值。

- ```js
  function f() {
    console.log('aaa');
  }
  
  let [x = f()] = [1];
  ```

#### 4.2.3 三点运算符

```js
符号：...
根据用法：又可称之为
1.展开运算符
//把a数组中的数据，展开，放入到arr中，就可以使用 ... 运算符
let a = [1,2,3,4,5,6];
let arr = ['aa','bb','cc',...a]
arr //['aa','bb','cc',1,2,3,4,5,6]

2.剩余运算符
//按照数组位置对应关系，进行赋值，把剩余的数据，打包以数组形式，赋值给d
let [a,b,c,...d] = [1,2,3,4,5,6,7,8,9,10];
a //1
b //2
c //3
d //[4,5,6,7,8,9,10]
```



### 4.3 对象的解构赋值

#### 4.3.1 基本用法 

解构不仅可以用于数组，还可以用于对象。对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

数组的解构是按照位置对应关系赋值，对象的解构赋值是按照键值对的对应关系进行赋值

```js
let {name:myname,age:myage,sex:mysex} = {name:'lisi',age:25}
myname //lisi
myage //25
mysex //undefined
```

对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量。

```js
let {log:log,dir:dir} = console;
//把console对象的方法log（控制台输出信息） /dir(展示一个对象下的所有的属性和方法)  通过解构赋值给 log 和dir变量
console.log('xxx'); 等价于  log('xxx');
console.dir(window); 等价于  dir(window);

let ? = Math;  ?部分怎么写  
```

对象的解构赋值可以是下面形式的简写（参见[《对象的扩展》](https://es6.ruanyifeng.com/#docs/object)一章）

```js
let { foo: foo, bar: bar } = { foo: 'aaa', bar: 'bbb' };
当key==value时 可以只写一个
let { foo, bar } = { foo: 'aaa', bar: 'bbb' };
```

与数组一样，解构也可以用于嵌套结构的对象

```js
let obj = {
    list:['aa','bb','cc'],
    hobby:{
        ball:['篮球','足球','乒乓球'],
        fruits:['榴莲','百香果','杨桃']
    }
}

let {list,hobby,list:[a,b,c]} = obj
list //['aa','bb','cc']
hobby //{ball:['篮球','足球','乒乓球'],fruits:['榴莲','百香果','杨桃']}
a //aa
b //bb
c // cc
```

#### 4.3.2 默认值

对象的解构也可以指定默认值,默认值生效的条件是，对象的属性值严格等于`undefined`。

```js
let {x,y=20} = {x:10}
x//10
y//20

var {x = 3} = {};
x // 3

var {x, y = 5} = {x: 1};
x // 1
y // 5

var {x = 3} = {x: undefined};
x // 3

var {x = 3} = {x: null};
x // null
```

#### 4.3.4 注意点

（1）如果要将一个已经声明的变量用于解构赋值，必须非常小心。

```javascript
// 错误的写法
let x;
{x} = {x: 1};
// SyntaxError: syntax error

//right
let {x} = {x:1}
```

上面代码的写法会报错，因为 JavaScript 引擎会将`{x}`理解成一个代码块，从而发生语法错误。只有不将大括号写在行首，避免 JavaScript 将其解释为代码块，才能解决这个问题。

```javascript
// 正确的写法
let x;
({x} = {x: 1});


let x;
....
....
....
({x} = obj);
```

上面代码将整个解构赋值语句，放在一个圆括号里面，就可以正确执行。关于圆括号与解构赋值的关系，参见下文。

（2）解构赋值允许等号左边的模式之中，不放置任何变量名。因此，可以写出非常古怪的赋值表达式。

```javascript
({} = [true, false]);
({} = 'abc');
({} = []);
```

上面的表达式虽然毫无意义，但是语法是合法的，可以执行。

（3）由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构。

```javascript
let arr = [1, 2, 3];   等价于 let arr = {0:1, 1:2, 2:3}
let {0 : first, [arr.length - 1] : last} = arr;
first // 1
last // 3

//[1,2,3] === {0:1,1:2,2:3}
        let {0:a,1:b,2:c} = [1,2,3];
        console.log(a,b,c);
```

上面代码对数组进行对象解构。数组`arr`的`0`键对应的值是`1`，`[arr.length - 1]`就是`2`键，对应的值是`3`。方括号这种写法，属于“属性名表达式”（参见《对象的扩展》一章）。

### 4.4 字符串的解构赋值 

字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。

```javascript
const [a, b, c, d, e] = 'hello';     'hello' == ['h','e','l','l','0']
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
```

类似数组的对象都有一个`length`属性，因此还可以对这个属性解构赋值。

```javascript
let {length : len} = 'hello';
len // 5

//解析 'hello'
let hello = {
    length:5
}
let {length:len} = hello;
```

### 4.5 函数参数的解构赋值

函数的参数也可以使用解构赋值。

```javascript
function add([x, y]){
  return x + y;
}
[x,y] = [1,2]
add([1, 2]); // 3

[[1, 2], [3, 4]].map(([a, b]) => a + b);
// [ 3, 7 ]
等价写法？

函数参数的解构也可以使用默认值。
function add([x, y=10]){
  return x + y;
}
add([1]); // 11

function move({x = 0, y = 0} = {}) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]

```

### 4.6 圆括号问题

解构赋值虽然很方便，但是解析起来并不容易。对于编译器来说，一个式子到底是模式，还是表达式，没有办法从一开始就知道，必须解析到（或解析不到）等号才能知道。

由此带来的问题是，如果模式中出现圆括号怎么处理。**ES6 的规则是，只要有可能导致解构的歧义，就不得使用圆括号。**

但是，这条规则实际上不那么容易辨别，处理起来相当麻烦。因此，建议只要有可能，就不要在模式中放置圆括号。

```js
let {(x)} = {x:1}
```



### 4.7 用途

变量的解构赋值用途很多。

#### **（1）交换变量的值**

```javascript
let x = 1;
let y = 2;

[x, y] = [y, x];
```

上面代码交换变量`x`和`y`的值，这样的写法不仅简洁，而且易读，语义非常清晰。

#### **（2）从函数返回多个值**

函数能返回一个值，如果要返回多个值，只能将它们放在数组或对象里返回。有了解构赋值，取出这些值就非常方便。

```javascript
// 返回一个数组

function example() {
  return [1, 2, 3];
}
let [a, b, c] = example();
log(a,b,c)
// 返回一个对象

function example() {
  return {
    foo: 1,
    bar: 2
  };
}
let { foo, bar } = example();
```

#### **（3）函数参数的定义**

解构赋值可以方便地将一组参数与变量名对应起来。

```javascript
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3]);

// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});
```

#### **（4）提取 JSON 数据** 

解构赋值对提取 JSON 对象中的数据，尤其有用。

```javascript
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};

let { id, status, data: number } = jsonData;

console.log(id, status, number);
// 42, "OK", [867, 5309]
```

上面代码可以快速提取 JSON 数据的值。

#### **（5）函数参数的默认值**

```javascript
jQuery.ajax = function (url, {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // ... more config
} = {}) {
  // ... do stuff
};
```

指定参数的默认值，就避免了在函数体内部再写`var foo = config.foo || 'default foo';`这样的语句。

#### **（6）遍历 Map 结构**

任何部署了 Iterator 接口的对象，都可以用`for...of`循环遍历。Map 结构原生支持 Iterator 接口，配合变量的解构赋值，获取键名和键值就非常方便。

```javascript
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world
```

如果只想获取键名，或者只想获取键值，可以写成下面这样。

```javascript
// 获取键名
for (let [key] of map) {
  // ...
}

// 获取键值
for (let [,value] of map) {
  // ...
}
```

#### **（7）输入模块的指定方法**

加载模块时，往往需要指定输入哪些方法。解构赋值使得输入语句非常清晰。

```javascript
const { SourceMapConsumer, SourceNode } = require("source-map");
//加载进来的也是一个对象，本质，就是对象的解构赋值
```

## 五、总结与作业

总结今日的知识点。