import React from "react";

import { PlusOutlined ,DashOutlined,SwapOutlined,DeleteOutlined} from "@ant-design/icons";
import {Upload, Input, Button, message, notification,Dropdown,Menu, Row, Col} from "antd";

import { FetchApi } from "../../../utils";
import {LoadingService} from "../../../services";

const styles = {
  fileInfo:{
    width:'100%',
    height:'200px',
    display:"flex",
    justifyContent:'center',
    alignItems:'center',
    border:'1px solid #E2E2E2',
    position:'relative'
  },
  inputName:{
    width:'100%',
    marginBottom:'10px'
  },
  threedot:{
    position:'absolute',
    bottom:'10px',
    right:'10px'
  }
}

class UploadFile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      previewVisible: false,
      previewImage: "",
      name: "",
      newfile: true,
      upload: false,
    };
  }

  handleCancel = () => this.setState({ previewVisible: false });


  upLoad = async (file,index) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        LoadingService.setAndBroadcast(true);


        const res = await FetchApi.uploadFile(formData);


      if (res.status === 200) {
          this.updateListFile(file.name,res,index)
      } else {
        throw Error(res.message);
      }


    } catch (e) {
      notification["error"]({ message: "Error", description: e.message });
    }
    finally {
        LoadingService.setAndBroadcast(false);
    }

  };


  updateListFile= (name,res,index)=>{
        const item = { name: name, url: res.data[0].fileUrl };
        const {documents} = this.props;

        if(index !== undefined){
            documents[index] = item;
        } else {
            documents.push(item);
        }


        this.props.updateDocuments(documents)
  }


    beforeUpload=(file)=> {
        const isPdf = file.type === 'application/pdf';

        if (!isPdf) {
            message.error('Định dạng file không hợp lệ !');
            return Promise.reject();
        }

    }


    dummyRequest = ({ file, onSuccess }) => {

        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };

  onRemove = index => {
    const {documents} = this.props;

    documents.splice(index, 1)
    this.props.updateDocuments(documents)

  }

  updateFileName =(e,index)=>{
        const {documents} = this.props;

        documents[index].name = e.target.value;
        this.props.updateDocuments(documents)
    }

  renderListFile = ()=>(
      this.props.documents.map((file,index) => (
        <Col span={7} offset={1} key={index}>
          <p>Tên file</p>
          <Input style={styles.inputName}
                 onChange={(e)=>this.updateFileName(e,index)}
                 value={file.name}
                 width={'100%'}/>

          <div style={styles.fileInfo}>
            <img src={require('../../../assets/images/picture_as_pdf-24px.svg')} alt="pdf"/>

            <Dropdown overlay={()=>this.renderMenu(index)} trigger={['click']} placement="topRight">
              <a  style={styles.threedot} className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                <DashOutlined  rotate={90}/>
              </a>
            </Dropdown>
          </div>

        </Col>
      ))
  );

  renderMenu = (index)=>(
      <Menu>
        <Menu.Item key="0">
          <Upload
              action={(file)=>this.upLoad(file,index)}
              beforeUpload={this.beforeUpload}
              customRequest={this.dummyRequest}
              accept={"application/pdf"}
              showUploadList={false}
          >
            <SwapOutlined /> Thay đổi
          </Upload>
        </Menu.Item>
        <Menu.Item key="1" onClick={()=> this.onRemove(index)}>
          <DeleteOutlined /> Xóa
        </Menu.Item>
      </Menu>
  );


  render() {

    return (
      <div>
        <Upload
            action={(file)=>this.upLoad(file)}
            beforeUpload={this.beforeUpload}
            customRequest={this.dummyRequest}
            accept={"application/pdf"}
            showUploadList={false}

        >
          <Button type="primary">
            <PlusOutlined /> &nbsp; Thêm mới
          </Button>
        </Upload>

        <br/>
        <br/>
        <Row>
          {
            this.renderListFile()
          }
        </Row>
      </div>
    );
  }
}

export default UploadFile;
