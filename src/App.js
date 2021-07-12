import React from 'react'
import { Route,Switch,Redirect } from 'react-router'
import NewLogin from './pages/login/login'
import Admin from './pages/admin/admin'
export default class App extends React.Component{
  render(){
    return(
      <div className="app">
        <Switch>
          <Route path="/admin" component={Admin}></Route>
          <Route path="/login" component={NewLogin}></Route>
          <Redirect to='/login' />
        </Switch>
      </div>
    )
  }
}