import { Button, Divider, Form, Input, InputNumber, Row } from 'antd'
import React from 'react'
import { toast } from 'react-toastify';
import api from '../../api';
import GroupButtonForm from '../../components/GroupButton/Index';

export default function FormUser({onCancel}) {
    const onFinish = async(values) => {
        const res = await api.user.create(values)
        console.log(res,"res");
        if(res){
            toast.success("Tạo người dùng thành công")
            onCancel()
        }
    }
  return (
    <div>
        <Divider>Tạo người dùng</Divider>
        <Form
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
       <GroupButtonForm onCancel={onCancel}/>
        </Form>
    </div>
  )
}
