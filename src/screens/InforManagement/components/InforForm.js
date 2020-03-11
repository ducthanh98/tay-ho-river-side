import React from "react";
import { Form, Input, Col } from "antd";

const Infor = ({data}) => {
    const children = [
      {
        name:"officePhone",
        label:"Số điện thoại",
        colSpan:5,
        wrapperCol:{span:23},
        inputProperty:{type:"tel"}
      },
      {
        name:"Email",
        label:"Email",
        colSpan:8,
        wrapperCol:{span:23},

      },
      {
        name:"linkFanpage",
        label:"Link fanpage facebook",
        colSpan:11,
        wrapperCol:{span:24},

      },
      {
        name:"address",
        label:"Địa chỉ",
        colSpan:24,
        wrapperCol:{span:24},
      }
    ];



  return (
      <>
          {
            children.map((e,i) =>(
                    <Col style={{marginTop:20}} key={i} span={e.colSpan}>
                      <p>{e.label}</p>
                      <Form.Item
                          name={e.name}
                          rules={[
                            {
                              required: true,
                              message: 'Trường này không được trống',
                            },
                          ]}
                          wrapperCol={e.wrapperCol}

                      >
                        <Input />
                      </Form.Item>
                    </Col>
                )
            )
          }
      </>
  )
};

export default Infor;
