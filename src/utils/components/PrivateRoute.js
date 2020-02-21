import React, {Component} from "react";
import { Route, Redirect } from "react-router-dom";

import {AuthService} from '../../services/authService'

class PrivateRoute extends Component {
    state = {
        userInfo: AuthService.get().userInfo
    }

    componentDidMount(){
        AuthService.onChange('privateRoute',()=>{
            this.setState({userInfo:AuthService.get().userInfo})
        });
    }

    render() {
        return (
            <Route
                {...this.props.rest}
                render={({ location }) =>
                    this.state.userInfo ? (
                        this.props.children
                    ) : (
                        <Redirect to='login'/>
                    )
                }
            />
        );
    }

    componentWillUnmount() {
        AuthService.deleteKey('privateRoute')
    }
}



export default PrivateRoute;


