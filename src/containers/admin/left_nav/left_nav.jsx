import React, { Component } from 'react'
import { Menu, Icon } from 'antd';
import { Link,withRouter } from 'react-router-dom';
import menuList from '../../../config/menuConfig.js'
import { connect } from 'react-redux';
import { creatSaveTitleAction } from '../../../redux/action_creators/menu_action.js';
import logo from '../../../static/img/logo.png'
import './css/left_nav.less'
const { SubMenu } = Menu;

@connect(
    state=>({}),
    {
        saveTitle:creatSaveTitleAction
    }
)
@withRouter
class LeftNav extends Component {
    createMenu=(target)=>{
        return target.map((item)=>{
            if (!item.children) {
                return (
                    <Menu.Item key={item.key} onClick={()=>{this.props.saveTitle(item.title)}}>
                        <Link to={item.path}>
                            <Icon type={item.icon}/>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            }else{
                return(
                    <SubMenu
                        key={item.key}
                        title={
                        <span>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </span>
                        }
                    >
                        {this.createMenu(item.children)}
                    </SubMenu>
                )
            }
        })
    }
    render() {
        let {pathname}=this.props.location
        return (
            <div>
                <header className="nav-header">
                    <img src={logo} alt='logo'/>
                    <h1>商品管理系统</h1>
                </header>
                <Menu
                    selectedKeys={pathname.indexOf('product')!==-1 ? 'product' : pathname.split('/').reverse([0])}
                    defaultOpenKeys={pathname.split('/').splice(2)}
                    mode="inline"
                    theme="dark"
                >
                    {this.createMenu(menuList)}
                </Menu>
            </div>
        )
    }
}

export default LeftNav
