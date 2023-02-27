//import logo from './logo.svg';
import AddTodo from './components/AddTodo'
import Lists from './components/Lists'
import Footer from './components/Footer'


import './App.css';
import React, { Component } from 'react'

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      todoLists:[
        {id:'001',content:'学习vue',isFinish:false},
        {id:'002',content:'学习html',isFinish:false},
        {id:'003',content:'学习react',isFinish:true}
      ]
    }
  }

  //父组件中定义获取子组件数据的方法
  getAddTodo=(newTodo)=>{
    console.log('接收到来自子组件中的数据',newTodo)
    //把接收到的新增组件中传递来的数据添加到state中
    let newTodos = [newTodo,...this.state.todoLists]
    //把新的todoLists放入state中
    this.setState({
      todoLists:newTodos
    })
  }

  //定义函数专门用来接收Item组件 选中任务的状态
  //需要先传递给Lists组件，再由Lists组件传递给Item组件
  getChkFinish=(id,isFinish)=>{
    //console.log('选中的id是',id,isFinish)
    //拿到item组件传递来的id和isFinish值后 对state中todoLists进行更新
    let newTodos = this.state.todoLists.map(item=>{
      if(item.id===id){
        return {...item,isFinish}
      }else{
        return item
      }
    })

    this.setState({
      todoLists:newTodos
    })
  }

  //定义函数 点击Item组件中的删除按钮时 接收传递来的id值 并且删除state中对应的数据
  deleteTodo=(id)=>{
    //console.log('需要删除的任务',id)
    let newTodos = this.state.todoLists.filter(item=>{
      return item.id!=id
    })
    this.setState({
      todoLists:newTodos
    })
  }

  //定义函数完成全选功能
  getAllChk=(isAllChk)=>{
    //console.log('点击了全选',isAllChk)
    //对todoLists数据做加工处理
    let newTodos = this.state.todoLists.map(item=>{
      return {...item,isFinish:isAllChk}
    })
    //console.log(newTodos)
    this.setState({
      todoLists:newTodos
    })
  }

  render() {

    //定义变量每次渲染时 计算已完成任务数量 传递给Footer组件
    let finish = this.state.todoLists.filter(item=>item.isFinish==true).length

    return (
      <div className="App">
        <div>
          <AddTodo addTodo={this.getAddTodo}></AddTodo>
          <Lists 
            /* 向lists组件传递数据用于页面数据的遍历渲染 */
            todoLists={this.state.todoLists}
            /* 获取item组件传递来的id和isFinish */ 
            getChkFinish={this.getChkFinish}
            /* 获取item组件传递来的要删除的任务的id */
            deleteTodo={this.deleteTodo}

            reverseChkAll={this.reverseChkAll}
            ></Lists>
          <Footer
            /* 把总任务数量传递给Footer组件 */
            total={this.state.todoLists.length}
            finish={finish}
            getAllChk={this.getAllChk}
          ></Footer>
        </div>
      </div>
    )
  }
}
