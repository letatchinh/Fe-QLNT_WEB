import { Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import api from '../../api'
import CardRoom from '../../components/Room/CardRoom'

export default function Index() {
const [rooms,setRooms] = useState([])
const [loading,setLoading] = useState(false)
useEffect(() => {
  const fetch = async () => {
    setLoading(true)
    const res = await api.room.getAll()
    setRooms(res)
    setLoading(false)
  }
  fetch()
},[])
  return (
   <Row wrap='wrap' gutter={16} justify='space-evenly'>
    {loading ? <div>Loading...</div> : rooms?.map((e,i) => <Col key={i} span={6}><CardRoom item={e}/></Col>) }
   </Row>
  )
}
