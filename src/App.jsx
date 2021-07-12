import React, {Component, Fragment} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Login from "./container/Login";
import Admin from "./container/Admin";


export default class App extends Component {

    render() {
        return (
            <Fragment>
                {/* 注册路由 */}
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/admin" component={Admin}/>
                    <Redirect to="/admin"/>
                </Switch>
            </Fragment>
        );
    }
}

