import React from 'react'
import { Row, Col, Tabs, Breadcrumb, Button, Form } from 'antd';
import Uploadfile from "./components/UploadFile";
import InforForm from "./components/InforForm";

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
    fetch('http://139.162.53.137:3000/api/v1/project', {
      method: 'GET',
      })
      .then((res)=>{
        return res.json()
      }).then((data1)=>{
        this.setState(prevState => {
          let data = Object.assign({}, prevState.data);
          data.id = data1.data.id;
          data.name = data1.data.name;
          data.description = data1.data.description;           
          data.officePhone = data1.data.officePhone;                     
          data.linkFanpage = data1.data.linkFanpage;           
          data.createdTime = data1.data.createdTime;
          data.address = data1.data.address;                 
          data.documents = data1.data.documents;                

          return { data };                             
        })
      })
      .catch((error) => console.log(error))
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const start = Date.now();
      this.setState(prevState => {
        let data = Object.assign({}, prevState.data);
        data.officePhone = values.officePhone;                 
        data.linkFanpage = values.linkFanpage;         
        data.createdTime = start; 
        data.address = values.address;  
        data.Email = values.Email;             
        data.documents = prevState.documents;
        const body = JSON.stringify(data);

        fetch('http://139.162.53.137:3000/api/v1/project', {
          method: 'PUT',
          body: body,
          mode: 'cors',
          headers: {
              'Content-Type': 'application/json'
          }
          })
          .then((res)=>{
            return res.json()
          }).then((data)=>{
            console.log('data update', data)
          })
          .catch((error) => console.log(error))
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
