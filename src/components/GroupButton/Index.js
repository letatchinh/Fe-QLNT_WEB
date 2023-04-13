import { Button, Row } from 'antd'
import React from 'react'

export default function GroupButtonForm({onCancel,onOk,text}) {
  return (
    <Row>
       <Button onClick={onCancel} style={{margin : '0 auto', width : '200px'}}>Huỷ</Button>
       <Button style={{margin : '0 auto', width : '200px'}} type='primary' htmlType='submit'>{text ? text : 'Tạo'}</Button>
       </Row>
  )
}
