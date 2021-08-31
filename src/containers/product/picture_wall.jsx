import React from 'react';
import { Upload, Icon, Modal, message } from 'antd';
import { BASE_URL } from '../../config';
import { reqDeletePic } from '../../api';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],//上传的图片
  };

  //从fileList提取出所有商品名字
  gitImgArr=()=>{
    let result=[]
    this.state.fileList.forEach((item)=>{
      result.push(item.name)
    })
    return result
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = async({ file,fileList }) => {
    if (file.status === 'done') {
      console.log(file.response.data.url)
      fileList[fileList.length-1].url=file.response.data.url
      fileList[fileList.length-1].name=file.response.data.name
    }
    if (file.status === 'removed') {
      let result = await reqDeletePic(file.name)
      const {status,msg}=result
      if (status===0)message.success('删除成功')
      else message.error(msg)
    }
    this.setState({ fileList });
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action={`${BASE_URL}/manage/img/upload`}
          method='post'
          name='image'
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 4 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
