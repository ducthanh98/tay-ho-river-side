import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Upload, Input, Button, notification } from "antd";
import "antd/dist/antd.css"; //FIXME: đã được import từ trước
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
      // fileList: [],
      newfile: true,
      documents: this.props.documents
    };
  }

  handleCancel = () => this.setState({ previewVisible: false });

  // handleChange = ({ fileList }) => {
  //   this.setState({ fileList })
  // };

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
        this.setState(state => {
          const list = state.documents;
          list.pop();
          list.push(item);
          return {
            list
          };
        });
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
    //FIXME: không nên gọi trực tiếp state thế này
    //luồng của nó là:
    // - khai báo biến, state
    // - thay đổi state
    //gọi setState để render lại

    //FIXME: tại sao thêm file mới mà newfile lại là false
    // this.setState({ newfile: false });
    //FIXME: với các biến không đổi giá trị thì sử dụng biến const thay cho let
    // let value = {};
    // this.setState(state => {
    //phần này og xem lại lần trước t giải thích về chỗ này rồi
    //   const list = state.documents.push(value);
    //   return {
    //     list
    //   };
    // });

    //vidu
    const { newfile } = this.state;
    // tránh trường hợp khi bấm 2 lần liên tiếp
    if (newfile) return;
    this.setState({ newfile: true });
    //init empty object
    //TODO: kiểm tra lại liệu có thực sự cần object rỗng thế này không
    this.state.documents.push({});
    this.setState({ newfile: false });
  };

  renderUploadButton = () => {
    //FIXME: không nên gọi trực tiếp state thế này
    //luồng của nó là:
    // - khai báo biến, state
    // - check điều kiện theo biến state

    //vidu
    const { newfile } = this.state;
    if (newfile) {
      return null;
    }
    //hạn chế dùng thẻ div, ưu tiên sử dụng các thẻ trong ant design
    return (
      <div>
        <UploadOutlined />
        <div>Up Image</div>
      </div>
    );

    // if (this.state.newfile) return null;
    // return (
    //   <div>
    //     <UploadOutlined />
    //     <div>Up Image</div>
    //   </div>
    // );
  };
  dummyRequest = ({ file, onSuccess }) => {
    //FIXME: mục đích của nó là gì thế
    //với hiện tại chưa quản lý các biến timeout được tạo ra sẽ dẫn đến leak memory, ảnh hưởng performancce

    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  render() {
    //FIXME: không khai báo trong render, render không có mục đích để làm việc này, khai báo nó ở bên ngoài
    //og nên đặt lại biến sao cho dễ hiểu, miêu tả đúng mục đích
    let b = (
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
            {/* //FIXME: hàm render array sẽ được gọi ở đây  */}
            {input}
          </div>
          {/* FIXME: phần này cần sửa lại  */}
          <div style={{ marginLeft: "5px" }}>{b}</div>
        </div>
      </div>
    );
  }
}

export default UploadFile;
