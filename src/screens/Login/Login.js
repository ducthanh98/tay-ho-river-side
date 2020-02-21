import React, {Component} from 'react';
import { Row, Col } from 'antd';
import {Redirect} from 'react-router-dom'

import {AuthService} from '../../services/authService'
import WrappedLoginForm from './components/LoginForm'
import './Login.css';

class Login extends Component{
    state = {
        userInfo: AuthService.get().userInfo
    }

    componentDidMount(){
        AuthService.onChange('login',()=>{
            this.setState({userInfo:AuthService.get().userInfo})
        });
    }
    render(){
        return (
            <>
                {this.state.userInfo && <Redirect to={'/'}/>}
                <Row className={'h-100'} type="flex" justify="center" align="middle">
                    <Col span={6}>
                        <p className={'title'}>TayHoRiverview</p>
                        <WrappedLoginForm/>
                    </Col>
                </Row>
            </>
        );
    }



    componentWillUnmount() {
        AuthService.deleteKey('login')
    }
}


export default Login;

