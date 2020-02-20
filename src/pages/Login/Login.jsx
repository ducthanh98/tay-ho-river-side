import React from 'react';
import { Row, Col } from 'antd';
import {Redirect} from 'react-router-dom'

import WrappedLoginForm from './components/LoginForm'
import './Login.css';
import {login} from "../../redux/auth/authActions";
import {connect} from "react-redux";

const Login =(props)=>{
        return (
            <>
                {props.isAuthenticated && <Redirect to={'/'}/>}
                <Row className={'h-100'} type="flex" justify="center" align="middle">
                    <Col span={6}>
                        <p className={'title'}>TayHoRiverview</p>
                        <WrappedLoginForm login={props.login}/>
                    </Col>
                </Row>
            </>
        );
}

const mapStateToProps = state=>{
    return {
        isAuthenticated:state.isAuthenticated
    }
}

const mapDispatchToProps = dispatch=>{
    return {
        login:()=>dispatch(login())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

