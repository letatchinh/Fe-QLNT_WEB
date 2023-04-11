import { BgColorsOutlined, DeleteOutlined, DollarCircleOutlined, ThunderboltOutlined, WifiOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Form, Input, InputNumber, Row, Typography } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { get } from 'lodash'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import api from '../../../api'
const gutter = 16
const span = 12
const span4 = 4
const {Text} = Typography
export default function Create() {
    const [form] = useForm()
    const [bremNumber,setBremNumber] = useState(0)
    useEffect(() => {
        const fetch = async () => {
            const {lastBrem} = await api.brem.getLastNumber()
            setBremNumber(get(lastBrem,'bremNumber'))
        }
        fetch()
    },[])
    const onFinish = async(values) => {
      const submitData = {...values,bremNumber}
     const res = await api.brem.create(submitData)
        if(res){
            toast.success("Tạo brem thành công")
            form.resetFields()
            setBremNumber(bremNumber + 1)
        }
    }
  return (
    <Form className='form-center'  onFinish={onFinish}>
        <Row gutter={gutter}>
            <Col span={span}>
            <Form.Item label='Tên brem' name="name" >
          <Input/>
        </Form.Item>
            </Col>
            <Col span={span}> <Form.Item label='Mã số brem' name="bremNumber" >
          <InputNumber placeholder={bremNumber} disabled/>
        </Form.Item></Col>
        </Row>
        <Divider>Chỉ số brem</Divider>
        <Row justify={'space-between'} >
            <Col span={span4}>
            <Form.Item label={<Text>Giá điện <ThunderboltOutlined /></Text>} name="electricityPrice" >
          <Input/>
        </Form.Item>
            </Col>
            <Col span={span4}>
            <Form.Item label={<Text>Giá nước <BgColorsOutlined /></Text>} name="waterPrice" >
          <Input/>
        </Form.Item>
            </Col>
            <Col span={6}>
            <Form.Item label={<Text>Giá thuê phòng <DollarCircleOutlined /></Text>} name="rent" >
          <Input/>
        </Form.Item>
            </Col>
            <Col span={span4}>
            <Form.Item label={<Text>Giá wifi <WifiOutlined /></Text>} name="wifi" >
          <Input/>
        </Form.Item>
            </Col>
            <Col span={span4}>
            <Form.Item label={<Text>Giá rác <DeleteOutlined /></Text>} name="trash" >
          <Input/>
        </Form.Item>
            </Col>
        </Row>
        <Button style={{width : '200px' , margin : '0 auto'}}  htmlType='submit' type='primary'>Tạo brem</Button>
    </Form>
  )
}
