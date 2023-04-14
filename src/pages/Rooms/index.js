import { Col, Divider, Modal, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import api from '../../api'
import CardRoom from '../../components/Room/CardRoom'
import FormCharge from './FormCharge'

export default function Index() {
const [rooms,setRooms] = useState([])
console.log(rooms,"rooms");
const [selectRoom,setSelectRoom] = useState(null)
const [loading,setLoading] = useState(false)
const [visible,setVisible] = useState(false)
const onCancel = () => {
  setVisible(false)
  setSelectRoom(null)
}
const handleOpen = (room) => {
  setSelectRoom(room)
  setVisible(true)
}
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
    {loading ? <div>Loading...</div> : rooms?.map((e,i) => <Col key={i} span={6}><CardRoom handleOpen={() => handleOpen(e)} item={e}/></Col>) }
    <Modal width={1000} open={visible} onCancel={onCancel} footer={null} >
      {selectRoom ? <FormCharge onCancel={onCancel} room={selectRoom}/> : null}
    </Modal>
   </Row>
  )
}
