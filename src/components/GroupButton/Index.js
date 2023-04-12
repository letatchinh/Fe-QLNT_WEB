import { Button, Row } from 'antd'
import React from 'react'

export default function GroupButtonForm({onCancel,onOk}) {
  return (
    <Row>
       <Button onClick={onCancel} style={{margin : '0 auto', width : '200px'}}>Huỷ</Button>
       <Button style={{margin : '0 auto', width : '200px'}} type='primary' htmlType='submit'>Tạo</Button>
       </Row>
  )
}
