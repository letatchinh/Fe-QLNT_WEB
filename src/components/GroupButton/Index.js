import { Button, Row } from 'antd'
import React from 'react'

export default function GroupButtonForm({onCancel,onOk,text,loading}) {
  return (
    <Row>
       <Button onClick={onCancel} style={{margin : '0 auto', width : '200px'}}>Huỷ</Button>
       <Button loading={loading} style={{margin : '0 auto', width : '200px'}} type='primary' htmlType='submit'>{text ? text : 'Tạo'}</Button>
       </Row>
  )
}
