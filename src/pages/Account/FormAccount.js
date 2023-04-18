import { Button, Col, Divider, Form, Input, InputNumber, Radio, Row, Select, Tag, Typography } from 'antd'
import { get } from 'lodash';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import api from '../../api';
import GroupButtonForm from '../../components/GroupButton/Index';

export default function FormAccount({selectAccount,onCancel,setNewAccount,setNewAccountUpdate}) {
    const [form] = Form.useForm()
    const [loading,setLoading] = useState(false)
    useEffect(() => {
        form.resetFields()
        if(selectAccount){
            form.setFieldsValue({...selectAccount})
        }
    },[selectAccount])
    const onFinish = async(values) =>{
        if(selectAccount){
            const res = await api.account.update({values,_id:selectAccount._id})
            if(res.status){
                toast.success("Cập nhật tài khoản thành công")
                form.resetFields()
                setNewAccountUpdate(get(res,'data',{}))
                onCancel()
            }
            else{
                toast.error(get(res,'message','Cập nhật tài khoản thất bại'))
            }
        }
        else{
            const res = await api.account.create(values)
            if(res.status){
                toast.success("Tạo tài khoản thành công")
                form.resetFields()
                setNewAccount(get(res,'createAccount',{}))
                onCancel()
            }
            else{
                toast.error(get(res,'message','Tạo tài khoản thất bại'))
            }
        }
    }
  return (
    <div>
    <Divider>{selectAccount ? "Cập nhật người dùng" :"Tạo người dùng"}</Divider>
    <Form
    form={form}
    labelAlign='left'
    wrapperCol={{md : 12,lg : 12,sm : 24,xs : 24}}
    labelCol={{md : 10,lg : 10}}
     onFinish={onFinish}>
    <Form.Item
    label='Tên'
    name='name'
    rules={[
        {
          required: true,
          message: 'Please input your Name!',
        },
      ]}
    >
        <Input />
    </Form.Item>
    <Form.Item
    label='Tài khoản'
    name='username'
    rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
        <Input disabled/>
    </Form.Item>
    <Form.Item
    label='Mật khẩu'
    name='password'
    rules={[
        {
          required: true,
          message: 'Please input your Password!',
        },
      ]}
    >
        <Input />
    </Form.Item>

   <GroupButtonForm loading={loading} text={!!selectAccount ? "Cập nhật" : "Tạo mới"} onCancel={onCancel}/>
    </Form>
</div>
  )
}
