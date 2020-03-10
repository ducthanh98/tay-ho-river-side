import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Upload, Input, Button, notification } from "antd";
import "./Upload.css";
import { FetchApi } from "../../../utils";
class UploadFile extends React.Component {
  constructor(props) {
    super(props);

    // TODO: có thể dùng luôn this.props.action không nhất thiết phải gán lại vào state cho nặng
    this.state = {
      previewVisible: false,
      previewImage: "",
      name: "",
      newfile: true,
      upload: false,
      documents: [],
      action: this.props.action
    };
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handleChangeName = e => {
    this.setState({ name: e.target.value });
  };

  upLoad = async file => {
    let formData = new FormData();
    formData.append("file", file);
    try {
      const res = await FetchApi.uploadFile(formData);
      if (res.status === 200) {
        this.setState({upload: false, newfile: true})
        let item = { name: this.state.name, url: res.data[0].fileUrl };
        let {documents} = this.state;
        documents.pop();
        documents.push(item);
        this.setState({documents: [...documents]});
        this.state.action(this.state.documents)

      } else {
        throw Error(res.message);
      }
    } catch (e) {
      notification["error"]({ message: "Error", description: e.message });
    }
  };

  onRemove = e => {
    let docs = this.state.documents;
    let index;

    // FIXME : return ko thể break foreach , có thể dùng findIndex
    //  khi upload file sẽ có 1 mã uid nên dùng mã đó để tìm index

    docs.forEach((element, i) => {
      if (element.url.includes(e.name.split(" ").join("-"))) {
        index = i;
        return index;
      }
    });

    docs.splice(index, 1)
    this.setState({documents: [...docs]})
    this.state.action(this.state.documents)

  };

  addNewFile = () => {

    let { newfile, documents, upload } = this.state;
    upload = true
    if (newfile) documents.push({})
    newfile = false;
    this.setState({ documents: [...documents] });
    this.setState({ newfile ,upload });


  };

  renderUploadButton = () => {
    const { upload } = this.state;
    if (!upload) {
      return null;
    }
    return (
      <div>
        <UploadOutlined />
        <div>Up Image</div>
      </div>
    );
  };

  dummyRequest = ({ file, onSuccess }) => {
    //FIXME: để disable auto post của Upload trong antd

    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  render() {
    // TODO : thêm render trước các hàm return html cho dễ hiểu, chung format

    let buttonUpload = (
      <div>
        <div className="clearfix">
          <Upload
            action={this.upLoad}
            // beforeUpload={this.beforeUpload}
            listType="picture-card"
            onRemove={this.onRemove}
            // fileList={fileList}
            // onPreview={this.handlePreview}
            // onChange={this.handleChange}
            customRequest={this.dummyRequest}
          >
            {this.renderUploadButton()}
          </Upload>
        </div>
      </div>
    );
    let input = this.state.documents.map((item, i) => (
      <div key={i} style={{ marginLeft: "6px" }}>
        <h5>Tên file</h5>
        <Input
          style={{ width: "105px" }}
          placeholder="Input name"
          onChange={this.handleChangeName}
          value={item.name}
        />
      </div>
    ));
    return (
      <div>
        <Button type="primary" onClick={this.addNewFile}>
          New File
        </Button>
        <div>
          <div
            style={{ display: "flex", paddingTop: "20px", marginBottom: "5px" }}
          >
            {input}
          </div>
          <div style={{ marginLeft: "5px" }}>{buttonUpload}</div>
        </div>
      </div>
    );
  }
}

export default UploadFile;
