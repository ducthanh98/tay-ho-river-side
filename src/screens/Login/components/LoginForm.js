import React from 'react';
import { Form,  Input, Button,notification } from 'antd';
import {AuthService} from '../../../services/authService'
import {doPost} from "../../../utils/API";
import {LoadingService} from "../../../services/loadingService";

const LoginForm =(props)=> {
    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields(async (err, values) => {
            if (!err) {
                await login(values);
            }
        });

    };

    const login = async (values)=>{
        try{
            await LoadingService.setAndBroadcast(true)
            const response = await doPost('/api/v1/user/login',values);

            await processReponse(response);
        } catch (e) {

            notification['error']({
                message: 'Error',
                description: e.message
            });

        }
        finally {
            await LoadingService.setAndBroadcast(false)
        }
    }

    const processReponse = async (res)=>{
        if(res.status === 200){

            const userInfo = res.data;
            localStorage.setItem('userInfo',JSON.stringify(userInfo))
            await AuthService.setAndBroadcast(userInfo)

        } else {

            notification['error']({
                message: 'Error',
                description: res.message
            });

        }
    }

    const { getFieldDecorator } = props.form;


    return (
            <Form onSubmit={handleSubmit} className="login-form">
                <Form.Item label="Email">
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Please input your email!' }],
                    })(
                        <Input />,
                    )}
                </Form.Item>
                <Form.Item label="Password" hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ],
                    })(<Input.Password />)}
                </Form.Item>
                <Form.Item className={'btn-wrap '}>
                    <span className="forgot-text">
                        Forgot password
                    </span>
                </Form.Item>
                <Form.Item className={'btn-wrap'}>
                    <Button type="primary" htmlType="submit" className="login-btn">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
    );
}


export default Form.create({ name: 'login' })(LoginForm);

