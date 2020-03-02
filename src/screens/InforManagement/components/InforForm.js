import React from 'react'
import { Row, Col, Form, Input,} from 'antd';



const InforForm = (props) => {

  const { getFieldDecorator } = props.form;
  return (
            <Row>
              <Row>
                <h3>Văn phòng giao dịch</h3>
              </Row>
              <Row>
                <Col>
                  <Row gutter={[5,0]}>
                    <Col span={4} pull={0}>
                      <Form.Item>
                          Số điện thoại
                          {getFieldDecorator('officePhone', {
                            rules: [{ required: true, message: 'required!' }],
                          })(
                            <Input
                              placeholder="Số điện thoại"
                            />,
                          )}
                        </Form.Item>
                    </Col>
                    <Col span={6} pull={0}>
                      <Form.Item>
                        Email
                        {getFieldDecorator('Email', {
                          rules: [{ required: true, message: 'required!' }],
                        })(
                          <Input
                            placeholder="Email"
                          />,
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={14} pull={0}>
                      <Form.Item>
                        Link fanpage facebook
                        {getFieldDecorator('linkFanpage', {
                          rules: [{ required: true, message: 'required!' }],
                        })(
                          <Input
                            placeholder="Link fanpage facebook"
                          />,
                        )}
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row gutter={[5,0]}>
                <Col>
                  <Form.Item>
                      Địa chỉ
                      {getFieldDecorator('address', {
                        rules: [{ required: true, message: 'required!' }],
                      })(
                        <Input
                          placeholder="Địa chỉ"
                        />,
                      )}
                    </Form.Item>
                </Col>
              </Row>
            </Row>
  );
}

export default InforForm;