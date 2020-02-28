import React from "react";
import { Form, Input, Button, notification } from "antd";
import { AuthService } from "../../../services/authService";
import { LoadingService } from "../../../services/loadingService";
import { baseURL } from "../../../utils/config";

//FIXME: Form update to v4,có thay đổi lại nên e update lại nhé
const LoginForm = props => {
    const layout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 18,
        },
    };


    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    };

    const renderBtnLogin=()=>{
        return (
            <Button type="primary" htmlType="submit" className="login-btn">
                Submit
            </Button>
        )
    }


    const formItems = [
        {
            key:0,
            label:'Email',
            name:'email',
            rules:[
                    {
                        required: true,
                        message: 'Please input your email!',
                    }
            ],
            render:<Input/>,
        },
        {
            key:1,
            label:'Password',
            name:'password',
            rules:[
                {
                    required: true,
                    message: 'Please input your password!',
                }
            ],
            render:<Input.Password/>
        },
        {
            key:'3',
            className:'btn-wrap',
            layout:tailLayout,
            render: <span className="forgot-text">Forgot password</span>
        },
        {
            key:'4',
            className:'btn-wrap',
            layout:tailLayout,
            render :renderBtnLogin()
        }
    ]

  //FIXME: việc call và fetch api nên được tách ra thành 1 file riêng
  //và e đang khai báo qúa nhiều hàm chỉ dành cho việc call api, nên tối giản code lại
  const onFinish = async values => {
    try {
        console.log(values)
      await LoadingService.setAndBroadcast(true);

      const response = await doPost("/api/v1/user/login", values);

      processReponse(response);
    } catch (e) {
      notification["error"]({
        message: "Error",
        description: e.message
      });
    } finally {
      LoadingService.setAndBroadcast(false);
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

  const processReponse = res => {
    if (res.status === 200) {
      const userInfo = res.data;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      AuthService.setAndBroadcast(userInfo);
    } else {
      notification["error"]({
        message: "Error",
        description: res.message
      });
    }
  };

  //FIXME: với việc các component tương tự nhau như thế này e nên sử dụng 1 array để cấu hình cho việc render
  //tại đây chỉ cần map array đó ra để render thôi
  return (
      <Form
          {...layout}
          name="basic"
          onFinish={onFinish}
      >
          {
              formItems.map(item => (
                  <Form.Item
                      label= {item.label}
                      name= {item.name}
                      rules={item.rules}
                      key={item.key}
                      className={item.className}
                      {...item.layout}
                  >
                      {item.render}
                  </Form.Item>
              ))
          }
      </Form>
  );
};

export default LoginForm;
