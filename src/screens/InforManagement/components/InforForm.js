import React from 'react';
import { Form, Input} from 'antd';
import 'antd/dist/antd.css';

const Infor = () => {
  return (
    <div>
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
    </div>
  );
};

export default Infor;