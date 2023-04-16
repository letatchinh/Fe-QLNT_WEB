import { Card, Col, DatePicker, Row, Statistic, Typography } from 'antd';
import React, { useEffect, useState } from 'react'
import api from '../../api';
import { formatDate, getMonthNow } from '../../utils';
import CountUp from 'react-countup';
import { get } from 'lodash';
import moment from "moment";

export default function Index() {
  console.log("ok");
  const [date,setDate] = useState(getMonthNow())
  const [data,setData] = useState(null)
  const [loading,setLoading] = useState(null)
  const handleChangeStartDate = (dates,dateString) => {
    console.log(dates,'dates');
    setDate({...date,startDate : moment(dateString).format(formatDate)})
  }
  const handleChangeEndDate = (dates,dateString) => {
    setDate({...date,endDate : moment(dateString).format(formatDate)})
  }
  const formatter = (value) => <CountUp end={value} separator="," />;

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      const res = await api.bill.getStastics(date)
      setData(res)
      setLoading(false)
    }
    fetch()
  },[date.endDate])
  return (
    <div>
      <Row style={{alignItems : 'center'}} gutter={16}>
   <Col span={6}>
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
