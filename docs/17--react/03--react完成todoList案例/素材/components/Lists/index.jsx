import React, { Component } from 'react';
import Item from './../Item'
class index extends Component {
    constructor(props){
        super(props)
    }
    render() {
        //console.log(this.props)
        let {todoLists} = this.props
        return (
            <ul>
                {
                    todoLists.map(item=>{
                        return <Item 
                                    key={item.id} 
                                    {...item}
                                    getChkFinish={this.props.getChkFinish}
                                    deleteTodo={this.props.deleteTodo}
                                ></Item>
                    })
                }
            </ul>
        );
    }
}

export default index;