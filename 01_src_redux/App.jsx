import React from 'react'
import { createIncreamentAction,createDecreamentAction } from './redux/actionCreators'

export default class App extends React.Component{
    componentDidMount(){
        console.log(this.props.store)
    }

    increment=()=>{
        let {value} = this.refs.selectNumber
        this.props.store.dispatch(createIncreamentAction(value*1))
    }
    decrement=()=>{
        let {value} = this.refs.selectNumber
        this.props.store.dispatch(createDecreamentAction(value*1))
    }
    incrementIfOdd=()=>{
        let {value} = this.refs.selectNumber
        let count = this.props.store.getState()
        if(count%2===1)this.props.store.dispatch(createIncreamentAction(value*1))
    }
    incrementAsync=()=>{
        let {value} = this.refs.selectNumber
        setTimeout(()=>{
            this.props.store.dispatch(createIncreamentAction(value*1))
        },1000)

    }
    render(){
        let count = this.props.store.getState()
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