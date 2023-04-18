import { Button, Col, Divider, Form, Input, InputNumber, Radio, Row, Select, Tag, Typography } from 'antd'
import { get } from 'lodash';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import api from '../../api';
import GroupButtonForm from '../../components/GroupButton/Index';

export default function FormGroupRoom({optionsStaff,selectGroup,onCancel,setNewGroup,setNewGroupRoomUpdate}) {
    const [form] = Form.useForm()
    const [loading,setLoading] = useState(false)
    useEffect(() => {
        form.resetFields()
        if(selectGroup){
          console.log(selectGroup,"selectGroup");
            form.setFieldsValue({...selectGroup,idAccount:get(selectGroup,'idAccount._id')})
        }
    },[selectGroup])
    const onFinish = async(values) =>{
        if(selectGroup){
            const res = await api.groupRoom.update({...values,_id:selectGroup._id})
            if(res.status){
                toast.success("Cập nhật khu nhà thành công")
                form.resetFields()
                // setNewGroupRoomUpdate(get(res,'data',{}))
                onCancel()
            }
            else{
                toast.error(get(res,'message','Cập nhật khu nhà thất bại'))
            }
        }
        else{
            const res = await api.groupRoom.create(values)
            if(res.status){
                toast.success("Tạo khu nhà thành công")
                form.resetFields()
                // setNewGroup(get(res,'createGroupRoom',{}))
                onCancel()
            }
            else{
                toast.error(get(res,'message','Tạo khu nhà thất bại'))
            }
        }
    }
  return (
    <div>
    <Divider>{selectGroup ? "Cập nhật người dùng" :"Tạo người dùng"}</Divider>
    <Form
    form={form}
    labelAlign='left'
    wrapperCol={{md : 12,lg : 12,sm : 24,xs : 24}}
    labelCol={{md : 10,lg : 10}}
     onFinish={onFinish}>
    <Form.Item
    label='Chọn người quản lí'
    name='idAccount'
    rules={[
        {
          required: true,
          message: 'Please input your idAccount!',
        },
      ]}
    >
       <Select options={optionsStaff}/>
    </Form.Item>
    <Form.Item
    label='Tên khu nhà'
    name='name'
    rules={[
        {
          required: true,
          message: 'Please input your name!',
        },
      ]}
    >
       <Input />
    </Form.Item>
    <Form.Item
    label='Số tầng'
    name='countFloor'
    rules={[
        {
          required: true,
          message: 'Please input your countFloor!',
        },
      ]}
    >
        <InputNumber />
    </Form.Item>
    <Form.Item
    label='Số phòng'
    name='countRoom'
    rules={[
        {
          required: true,
          message: 'Please input your countRoom!',
        },
      ]}
    >
        <InputNumber />
    </Form.Item>

   <GroupButtonForm loading={loading} text={!!selectGroup ? "Cập nhật" : "Tạo mới"} onCancel={onCancel}/>
    </Form>
</div>
  )
}
