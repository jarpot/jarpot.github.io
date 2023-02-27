import React, { Component } from 'react'
import footerStyle from './index.module.css'
export default class index extends Component {

  //定义函数完成全选
  allChk=(e)=>{
    //console.log(e.target.checked)
    this.props.getAllChk(e.target.checked)
  }

  render() {
    return (
      <div className={footerStyle.footer}>
        <label><input type="checkbox" checked={this.props.finish==this.props.total ? true :false} onChange={this.allChk}/><span>全选</span></label>
        <span>已完成{this.props.finish}/全部{this.props.total}</span>
        <button>删除已完成</button>
      </div>
    )
  }
}
