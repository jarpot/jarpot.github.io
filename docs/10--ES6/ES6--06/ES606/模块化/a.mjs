//要在  a.js中引用b.js中的内容。
//import {name,age} from './b.js';//直接使用引入的变量的名字
//给 name 和 age通过as关建字 起别名。
//import {name as n,age as a} from './b.js';

/* import {n,a} from './b.js';
let name = '李四';
let age = 18;
console.log(name,age,n,a); */


//aaa 相当于给 默认暴漏函数起的名字  随意起。
import aaa from './b.mjs';
aaa();