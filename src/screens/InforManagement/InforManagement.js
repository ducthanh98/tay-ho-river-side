import React from "react";
import Uploadfile from "./components/UploadFile";
import InforForm from "./components/InforForm";
import { FetchApi } from "../../utils/modules";
import { Form, Button, Row, Col, Tabs, Breadcrumb, notification } from "antd";

const { TabPane } = Tabs;
class Infor extends React.Component {
    state = {
      data:null
    }


  componentDidMount() {
    this.getInfor();
  }

  updateDocuments = (documents) => {

    this.setState({documents});

  }

  getInfor = async () => {
    try {
      const res = await FetchApi.getInforManager();
      if (res.status === 200) {
        
      this.setState({data:res.data})
      console.log(this.state.data)
      } else {
        throw Error(res.message);
      }
    } catch (e) {
      notification["error"]({ message: "Error", description: e.message });
    }
  };

  onFinish = async values => {
    const data = {...this.state.data,...values};

    try {
      console.log(data);
      const res = await FetchApi.putInfo(data);
      if (res.status === 200) {

        notification["success"]({ message: "success", description: "Đã lưu thông tin" });

      } else {
        throw Error(res.message);
      }
    } catch (e) {
      notification["error"]({ message: "Error", description: e.message });
    }

  };

  layout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 16
    },
  }

  renderForm=()=>{
    if(!this.state.data) return;

    return (
        <Form
            {...this.layout}
            name="nest-messages"
            onFinish={this.onFinish}
            id="form1"
            initialValues={this.state.data}
        >
          <Row>
            <Col span={23}>
              <Tabs defaultActiveKey="1">
                <TabPane tab="THÔNG TIN VĂN PHÒNG" key="1">
                  <Row>
                    <InforForm data = {this.state.data} proj/>
                  </Row>

                </TabPane>
                <TabPane tab="TÀI LIỆU" key="2">
                  <Uploadfile
                      updateDocuments = {this.updateDocuments}
                      documents = {this.state.data?.documents}
                  />
                </TabPane>
              </Tabs>
            </Col>
            <Col span={1}>
              <Button type="primary" htmlType="submit" form="form1">
                Lưu
              </Button>
            </Col>
          </Row>
        </Form>
    )
  }

  render() {
    return (
      <Row>
        <Col span={24}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="#">Quản lý toà nhà</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="#">Quản lý thông tin</a>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col span={24}>
          <div style={{ marginTop: "30px" }}>
            {this.renderForm()}
          </div>
        </Col>
      </Row>
    );
  }
}

export default Infor;
