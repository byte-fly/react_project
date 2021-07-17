import React from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import { createDeleteUserInfoAction } from '../../redux/action_creators/login_action';

class Admin extends React.Component{
  componentDidMount(){
    console.log(this.props)
  }

  logout=()=>{
    this.props.deleteUserInfo()
  }

//在render里，若想实现跳转，最好用<Redirect>
  render(){
    const {user,isLogin}=this.props.userInfo
    if (!isLogin) {
      console.log('没有登陆')
      return <Redirect to='/login'/>
    }else{
      console.log('登陆了')
        return(
          <div>
            用户:{user.username},欢迎您登录Admin组件
            <button onClick={this.logout}>注销</button>
          </div>
        )
    }
  }
}

export default connect(
  state=>({userInfo:state.userInfo}),
  {
    deleteUserInfo:createDeleteUserInfoAction
  }
)(Admin)