import React, {useEffect, useState} from 'react';
import { Row, Col } from 'antd';
import {Redirect} from "react-router-dom";


import {AuthService} from '../../services/authService'
import WrappedLoginForm from './components/LoginForm'
import './Login.css';

const Login =()=>{
    const [userInfo,setUserInfo] = useState(AuthService.get());

    useEffect(()=>{
        AuthService.onChange('login',()=>{
            setUserInfo(AuthService.get())
        });
        return ()=>{
            AuthService.deleteKey('login')
        }
    },[])

        return (
            <>
                {userInfo && <Redirect to={'/'}/>}
                <Row className={'h-100'} type="flex" justify="center" align="middle">
                    <Col span={6}>
                        <p className={'title'}>TayHoRiverview</p>
                        <WrappedLoginForm/>
                    </Col>
                </Row>
            </>
        );

}


export default Login;

