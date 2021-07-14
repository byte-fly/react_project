import React from 'react'
import { connect } from 'react-redux'
import { creatDemo1Action } from '../../redux/action_creators/test_action'

class Admin extends React.Component{
  componentDidMount(){
    console.log(this.props)
  }
  render(){
    return(
      <div>
        Admin
      </div>
    )
  }
}

export default connect(
  state=>({peiqi:state.test}),
  {
    demo1:creatDemo1Action
  }

)(Admin)