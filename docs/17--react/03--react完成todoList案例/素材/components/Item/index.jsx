import React, { Component } from 'react'
import itemStyle from './index.module.css'
export default class index extends Component {

  //点击复选框时 需要把当前勾选的input框的选中状态传递给父组件
  //此时如果使用ES6函数 括号中接收到的参数的最后一个就是e事件对象
  /* changeChecked(id,a,e){
    console.log(id,a,e)
  } */
  //如果使用的是箭头函数 需要再其内部return一个新的回调函数，这样可以确保，
  //函数不会在页面加载时执行
  changeChecked=(id)=>{
    return (e)=>{
      //console.log(e,id)
      //此时需要把这个id值传递给App父组件使用 更新对应数据的isfinish值
      //调用由App根组件---》Lists父组件---》本组件的函数，把选中的id传递过去
      this.props.getChkFinish(id,e.target.checked)
    }
  }

  //定义函数 点击删除按钮时 删除任务
  delTodo=(id)=>{
    return (e)=>{
      this.props.deleteTodo(id);
    }
  }

  


  render() {
    let {id,content,isFinish} = this.props
    return (
      <li className={itemStyle.list}>
          <label>
            <input 
              type="checkbox" 
              checked={isFinish}
              onChange={this.changeChecked(id)}
              />
            <span className={isFinish ? itemStyle.active : ''}>{content}</span>
            <button onClick={this.delTodo(id)}>删除</button>
          </label>
      </li>
    )
  }
}
