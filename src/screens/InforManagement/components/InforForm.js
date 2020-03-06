import React from "react";
import { Form, Input, Row, Col } from "antd";
import "antd/dist/antd.css"; //FIXME: file này đã được import từ file App rồi

const Infor = () => {
  //FIXME: og nên sử dụng array để khai báo form rồi sau đó sử dung map để render form đó ,phần này og có thể tham khảo từ Thanh
  return (
    <div>
      <Row gutter={[0, 6]}>
        <Col span={18}>
          <Form.Item
            name={"officePhone"}
            label="Số điện thoại"
            rules={[
              {
                required: true,
                message: "Input something!"
              }
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={18}>
          <Form.Item
            name={"email"}
            label="Email"
            rules={[
              {
                required: true,
                message: "Input something!"
              }
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={18}>
          <Form.Item
            name={"linkFanpage"}
            label="Link fanpage facebook"
            rules={[
              {
                required: true,
                message: "Input something!"
              }
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={18} push={0}>
          <Form.Item
            name={"address"}
            label="Địa chỉ"
            rules={[
              {
                required: true,
                message: "Input something!"
              }
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default Infor;
