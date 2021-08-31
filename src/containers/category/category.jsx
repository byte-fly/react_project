import React from 'react'
import { Table,Card,Button,Icon,message,Modal,Input,Form } from 'antd';
import { connect } from 'react-redux';
import { reqCategoryList,reqAddCategory,reqUpdateCategory } from '../../api';
import { creatSaveCategoryAction } from '../../redux/action_creators/category_action';
import {PAGE_SIZE} from '../../config/index'


@connect(
  state=>({}),
  {saveCategory:creatSaveCategoryAction}
)
@Form.create()
class Category extends React.Component{

  state={
    categoryList:[],
    visible: false,
    operType:'',
    isLoading:true,
    modalCurrentValue:'',
    modalCurrentId:''

  }

  getCategory= async()=>{
    let result=await reqCategoryList()
    this.setState({isLoading:false})
    const {status,data,msg}=result
    if(status===0) {
      this.setState({categoryList:data.reverse()})
      //把商品分类信息存入redux
      this.props.saveCategory(data)
    }
    else message.error(msg)
  }

  componentDidMount(){
    this.getCategory()
  }

  showAdd = () => {
    this.setState({
      operType:'add',
      visible: true,
      modalCurrentValue:'',
      modalCurrentId:''
    });
  };

  showUpdate = (item) => {
    console.log(item)
    const {_id,name}=item

    this.setState({
      modalCurrentValue:name,
      modalCurrentId:_id,
      operType:'update',
      visible: true,
    });
  };
  
  toAdd=async(value)=>{
    let result = await reqAddCategory(value.categoryName)
    const {status,msg}= result
    if (status===0) {
      message.success('新增商品分类成功',1)
      // let categoryList=[...this.state.categoryList]
      // categoryList.unshift(data)
      // this.setState({categoryList,visible:false})
      this.getCategory()
      this.setState({visible:false})
      this.props.form.resetFields()
    }
    if (status===1) {
      message.error(msg,1)
    }
  }

  toUpdate=async(modalCurrentId,categoryName)=>{
    let result = await reqUpdateCategory(modalCurrentId,categoryName)
    const {status,msg}= result
    if (status===0) {
      message.success('更新分类名成功',1)
      this.setState({visible:false})
      this.props.form.resetFields()
      this.getCategory()
    } else {
      message.error(msg,1)
    }
  }

  handleOk = () => {
    const {operType}= this.state
    this.props.form.validateFields((err,values)=>{
      if (err) {
        message.warning('表单输入有误，请检查',1)
        return 
      }
      if (operType==='add') this.toAdd(values)
      if (operType==='update') this.toUpdate(this.state.modalCurrentId,values.categoryName)
    })

  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
    this.props.form.resetFields()
  };

  render(){
    const dataSource = this.state.categoryList
    const {Item} = Form
    const { getFieldDecorator } = this.props.form;
    const {visible,operType}=this.state
    const columns = [
      {
        title: '分类名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        // dataIndex:'categoryName',
        render:(item)=>{return <Button onClick={()=>{this.showUpdate(item)}}>修改分类</Button>},
        width:'25%',
        align:'center',
      },
    ];


    
    return(
      <div>
        <Card
          extra={<Button type='primary' onClick={this.showAdd}><Icon type='plus-circle'/>添加</Button>}
        >
        <Table 
          dataSource={dataSource} 
          columns={columns} 
          bordered
          rowKey="_id"
          pagination={{pageSize:PAGE_SIZE,showQuickJumper:true}}
          loading={this.state.isLoading}
        />
        </Card>
        <Modal
          title={operType==="add"?'新增分类':'修改分类'}
          visible={visible}
          okText='确认'
          cancelText='取消'
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
              {getFieldDecorator('categoryName', {
                initialValue:this.state.modalCurrentValue,
                rules: [
                  { required: true, message: '类名不能为空' },
                ],
              })(
                <Input
                  placeholder="请输入类名"
                />,
              )}
            </Item>
          </Form>
        </Modal>
      </div>

      

    )
  }
}
export default Category