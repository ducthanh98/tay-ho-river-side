import React from "react";
import { Form, Input, Button, notification } from "antd";
import { AuthService } from "../../../services/authService";
import { LoadingService } from "../../../services/loadingService";
import {FetchApi} from "../../../utils/modules";

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
                        message: 'Vui lòng nhập email',
                    }
            ],
            render:<Input/>,
        },
        {
            key:1,
            label:'Mật khẩu',
            name:'password',
            rules:[
                {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu',
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


  const onFinish = async values => {
    try {

      LoadingService.setAndBroadcast(true);
      const res = await FetchApi.login(values)


      if (res.status === 200) {
           localStorage.setItem("userInfo", JSON.stringify(res.data));
           AuthService.setAndBroadcast(res.data);
      } else {
           throw Error(res.message)
      }


    } catch (e) {

      notification["error"]({message: "Error", description: e.message});

    } finally {
      LoadingService.setAndBroadcast(false);
    }
  };

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
