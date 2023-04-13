import { Button, Col, Form, InputNumber, Row } from 'antd'
import React, { useEffect } from 'react'
import { useState } from 'react';
import Parameter from '../../components/Brem/Parameter';
import api from '../../api';
import { get } from 'lodash';
import moment from 'moment';
import { CheckOutlined } from '@ant-design/icons';
import { getDateMonthYearNow, getDateNow, getDatePreMonth, getPreMonth } from '../../utils';
import { toast } from 'react-toastify';

const span = 12
export default function FormCharge({room,onCancel}) {
    const {brems,_id} = room;
    const [meters,setMeter] = useState({meterNow:null,meterPre:null})
    const [form] = Form.useForm()
    useEffect(() => {
      const fetch = async () => {
        const [date, month, year] = getDateMonthYearNow()
        const res = await api.meter.getPreAndMonthNow({idRoom : _id,date})
        if(res){
          const {meterNow} = res
          setMeter(res)
          form.setFieldsValue({electricity:get(meterNow,'electricity'),water : get(meterNow,'water')})
        }
      } 
      fetch()
    },[room])
    const onFinish = (values) => {
      console.log(values,"values");
    }
    const handleSave = async() => {
      try {
          const {electricity, water} =  form.getFieldsValue()
          const submitData = {idRoom : _id , date : getDateNow(),electricity, water}
          const res  = await api.meter.createOrUpdate(submitData)
          if(res){
            if(get(res,'status','')==='create'){
              toast.success("Thêm thành công số điện nước")
            }
            if(get(res,'status','')==='update'){
              toast.success("Cập nhật thành công số điện nước")
            }
            form.resetFields()
            onCancel()
          }
         
          //  form.submit()
      } catch (error) {
        console.log(error);
      }
    }
  return (
    <>
    <Parameter brem={brems}/>
        <Form form={form} onFinish={onFinish}>
   <Row>
    <Col span={span}>
    <Form.Item label='Số điện tháng này' name='electricity'>
    <InputNumber addonAfter={`Số điện tháng trước ${get(meters,'meterPre.electricity',0)}`}/>
</Form.Item>
    </Col>
    <Col span={span}>
    <Form.Item label='Số nước tháng này' name='water'>
    <InputNumber addonAfter={`Số nước tháng trước ${get(meters,'meterPre.water',0)}`}/>
</Form.Item>
    </Col>
   </Row>
   <Row>
       <Button onClick={onCancel} style={{margin : '0 auto', width : '200px'}}>Huỷ</Button>
       <Button onClick={handleSave} style={{margin : '0 auto', width : '200px'}}><CheckOutlined />Lưu</Button>
       <Button style={{margin : '0 auto', width : '200px'}} type='primary' htmlType='submit'>Tính tiền</Button>
       </Row>
    </Form>
    </>
  )
}
