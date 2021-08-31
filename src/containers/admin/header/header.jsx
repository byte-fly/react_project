import React, {Component} from 'react';
import { Button,Icon,Modal } from 'antd';
import screenfull from 'screenfull';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import { withRouter } from 'react-router-dom';//为非路由组件提供路由组件的API
import {createDeleteUserInfoAction} from '../../../redux/action_creators/login_action.js'
import { creatSaveTitleAction } from '../../../redux/action_creators/menu_action.js';
import { reqWeather } from '../../../api/index.js';
import menuList from '../../../config/menuConfig.js';
import './css/header.less'
const {confirm}=Modal


@connect(
    state=>({
        userInfo:state.userInfo,
        title:state.title
    }),
    {
        deleteUser:createDeleteUserInfoAction,
        saveTitle:creatSaveTitleAction
    }
)
@withRouter
class Header extends Component {
    state={
        isFull:false,
        date:dayjs().format('YYYY-MM-DD | HH:mm:ss'),
        live:{},
        title:''
    }

    componentDidMount(){
        //给screenfull绑定监听
        screenfull.on('change',()=>{
            let isFull = !this.state.isFull
            this.setState({isFull})
        })
        this.timer=setInterval(()=>{
            this.setState({date:dayjs().format('YYYY-MM-DD _ HH:mm:ss')})
        },1000)

        this.getWeather()

        this.getTitle()
    }

    componentWillUnmount(){
        clearImmediate(this.timer)
    }

    getWeather= async()=>{
        let result=await reqWeather()
        const {lives}=result.data
        this.setState({live:lives[0]})
    }

    //切换全屏按钮的回调
    fullscreen=()=>{
        screenfull.toggle()
    }
    logout=()=>{
        let {deleteUser}=this.props
        confirm({
            title:'确定退出？',
            content:'退出之后需重新登录',
            cancelText:'取消',
            okText:'确认',
            onOk(){
                deleteUser()
            }
        })
    }
    getTitle = ()=>{
        let {pathname}=this.props.location
        let pathKey=pathname.split('/').reverse()[0]
        if(pathname.indexOf('product')!==-1) pathKey='product'
        let title=''
        menuList.forEach((item)=>{
            if(item.children instanceof Array){
                let tmp = item.children.find((citem)=>{
                    return citem.key===pathKey
                })
                if(tmp) title=tmp.title

            }else{
                if(pathKey===item.key) title=item.title
            }
        })
        this.props.saveTitle(title) 
    }


    render() {
        let isFull = this.state.isFull
        return (
            <header className='header'>
                <div className='header-top'>
                    <Button size='small' onClick={this.fullscreen}>
                        <Icon type={isFull ? 'fullscreen-exit' : 'fullscreen'}></Icon>
                    </Button>
                    <span className='username'>欢迎，admin</span>
                    <Button type='link' onClick={this.logout}>退出登录</Button>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>
                        {this.props.title||'首页'}
                    </div>
                    <div className='header-bottom-right'>
                        {this.state.date}
                        &nbsp;&nbsp;
                        {this.state.live.city}
                        &nbsp;&nbsp;
                        <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgBAMAAAB54XoeAAAAHlBMVEXi7/rj7/pMaXHf6vPj7/rh7vjh7ffi7vjh7ffh7feN85fmAAAACnRSTlP79gCh2R9ttUaO7kcV+QAAA2hJREFUaN7t2r1P20AUAPBn1VLWPCUt7UiFgYzUSkRGK6kyYxU6J6VqVzcdyhgLIjGGKoQ/lwEuvu9PD1V19wf89N59vjsbPrbcIIIRjGAEIxjBCEYwgv84mF1elu2B2fpvnuf5411L4Don7bFsAczu86aN63DwW56bRCvwajfF/vTm533OtlHpBV79xpfWTWeceO4DXiNpANBfsuLCGcw2e68LAJAuDUkbwKxiPUHcOoJz5EFI2ZEuncDbxkMg7YARH1zAAYoBAsCE6UUHkOpAKkCARDfQOvCLPEBIDjRzUQOeFgoQEnqkx9bgCuUZ8+OysAQzZYBciENLkO5BHoSecpzVYKUDmYEurUB6DvJdCJDQc7G2AldaEDqqxaIEC2W6Qs5DG/BYy7Hrb2QDXhg8eiqObcDK4DG7WGkGM5MHsHQCB0aP7sTaDB7KJ4ti4izM4NwYIN2JFmBhDBDQGlzvpoU5QHpUtjrwqlIuN/VyfiqV4A80LRHpWTVSgFSdYAoQ4A29hT3JwQ06gB3m8PsuA281W6oJJCUEDX5FlwC5moQcp6A4Nt3B1wUI0sLIJmOugCD7LIhbqi2IHPiy6YB0hG0yFiJ8OVtAHqANCEtZxQ3SHrQDk5kkZwKeomsXAgDMxBIeZIWHNcjWnvmQAis/MBGqWZBmbA1ys7vcg0e+IFsq1ntwg+6DLCkVFwTM0BtkNp1PBBwEgHSIQwJeBIB0L54TcB4CJhKwCgGp2T16BYUxcQM7AngcBiYCeCKAXb+cCXgYCPZ4cBUIpvwozwNB5MENho3K/jAgK6UKBSfcWi5CwR6320jArtfUrtsGyY6NGJhzyp0pbYH7U0+SslvOyJ3LRWiICVc5VO2ATW1zhqE5N/cfxVp2PaiaKlux2ziGmHAV7CEGhpg2t2bFju0YYto8ZYD0nHcNsc/dUzIMFDvNFVdxLjuKPf6uN8cwccLfRo8wTPzDX8CP1aDVnUq80RfoTyb4QQRXGNLeiuBJEPggglkR4PVlT1UhOb+Tvc4NAsBf0ue+M/+M5a/E/sPyWfHs7B1irQB9e/G98lvA3K8HayV42kIPah6CLNuB9iPXrXvCC/1Xs40ruDV8KMwcxaHxU2Z2HRaf9snU1Ca235fXOwttdnMX/3OIYAQjGMEIRjCC/z/4DPQLL9/gazh/AAAAAElFTkSuQmCC' alt='天气'/>
                        {this.state.live.weather}&nbsp;&nbsp;&nbsp;&nbsp;温度：{this.state.live.temperature}
                    </div>
                </div>
            </header>
        );
    }
}
export default Header
