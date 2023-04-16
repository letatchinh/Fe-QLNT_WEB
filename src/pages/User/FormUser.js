import { Button, Divider, Form, Input, InputNumber, Row } from 'antd'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify';
import api from '../../api';
import GroupButtonForm from '../../components/GroupButton/Index';

export default function FormUser({onCancel,select}) {
    const [form] = Form.useForm()
    const onFinish = async(values) => {
        if(select){
            const res = await api.user.update({...values,_id :select._id })
            if(res){
                toast.success("Cập nhật người dùng thành công")
                onCancel()
            }
        }
        else{
            const res = await api.user.create(values)
            if(res){
                toast.success("Tạo người dùng thành công")
                onCancel()
            }
        }
     
    }
    useEffect(() => {
        form.resetFields()
        if(select){
            const {name,CMND,countryside,phone,email} = select
            form.setFieldsValue({name,CMND,countryside,phone,email})
        }
    },[select])
  return (
    <div>
        <Divider>{select ? "Cập nhật người dùng" :"Tạo người dùng"}</Divider>
        <Form
        form={form}
        labelAlign='left'
        wrapperCol={{md : 12,lg : 12,sm : 24,xs : 24}}
        labelCol={{md : 10,lg : 10}}
         onFinish={onFinish}>
        <Form.Item
        label='Tên'
        name='name'
        >
            <Input />
        </Form.Item>
        <Form.Item
        label='Chứng minh nhân dân / CCCD'
        name='CMND'
        >
            <InputNumber style={{width : '150px'}} />
        </Form.Item>
        <Form.Item
        label='Quê quán'
        name='countryside'
        >
            <Input />
        </Form.Item>
        <Form.Item
        label='Số điện thoại'
        name='phone'
        >
            <Input />
        </Form.Item>
        <Form.Item
        label='Email'
        name='email'
        >
            <Input />
        </Form.Item>
       <GroupButtonForm text={select ? "Cập nhật" : "Tạo mới"} onCancel={onCancel}/>
        </Form>
    </div>
  )
}
