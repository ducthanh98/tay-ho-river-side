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
    // let name = e.target.value;
    // this.setState(prevState => {
    //   let value = Object.assign({}, prevState.value);  // creating copy of state variable jasper
    //   value.name = name;                // update the name property, assign a new value                 
    //   return { value };
    // })
    this.setState({name: e.target.value});
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
        // let item = {name: this.state.value, url: data.data[0].fileUrl}
        // let item = {name: this.state.name, url: data.data[0].fileUrl}
        
        this.setState(state => {
          const list = state.documents.push;
          list.map(e => {
            if(e !== 'null') {
              
            }
          })
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
          // value={item.name}
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