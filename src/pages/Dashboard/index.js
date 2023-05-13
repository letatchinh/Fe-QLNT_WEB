import { Card, Col, DatePicker, Divider, Row, Select, Statistic, Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react'
import api from '../../api';
import { formatDate, getMonthNow } from '../../utils';
import CountUp from 'react-countup';
import { get } from 'lodash';
import moment from "moment";
import { KEY_STORED, ROLE } from '../../constant/defaultValue';
import RequestJoinRoom from './RequestJoinRoom';

export default function Index() {
  const [date,setDate] = useState(getMonthNow())
  const [data,setData] = useState(null)
  
  const [profile,setProfile] = useState(null)
  useEffect(() => {
    const acc = JSON.parse(localStorage.getItem(KEY_STORED))
    setProfile(acc)
  },[localStorage.getItem(KEY_STORED)])
  const [rooms,setRooms] = useState([])
  const [filter,setFilter] = useState({idRoom:null})
  const [loading,setLoading] = useState(null)
  const handleChangeStartDate = (dates,dateString) => {
    setDate({...date,startDate : moment(dateString).format(formatDate)})
  }
  const handleChangeEndDate = (dates,dateString) => {
    setDate({...date,endDate : moment(dateString).format(formatDate)})
  }
  const formatter = (value) => <CountUp end={value} separator="," />;
  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      const res = await api.bill.getStastics({...date,...filter,role:get(profile,'role',''),idAccount : get(profile,'_id','')})
      setData(res)
      setLoading(false)
    }
    profile&& fetch()
  },[date.endDate,filter,profile])
  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      const rooms = await api.room.getAllById({id : profile._id,role : get(profile,'role','')})
      const options = rooms?.map(e => ({label : `Phòng số ${get(e,'roomNumber','')}`,value : get(e,'_id','')}))
      setRooms(options)
      setLoading(false)
    }
   profile && fetch()
  },[profile])

 
  return (
    <div>
    <Divider>{get(data,'groupRooms') ?  `Khu nhà ${get(data,'groupRooms.name','')}` : 'Tất cả phòng'}</Divider>
      <Row style={{alignItems : 'center'}} gutter={16}>
   <Col span={6}>
   <Row style={{alignItems : 'center'}}>
      <Col span={8}>
      <Typography.Text>Chọn phòng</Typography.Text>
      </Col>
     <Col flex={1}>

     <Select loading={loading} defaultValue={null} options={[{label : 'Tất cả phòng',value : null},...rooms]} onChange={(value) => setFilter({idRoom : value})} style={{width : '100%'}}/>
     </Col>
      </Row>
   <Row style={{alignItems : 'center'}}>
      <Col span={8}>
      <Typography.Text>Từ ngày</Typography.Text>
      </Col>
     <Col flex={1}>

     <DatePicker  format={'YYYY/MM/DD'}  onChange={handleChangeStartDate}/>
     </Col>
      </Row>
   <Row>
   <Col span={8}>
      <Typography.Text>Đến ngày</Typography.Text>
      </Col>
     <Col flex={1}>
     <DatePicker  format={'YYYY/MM/DD'}  onChange={handleChangeEndDate}/>
     </Col>
      </Row>
   </Col>
     
     <Col span={18}>
     <Row justify='space-between' >
    <Col span={4}>
      <Card><Statistic loading={loading} title="Số điện đã dùng" value={get(data,'electricityUse')} formatter={formatter} /></Card>
    </Col>
    <Col span={4}>
      <Card><Statistic loading={loading} title="Số nước đã dùng" value={get(data,'waterUse')} precision={2} formatter={formatter} /></Card>
    </Col>
    <Col span={4}>
      <Card><Statistic loading={loading} title="Tổng Tiền đã thu" value={get(data,'totalPrice')} precision={2} formatter={formatter} /></Card>
    </Col>
    <Col span={4}>
      <Card><Statistic loading={loading} title="Tổng số phòng quản lí" value={get(data,'totalRooms')} precision={2} formatter={formatter} /></Card>
    </Col>
    <Col span={4}>
      <Card><Statistic loading={loading} title="Tổng số sinh viên quản lí" value={get(data,'totalUser')} precision={2} formatter={formatter} /></Card>
    </Col>
  </Row>
     </Col>
  </Row>
  {get(profile,'role') !== ROLE.student && <>
    <Divider>Yêu cầu vào phòng</Divider>
  <RequestJoinRoom />
  </>}
    </div>
  )
}
