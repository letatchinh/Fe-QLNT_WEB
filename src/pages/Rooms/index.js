import { Col, Row } from 'antd'
import React from 'react'
import CardRoom from '../../components/Room/CardRoom'

export default function index() {
  return (
   <Row wrap='wrap' gutter={16} justify='space-evenly'>
     <Col span={6}><CardRoom /></Col>
     <Col span={6}><CardRoom /></Col>
     <Col span={6}><CardRoom /></Col>
     <Col span={6}><CardRoom /></Col>
     <Col span={6}><CardRoom /></Col>
   </Row>
  )
}
