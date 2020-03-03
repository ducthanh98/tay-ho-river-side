import React from 'react'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Row, Col, Tabs, Breadcrumb, Button, notification } from 'antd';
import Uploadfile from "./components/UploadFile";
import InforForm from "./components/InforForm";
import { FetchApi } from "../../utils/modules";

const { TabPane } = Tabs;

class Infor extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: "",
      documents: [],
      data: {
        id: '1',
        name: 'T Oerr',
        description: 'dfdf',
        officePhone: '',
        linkFanpage: '',
        createdTime: '',
        address: '',
        documents: []
      },
    }
  }

  componentDidMount() {

    this.getInfor();

  }

  getInfor = async () => {
    try {
      const res = await FetchApi.getInforManager()
      if (res.status === 200) {
        this.setState(prevState => {
          let data = Object.assign({}, prevState.data);
          data.id = res.data.id;
          data.name = res.data.name;
          data.description = res.data.description;           
          data.officePhone = res.data.officePhone;                     
          data.linkFanpage = res.data.linkFanpage;           
          data.createdTime = res.data.createdTime;
          data.address = res.data.address;                 
          data.documents = res.data.documents;           

          return { data };                             
        })

      } else {
            throw Error(res.message)
      }

    } catch (e) {

      notification["error"]({message: "Error", description: e.message});
      
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const start = Date.now();
      this.setState( async prevState => {
        let data = Object.assign({}, prevState.data);
        data.officePhone = values.officePhone;                 
        data.linkFanpage = values.linkFanpage;         
        data.createdTime = start; 
        data.address = values.address;  
        data.Email = values.Email;             
        data.documents = prevState.documents;

        try {
          const res = await FetchApi.putInfo(data)
          if (res.status === 200) {
                console.log('ress', res.data)
            } 
          else {
            throw Error(res.message)
          }
    
        } catch (e) {
    
          notification["error"]({message: "Error", description: e.message});
          
        }

        return { data };                              
      })
      
      if (!err) {
      }
    });
  };

  render() {

    const {form} = this.props
    return (
      <div>
        <Form onSubmit={this.handleSubmit} id="form1">
          <Row>
            <Breadcrumb>
              <Breadcrumb.Item>
                <a href="#">Quản lý toà nhà</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href="#">Quản lý thông tin</a>
              </Breadcrumb.Item>
            </Breadcrumb>
            <Row>
              <Col span={23}>
                <Tabs defaultActiveKey="1" >
                  <TabPane tab="THÔNG TIN VĂN PHÒNG" key="1">
                    <InforForm
                      form={form}
                    />
                  </TabPane>
                  <TabPane tab="TÀI LIỆU" key="2">
                    <Uploadfile 
                      documents={this.state.documents}
                    />
                  </TabPane>
                </Tabs>
              </Col>
              <Col span={1}>
                <Button type="primary" htmlType="submit" form="form1">Lưu</Button>
              </Col>
            </Row>
          </Row>
        </Form>
      </div>
    );
  }
}

const WrappedInfor = Form.create()(Infor)

export default WrappedInfor;
