import React from 'react'
import { connect } from 'react-redux'

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
  state=>({userInfo:state.userInfo}),
  {}

)(Admin)