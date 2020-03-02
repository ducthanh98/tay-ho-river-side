import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Upload, Input, Button } from 'antd';
import 'antd/dist/antd.css';
import './Upload.css';


class UploadFile extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      previewVisible: false,
      previewImage: '',
      // value: {name: '', url: ''},
      name: '',
      fileList: [],
      newfile: true,
      documents: this.props.documents
    };
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handleChange = ({ fileList }) => {
    this.setState({ fileList })
  };

  handleChangeName = (e) => {
    console.log('change')
    this.setState({name: e.target.value});
  }

  onRemove = (e) => {
    console.log('remove', e)
  }

  upLoad = (file) => {
    this.setState({newfile: true})
    console.log('asdff', file.name)
    let formData = new FormData();
    formData.append('file', file);

    fetch('http://139.162.53.137:3000/api/v1/file/upload', {
      method: 'POST',
      body: formData
      })
      .then((res)=>{
        return res.json()
      }).then((data)=>{
        let item = {name: this.state.name, url: data.data[0].fileUrl}
        this.setState(state => {
          const list = state.documents;
          list.pop();
          list.push(item);
          return {
            list
          };
        });

        console.log('data', this.state.documents)
      })
      .catch((error) => console.log(error))
  }

  addNewFile = () => {
    this.setState({newfile: false})
    let value = {};
    this.setState(state => {
      const list = state.documents.push(value);
      return {
        list
      };
    });  
  }

  renderUploadButton = () => {
    if(this.state.newfile) return null;
    return (
      <div>
        <UploadOutlined />
        <div>Up Image</div>
      </div>
    );
  };

  dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  render() {
    let b = 
        <div>
          <div className="clearfix">
            <Upload
              action={this.upLoad}
              // beforeUpload={this.beforeUpload}
              // method="PUT"
              listType="picture-card"
              onRemove={this.onRemove(this.state.name)}
              // fileList={fileList}
              // onPreview={this.handlePreview}
              onChange={this.handleChange}
              customRequest={this.dummyRequest}
            >
              {this.renderUploadButton()}
            </Upload>
          </div>
        </div>
      let input = this.state.documents.map((item, i) => 
      <div key={i}>
        <Input style={{width: '105px'}} 
          placeholder="Input name"
          onChange={this.handleChangeName}
        />
      </div>)
    return (
      <div>
        <Button type="primary" onClick={this.addNewFile}>New File</Button>
        <div>
          <div style={{display: 'flex'}}>{input}</div>
          {b}
        </div>
      </div>
    );
  }
}

export default UploadFile