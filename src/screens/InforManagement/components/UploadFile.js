import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Upload, Input, Button, notification } from "antd";
import "./Upload.css";
import { FetchApi } from "../../../utils";

//FIXME: sử dụng PureComponent, og nên tìm hiểu sự khác biệt giữa PureComponent và Component, hàm shouldComponentUpdate để làm gì
class UploadFile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      previewVisible: false,
      previewImage: "",
      name: "",
      newfile: true,
      documents: this.props.documents
    };
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handleChangeName = e => {
    this.setState({ name: e.target.value });
  };

  upLoad = async file => {
    this.setState({ newfile: true });
    let formData = new FormData();
    formData.append("file", file);

    try {
      const res = await FetchApi.uploadFile(formData);
      if (res.status === 200) {
        let item = { name: this.state.name, url: res.data[0].fileUrl };
        let { documents } = this.state;
        console.log('document', documents)
        documents.pop();
        console.log('document1', documents)
        documents.push(item)
        console.log('document2', documents)
        this.setState({documents: [...documents]})
        // this.setState(state => {
        //   const list = state.documents;
        //   list.pop();
        //   list.push(item);
        //   return {
        //     list
        //   };
        // });
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
    docs.forEach((element, i) => {
      if (element.url.includes(e.name.split(" ").join("-"))) {
        index = i;
        return index;
      }
    });

    this.setState(state => {
      const list = state.documents.splice(index, 1);
      return {
        list
      };
    });
  };

  addNewFile = () => {

    // let value = {};
    // this.setState(state => {
    // // phần này og xem lại lần trước t giải thích về chỗ này rồi
    //   const list = state.documents.push(value);
    //   return {
    //     list
    //   };
    // });

    let { newfile, documents } = this.state;
    newfile = false;
    this.setState({ newfile: newfile });
    documents.push({})
    this.setState({ documents: [...documents] });
  };

  renderUploadButton = () => {
    const { newfile } = this.state;
    if (newfile) {
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
    //FIXME: không khai báo trong render, render không có mục đích để làm việc này, khai báo nó ở bên ngoài
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
    //FIXME: không khai báo trong render
    //phần này nên tách thành 1 hàm riêng cho việc render array này
    let input = this.state.documents.map((item, i) => (
      //FIXME: key cần để là string,không phải number
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
