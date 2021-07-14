import React from 'react'
import { createIncreamentAction,createDecreamentAction,createIncreamentAsyncAction } from "../redux/actions/counter_action";
import { connect } from "react-redux";

class Counter extends React.Component{
    componentDidMount(){
        console.log(this.props)
    }

    increment=()=>{
        let {value} = this.refs.selectNumber
        this.props.increment(value*1)
    }
    decrement=()=>{
        let {value} = this.refs.selectNumber
        this.props.decrement(value*1)
    }
    incrementIfOdd=()=>{
        let {value} = this.refs.selectNumber
        let count = this.props.count
        if(count%2===1) this.props.increment(value*1)
    }
    incrementAsync=()=>{
        let {value} = this.refs.selectNumber
        this.props.incrementAsync(value*1,1000)

    }
    render(){
        let {count} = this.props
        return (
            <div>
                 <h3>当前计数为{count}</h3>
                 <select ref="selectNumber">
                     <option value="1">1</option>
                     <option value="2">2</option>
                     <option value="3">3</option>
                 </select>&nbsp;&nbsp;
                 <button onClick={this.increment}>+</button>&nbsp;&nbsp;
                 <button onClick={this.decrement}>-</button>&nbsp;&nbsp;
                 <button onClick={this.incrementIfOdd}>increment if odd</button>&nbsp;&nbsp;
                 <button onClick={this.incrementAsync}>increment async</button>
            </div>
        )
    }
}

export default connect(
    state=>({count:state.count}),
    {
        increment:createIncreamentAction,
        decrement:createDecreamentAction,
        incrementAsync:createIncreamentAsyncAction
    }
)(Counter)