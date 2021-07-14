import React from 'react'
import { Form, Input, Button ,Icon } from 'antd';
import { connect } from 'react-redux';
import { creatDemo1Action,creatDemo2Action } from '../../redux/action_creators/test_action';
import './css/login.less'
import logo from './imgs/logo.png'
class Login extends React.Component{
  componentDidMount(){
    console.log(this.props)
  }
  handleSubmit=(event)=>{
    event.preventDefault();
    this.props.form.validateFields((err,values)=>{
      if(!err){
        alert('向服务器发送请求')
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
    const {Item} = Form
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
                  prefix={<Icon type='password' style={{ color: 'rgba(0,0,0,.25)' }} />}
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


 export default connect(
  state => ({test:state.test}),
  {
    demo1:creatDemo1Action,
    demo2:creatDemo2Action
  }
)(Form.create()(Login) )