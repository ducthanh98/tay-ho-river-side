import React from 'react';
import { Form, Input, Row, Col} from 'antd';
import 'antd/dist/antd.css';

const Infor = () => {
  return (
    <div>
      <Row gutter={[0,6]}>
        <Col span={18}>
          <Form.Item
            name={'officePhone'}
            label="Số điện thoại"
            rules={[
              {
                required: true,
                message: 'Input something!'
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={18}>
          <Form.Item
            name={'email'}
            label="Email"
            rules={[
              {
                required: true,
                message: 'Input something!'
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={18}>
          <Form.Item
            name={'linkFanpage'}
            label="Link fanpage facebook"
            rules={[
              {
                required: true,
                message: 'Input something!'
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={18} push={0}>
          <Form.Item 
            name={'address'} 
            label="Địa chỉ"
            rules={[
              {
                required: true,
                message: 'Input something!'
              },
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