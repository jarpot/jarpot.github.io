import React, { Component } from 'react'
import {nanoid} from 'nanoid'

import addTodoStyle from './index.module.css'
export default class index extends Component {
  constructor(props){
    super(props)
    this.state = {
      inpValue:''
    }
  }
  //定义函数用来让输入框与状态中的inpValue双向数据绑定
  changeInpVal=(e)=>{
    this.setState({
      inpValue:e.target.value
    })
  }
  //点击添加按钮添加新的待办事项
  addTodo=()=>{
    //对输入框进行非空判断
    if(this.state.inpValue===""){
      alert('内容不能为空')
      return
    }
    //点击添加时需要把当前组件中的内容传入到App根组件中
    //首先把新增的任务封装成一个对象形式
    //使用nanoid来生成一个绝对不会重复的id值
    let obj = {
      id:nanoid(),
      content:this.state.inpValue,
      isFinish:false
    }
    // 调用父组件传递来的函数
    this.props.addTodo(obj)

    this.setState({
      inpValue:''
    })
  }

  render() {
    //console.log(this.props)
    return (
      <div id={addTodoStyle.header}>
        <h3>任务列表</h3>
        <input type="text" value={this.state.inpValue} onChange={this.changeInpVal} placeholder='请输入待办任务'/>
        <button onClick={this.addTodo}>添加</button>
      </div>
    )
  }
}
