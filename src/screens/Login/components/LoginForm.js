import React from 'react';
import { Form,  Input, Button } from 'antd';
import {Redirect, withRouter} from 'react-router-dom'
import {AuthService} from '../../../services/authService'

class LoginForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const userInfo = {id:'1'};
                localStorage.setItem('userInfo',JSON.stringify(userInfo))
                await AuthService.setAndBroadcast({...AuthService.get(),userInfo})
            }
        });

    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item label="Name">
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
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
                    <a className="forgot-text" href="">
                        Forgot password
                    </a>
                </Form.Item>
                <Form.Item className={'btn-wrap'}>
                    <Button type="primary" htmlType="submit" className="login-btn">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}


export default withRouter(Form.create({ name: 'login' })(LoginForm));

