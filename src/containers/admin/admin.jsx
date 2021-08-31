import React from 'react'
import { connect } from 'react-redux'
import {Redirect,Route,Switch} from 'react-router-dom'
import { Layout } from 'antd';
import { createDeleteUserInfoAction } from '../../redux/action_creators/login_action';
import './css/admin.less'
import Header from './header/header';
import Home from '../../components/home/home';
import Category from '../category/category';
import Product from '../product/product';
import AddUpdate from '../product/add_update';
import Detail from '../product/detail';
import User from '../user/user';
import Role from '../role/role'
import Bar from '../bar/bar';
import Line from '../line/line'
import Pie from '../pie/pie';
import LeftNav from './left_nav/left_nav';

const {Footer,Content,Sider}=Layout

@connect(
  state=>({userInfo:state.userInfo}),
  {
    deleteUserInfo:createDeleteUserInfoAction
  }
)

class Admin extends React.Component{

  logout=()=>{
    this.props.deleteUserInfo()
  }



//在render里，若想实现跳转，最好用<Redirect>
  render(){
    const {isLogin}=this.props.userInfo
    if (!isLogin) {
      console.log('没有登陆')
      return <Redirect to='/login'/>
    }else{
        return(
          <Layout className="admin">
            <Sider className="sider">
              <LeftNav/>
            </Sider>
            <Layout>
              <Header className="header">Header</Header>
              <Content className="content">
                <Switch>
                  <Route path='/admin/home' component={Home}></Route>
                  <Route path='/admin/pro_about/category' component={Category}></Route>
                  <Route path='/admin/pro_about/product' component={Product} exact></Route>
                  <Route path='/admin/pro_about/product/detail/:id' component={Detail}></Route>
                  <Route path='/admin/pro_about/product/add_update' component={AddUpdate} exact></Route>
                  <Route path='/admin/pro_about/product/add_update/:id' component={AddUpdate}></Route>
                  <Route path='/admin/user' component={User}></Route>
                  <Route path='/admin/role' component={Role}></Route>
                  <Route path='/admin/charts/bar' component={Bar}></Route>
                  <Route path='/admin/charts/line' component={Line}></Route>
                  <Route path='/admin/charts/pie' component={Pie}></Route>
                  <Redirect to='/admin/home'></Redirect>
                </Switch>
              </Content>
              <Footer className="footer">推荐使用谷歌浏览器，获取最佳体验</Footer>
            </Layout>
          </Layout>
        )
    }
  }
}

export default Admin