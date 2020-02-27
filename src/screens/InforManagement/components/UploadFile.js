import React, { } from 'react';
import './Upload.css'
import { Icon } from 'antd';

class Uploadfile extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      value: this.props.values,
      name: '',
      documents: this.props.documents,
      isUpload: true,
      listUpload: this.props.listUpload,
      id: ''
    }
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  removeFile = (id) => {
    this.setState(prevState => ({
      documents: prevState.listUpload.map(
      obj => (obj.id === id ? Object.assign(obj, { url: "" }) : obj)
    )
    }));
    this.setState({ isUpload: true })
  }

  changeFile = (id) => {

    this.setState({ isUpload: true })
    this.setState(state => {
      const list = state.documents.splice(id,1);
      return {
        list
      };
    });

  }

  onChangeHandler = async (event)=>{

    let formData = new FormData();
    formData.append('file', event.target.files[0]);
    this.setState({name: event.target.files[0].name})

    fetch('http://139.162.53.137:3000/api/v1/file/upload', {
      method: 'POST',
      body: formData
      })
      .then((res)=>{
        return res.json()
      }).then((data)=>{
        this.setState({ isUpload: false })
        let id = this.state.documents.length;
        this.setState({id: id});
        let item = {id: id, name: this.state.value, url: data.data[0].fileUrl}
        
        this.setState(state => {
          const list = state.documents.push(item);
          return {
            list
          };
        });
      console.log(this.state.documents)
      })
      .catch((error) => console.log(error))
  }

  render() {

    let upload;
    if(this.state.isUpload) {
      upload = 
      <div>
        <div>
          <label className={'upfile'} htmlFor="formlabel">
            <Icon className={'image'} type="file-pdf" />
            Select file
          </label>
          <input style= {{display: 'none'}} type="file" name="file" id="formlabel" onChange={this.onChangeHandler}/>
        </div>
      </div>
    } else {
      upload = 
      <div>
        <div>
          <label className={'upfile'} htmlFor="formlabel1">
            {this.state.name}
            <button type="button" onClick={() => this.changeFile(this.state.id)}><Icon type="swap"/></button>
            <button type="button" onClick={() => this.removeFile(this.state.id)}><Icon type="delete"/></button>
          </label>
        </div>
      </div>
    }

    return (
      <div style = {{paddingTop: '20px'}}>
        <div>
          <label>
            Tên file
            <div>
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </div>
          </label>
        </div>
        <div>
          {upload}
        </div>
      </div>
  
    );
  }
}

export default Uploadfile;
