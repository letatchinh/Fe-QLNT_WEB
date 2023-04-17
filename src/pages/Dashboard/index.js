import { Card, Col, DatePicker, Row, Select, Statistic, Typography } from 'antd';
import React, { useEffect, useState } from 'react'
import api from '../../api';
import { formatDate, getMonthNow } from '../../utils';
import CountUp from 'react-countup';
import { get } from 'lodash';
import moment from "moment";

export default function Index() {
  const [date,setDate] = useState(getMonthNow())
  const [data,setData] = useState(null)
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
      const res = await api.bill.getStastics({...date,...filter})
      setData(res)
      setLoading(false)
    }
    fetch()
  },[date.endDate,filter])
  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      const rooms = await api.room.getAll()
      const options = rooms?.map(e => ({label : `Phòng số ${get(e,'roomNumber','')}`,value : get(e,'_id','')}))
      setRooms(options)
      setLoading(false)
    }
    fetch()
  },[])
  return (
    <div>
      <Row style={{alignItems : 'center'}} gutter={16}>
   <Col span={6}>
   <Row style={{alignItems : 'center'}}>
      <Col span={8}>
      <Typography.Text>Chọn phòng</Typography.Text>
      </Col>
     <Col flex={1}>

     <Select defaultValue={null} options={[{label : 'Tất cả phòng',value : null},...rooms]} onChange={(value) => setFilter({idRoom : value})} style={{width : '100%'}}/>
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
     <Row gutter={16}>
    <Col span={8}>
      <Card><Statistic loading={loading} title="Số điện đã dùng" value={get(data,'electricityUse')} formatter={formatter} /></Card>
    </Col>
    <Col span={8}>
      <Card><Statistic loading={loading} title="Số nước đã dùng" value={get(data,'waterUse')} precision={2} formatter={formatter} /></Card>
    </Col>
    <Col span={8}>
      <Card><Statistic loading={loading} title="Tổng Tiền đã thu" value={get(data,'totalPrice')} precision={2} formatter={formatter} /></Card>
    </Col>
  </Row>
     </Col>
  </Row>
    </div>
  )
}
