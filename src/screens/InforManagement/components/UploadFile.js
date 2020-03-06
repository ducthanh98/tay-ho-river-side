import React from "react";
import { Upload, Icon, Input, Button } from "antd";
import "antd/dist/antd.css";
import "./Upload.css";

class UploadFile extends React.Component {
  state = {
    previewVisible: false,
    previewImage: "",
    fileList: [],
    newfile: true
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handleChange = ({ fileList }) => {
    this.setState({ fileList });
  };

  upLoad = file => {
    this.setState({ newfile: true });
    console.log("asdff", file.name);
    let formData = new FormData();
    formData.append("file", file);

    fetch("http://139.162.53.137:3000/api/v1/file/upload", {
      method: "POST",
      body: formData
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log("data", data);
      })
      .catch(error => console.log(error));
  };

  addNewFile = () => {
    this.setState({ newfile: false });
  };

  renderUploadButton = () => {
    // const {newfile}=this.state;
    if (this.state.newfile) return null;
    return (
      <div>
        {/* <Input style={{width: '150px'}}></Input> */}
        <Icon type="upload" />
        <div>Up Image</div>
      </div>
    );
  };

  dummyRequest = ({ file, onSuccess }) => {
    //FIXME: cần quản lý timeout
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  render() {
    let b = (
      <div>
        {/* <Input style={{width: '150px'}}></Input> */}
        <div className="clearfix">
          <Upload
            action={this.upLoad}
            // beforeUpload={this.beforeUpload}
            // method="PUT"
            listType="picture-card"
            // fileList={fileList}
            // onPreview={this.handlePreview}
            onChange={this.handleChange}
            customRequest={this.dummyRequest}
          >
            {this.renderUploadButton()}
          </Upload>
        </div>
      </div>
    );
    return (
      <div>
        <Button type="primary" onClick={this.addNewFile}>
          New File
        </Button>
        {b}
      </div>
    );
  }
}

export default UploadFile;
