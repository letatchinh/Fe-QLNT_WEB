import { Button, Col, Divider, Form, Input, InputNumber, Radio, Row, Select, Tag, Typography } from 'antd'
import { get } from 'lodash';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import api from '../../api';
import GroupButtonForm from '../../components/GroupButton/Index';
import { GENDER, GENDER_VI } from '../../constant/defaultValue';

export default function FormUser({onCancel,selectUser}) {
    const [form] = Form.useForm()
    const [loading,setLoading] = useState(false)
    const [hobbys,setHobbys] = useState([])
    const [listHobbys,setListHobbys] = useState([])
    const onFinish = async(values) => {
        if(!!selectUser){
            setLoading(true)
            const res = await api.user.update({...values,_id :selectUser._id,hobbys })
            if(res){
                toast.success("Cập nhật người dùng thành công")
                onCancel()
            }
            setLoading(false)
        }
        else{
            setLoading(true)
            const res = await api.user.create({...values,hobbys})
            if(res){
                toast.success("Tạo người dùng thành công")
                onCancel()
            }
            setLoading(false)
        }
     
    }
    useEffect(() => {
        form.resetFields()
        if(selectUser){
            const {name,CMND,countryside,phone,email,hobbys} = selectUser
            form.setFieldsValue({name,CMND,countryside,phone,email})
            setHobbys(hobbys?.map(e => e._id))
        }
        const fetchHobby = async() => {
            const res  = await api.hobby.getAll()
            setListHobbys(res.map(e => ({label : get(e,'name'),value : get(e,'_id')})))
        }
        fetchHobby()
    },[selectUser])
    const onhandleChange = (value) => {
        const exist = hobbys.some(e => e === value)
        if(!exist){
          const submitData = [...hobbys, value];
          setHobbys(submitData);
        }
       
      };
      const deleteTag = (removedTag) => {
        const newTags = hobbys.filter((tag) => tag !== removedTag);
        setHobbys(newTags);
      };
  return (
    <div>
        <Divider>{selectUser ? "Cập nhật người dùng" :"Tạo người dùng"}</Divider>
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
        label='Giới tính'
        name='gender'
        >
            <Radio.Group>
            <Radio value={GENDER.male}> {GENDER_VI.male} </Radio>
            <Radio value={GENDER.female}> {GENDER_VI.female} </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
        label='Chứng minh nhân dân / CCCD'
        name='CMND'
        >
            <InputNumber style={{width : '150px'}} />
        </Form.Item>
        <Form.Item
        label='Mã SV'
        name='MaSv'
        >
            <Input />
        </Form.Item>
        <Form.Item
        label='Ngành'
        name='branch'
        >
            <Input />
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
        <Form.Item
        label='Sở thích'
        name='hobbys'
        >
            <Select onChange={onhandleChange} options={listHobbys}/>
        </Form.Item>
        <Row style={{margin : '10px 0'}}>
          <Col span={10}>
            <Typography.Text>Sở thích</Typography.Text>
          </Col>
          <Col span={14}>
          {hobbys?.map((e) => {
            const findOne = listHobbys?.find((item) => item.value === e);
            return (
              <Tag
                color="blue"
                closable
                onClose={() => deleteTag(findOne.value)}
              >
                {get(findOne,'label')}
              </Tag>
            );
          })}
          </Col>
        </Row>
       <GroupButtonForm loading={loading} text={!!selectUser ? "Cập nhật" : "Tạo mới"} onCancel={onCancel}/>
        </Form>
    </div>
  )
}
