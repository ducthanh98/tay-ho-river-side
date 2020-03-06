import React from "react";
import { Form, Input, Row, Col } from "antd";

const Infor = () => {

    const children = [
      {
      name:"officePhone",
      label:"Số điện thoại"
      },
      {
        name:"Email",
        label:"Email"
      },
      {
        name:"LinkFanpage",
        label:"Link fanpage facebook"
      },
      {
        name:"address",
        label:"Địa chỉ"
      }
    ];

    let form =  children.map((e,i) =>
      <Row gutter={[0, 6]} key={i}>
        <Col span={24}>
          <Form.Item
            name={e.name}
            label={e.label}
            rules={[
              {
                required: true,
                message: 'Input something!',
              },
            ]}
          >
            <Input placeholder="Input something!" />
          </Form.Item>
        </Col>
      </Row>
    )

  return form;

};

export default Infor;
