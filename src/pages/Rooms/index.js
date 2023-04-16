import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Col, Divider, Modal, Row, Switch, Typography } from 'antd'
import Search from 'antd/es/input/Search';
import React, { useEffect, useState } from 'react'
import { useNavigate, useRoutes } from "react-router-dom";
import api from '../../api'
import CardRoom from '../../components/Room/CardRoom'
import { PATH_APP } from '../../routes/path'
import FormCharge from './FormCharge'

export default function Index() {
const [rooms,setRooms] = useState([])
const [roomShow,setRoomShow] = useState(null)
const [isSwitch,setIsSwitch] = useState(false)
const navigate = useNavigate();
const [selectRoom,setSelectRoom] = useState(null)
const [loading,setLoading] = useState(false)
const [visible,setVisible] = useState(false)
const [valueSearcher,setValueSearcher] = useState('')
const onCancel = () => {
  setVisible(false)
  setSelectRoom(null)
}
const handleOpen = (room) => {
  setSelectRoom(room)
  setVisible(true)
}
const handleUpdate = (id) => {
  navigate(`${PATH_APP.rooms.update}/${id}`)
}
const setNewRoom = (newRoom) => {
  const newRooms = rooms.map((room) => {
    if(newRoom._id === room._id){
      return newRoom
    }
    return room
  })
  setRooms(newRooms)
}
useEffect(() => {
  const fetch = async () => {
    setLoading(true)
    const res = await api.room.getAll()
    setRooms(res)
    setRoomShow(res)
    setLoading(false)
  }
  fetch()
},[])
const handleSwitch = (value) => {
  setIsSwitch(value)
  if(value){
    setRoomShow(rooms.filter(e => !e.bill && (e.roomNumber.toString() == value)))
  }
  else {
    setRoomShow(rooms.filter(e => e.roomNumber.toString().includes(value)))
  }
}
const onSearch = (value) => {
  if(isSwitch){
    setRoomShow(rooms.filter(e => !e.bill && (e.roomNumber.toString().includes(value)) ))
  }
  else{
    setRoomShow(rooms.filter(e => (e.roomNumber.toString().includes(value)) ))
  }
}

  return (
    <>
     <Row style={{alignItems : 'center'}} justify='space-between'>
     <Col>
     <Search value={valueSearcher} onChange={(e) => setValueSearcher(e.target.value)} placeholder="Nhập số phòng..." onSearch={onSearch} enterButton />

     </Col>
     <Col>
     <Switch
      checkedChildren={<CheckOutlined />}
      unCheckedChildren={<CloseOutlined />}
      defaultChecked
      value={isSwitch}
      onChange={handleSwitch}
    />
    <Typography.Text>Đã thanh toán</Typography.Text>
     </Col>
     </Row>
    <Row wrap='wrap' gutter={16} justify='space-evenly'>
   
   {loading ? <div>Loading...</div> : roomShow?.map((e,i) => <Col key={i} span={6}><CardRoom handleUpdate={() => handleUpdate(e._id)} handleOpen={() => handleOpen(e)} item={e}/></Col>) }
   <Modal width={1000} open={visible} onCancel={onCancel} footer={null} >
     {selectRoom ? <FormCharge setNewRoom={setNewRoom} onCancel={onCancel} room={selectRoom}/> : null}
   </Modal>
  </Row>
    </>
   
  )
}
