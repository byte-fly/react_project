import React from 'react'
import { Form, Input, Button ,Icon, message } from 'antd';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { creatSaveUserInfoAction } from '../../redux/action_creators/login_action';
import { reqLogin } from '../../api';
import './css/login.less'
import logo from './imgs/logo.png'


class Login extends React.Component{
  componentDidMount(){
    console.log(this.props)
  }
  handleSubmit=(event)=>{
    event.preventDefault();
    this.props.form.validateFields(async(err,values)=>{
      const {username,password}=values
      if(!err){
        let result = await reqLogin(username,password)
        const {status,msg,data}=result
        if (status===0) {
          console.log(result)

          //2.将用户信息交给redux管理
          this.props.saveUserInfo(data)
          //1.
          this.props.history.push('/admin')
        }else{
          message.warning(msg,3)
        }
      }else{
        message.error('表单输入有误，请检查')
      }
    })
  }
  pwdValidator=(rule,value,callback)=>{
    if(!value){
      callback('密码必须输入')
    }else if(value.length>12){
      callback('密码必须小于12位')
    }else if(value.length<4){
      callback('密码必须大于4位')
    }else if(!(/^\w+$/).test(value)){
      callback('密码必须由字母、数字、下划线组成')
    }else{
      callback()
    }

  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const {isLogin}=this.props
    const {Item} = Form

    if (isLogin) {
      return <Redirect to='/admin'/>
    }
    return(
      <div className="login">
        <header>
          <img src={logo} alt="logo" />
          <h1>商品管理系统</h1>
        </header>
        <section>
          <h1>用户登录</h1>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
              {getFieldDecorator('username', {
                rules: [
                  { required: true, message: '用户名不能为空' },
                  { max: 12, message: '用户名必须小于等于12位' },
                  { min: 4, message: '用户名必须大于等于4位' },
                  { pattern: /^\w+$/, message: '用户名必须由数字、字母、下划线组成' },
                ],
              })(
                <Input
                  prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />,
              )}
            </Item>
            <Item>
              {getFieldDecorator('password', {
                rules: [{ validator: this.pwdValidator }],
              })(
                <Input
                  prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
            </Item>
            <Item>
              <Button type="primary" htmlType="submit" className="login-form-button" block>
                登录
              </Button>
            </Item>
          </Form>
        </section>
      </div>

    )
  }
}


//  export default Form.create()(Login)
 
 export default connect(
  state => ({isLogin:state.userInfo.isLogin}),
  {
    saveUserInfo:creatSaveUserInfoAction,
  }
)(Form.create()(Login) )