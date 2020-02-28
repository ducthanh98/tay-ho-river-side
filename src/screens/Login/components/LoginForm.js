import React from "react";
import { Form, Input, Button, notification } from "antd";
import { AuthService } from "../../../services/authService";
import { LoadingService } from "../../../services/loadingService";
import { baseURL } from "../../../utils/config";

//FIXME: Form update to v4,có thay đổi lại nên e update lại nhé
const LoginForm = props => {
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      //FIXME: với function chỉ xử lý 1 hàm như thế này thì việc xử dụng async/await là k có tác dụng
      if (!err) {
        await login(values);
      }
    });
  };
  //FIXME: việc call và fetch api nên được tách ra thành 1 file riêng
  //và e đang khai báo qúa nhiều hàm chỉ dành cho việc call api, nên tối giản code lại
  const login = async values => {
    try {
      await LoadingService.setAndBroadcast(true);

      const response = await doPost("/api/v1/user/login", values);

      await processReponse(response);
    } catch (e) {
      notification["error"]({
        message: "Error",
        description: e.message
      });
    } finally {
      //FIXME: await ở đây là k có tác dụng gì cả vì đây là hàm xử lý đồng bộ rồi
      await LoadingService.setAndBroadcast(false);
    }
  };

  const doPost = async (url, data) => {
    const response = await fetch(`${baseURL}${url}`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    return await response.json();
  };

  const processReponse = async res => {
    if (res.status === 200) {
      const userInfo = res.data;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      await AuthService.setAndBroadcast(userInfo);
    } else {
      notification["error"]({
        message: "Error",
        description: res.message
      });
    }
  };

  const { getFieldDecorator } = props.form;

  //FIXME: với việc các component tương tự nhau như thế này e nên sử dụng 1 array để cấu hình cho việc render
  //tại đây chỉ cần map array đó ra để render thôi
  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <Form.Item label="Email">
        {getFieldDecorator("email", {
          rules: [{ required: true, message: "Please input your email!" }]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="Password" hasFeedback>
        {getFieldDecorator("password", {
          rules: [
            {
              required: true,
              message: "Please input your password!"
            }
          ]
        })(<Input.Password />)}
      </Form.Item>
      <Form.Item className={"btn-wrap "}>
        <span className="forgot-text">Forgot password</span>
      </Form.Item>
      <Form.Item className={"btn-wrap"}>
        <Button type="primary" htmlType="submit" className="login-btn">
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Form.create({ name: "login" })(LoginForm);
