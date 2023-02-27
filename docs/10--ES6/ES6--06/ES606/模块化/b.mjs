//export 向外暴漏 数据
/* export let name = '张三';
export let age = 18; */

let name = '张三';
let age = 18;
//统一向外暴漏数据
export {name as n,age as a};

//向外暴漏 默认的函数  这种函数只能暴漏一个 
export default function(){
    console.log('你好哈哈哈');
}