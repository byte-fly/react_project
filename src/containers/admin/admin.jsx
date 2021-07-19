import React from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import { Layout } from 'antd';
import { createDeleteUserInfoAction } from '../../redux/action_creators/login_action';
import { reqCategoryList } from '../../api';
import './css/admin.less'
import Header from './header/header';
const {Footer,Content,Sider}=Layout

@connect(
  state=>({userInfo:state.userInfo}),
  {
    deleteUserInfo:createDeleteUserInfoAction
  }
)
class Admin extends React.Component{
  componentDidMount(){
    console.log(this.props)
  }

  logout=()=>{
    this.props.deleteUserInfo()
  }

  // demo=async()=>{
  //   let result= await reqCategoryList()
  //   console.log(result)
  // }

//在render里，若想实现跳转，最好用<Redirect>
  render(){
    const {user,isLogin}=this.props.userInfo
    if (!isLogin) {
      console.log('没有登陆')
      return <Redirect to='/login'/>
    }else{
      console.log('登陆了')
        return(
          <Layout className="admin">
            <Sider className="sider">Sider</Sider>
            <Layout>
              <Header className="header">Header</Header>
              <Content className="content">Content</Content>
              <Footer className="footer">推荐使用谷歌浏览器，获取最佳体验</Footer>
            </Layout>
          </Layout>
        )
    }
  }
}

export default Admin