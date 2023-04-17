import { BgColorsOutlined, DeleteOutlined, DeleteTwoTone, DollarCircleOutlined, EditTwoTone, ThunderboltOutlined, WifiOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Form, Input, InputNumber, Modal, Row, Table, Typography } from 'antd'
import { get } from 'lodash'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import api from '../../../api'
import SkeletonTable from '../../../components/comom/SkeletonTable'
const gutter = 16
const span = 12
const span4 = 4
const {Text} = Typography

export default function Create() {
    const [form] = Form.useForm()
    const [brems,setBrems] = useState([])
    const [loading,setLoading] = useState(false)
    const [selectBrem,setSelectBrem] = useState(null)
    const [selectIdDelete,setSelectIdDelete] = useState(null)

    const [isOpenModalDelete,setIsOpenModalDelete] = useState(false)
    const [bremNumber,setBremNumber] = useState(0)
    useEffect(() => {
        const fetch = async () => {
          setLoading(true)
            const {lastBrem} = await api.brem.getLastNumber()
            setBremNumber(get(lastBrem,'bremNumber') + 1)
            const res = await api.brem.getAll()
            setBrems(res)
            setLoading(false)
        }
        fetch()
    },[])
    useEffect(() => {
      form.resetFields()
      if(selectBrem){
        form.setFieldsValue({...selectBrem})
      }
    },[selectBrem])
    const handleOpen = (record) => {
      setSelectBrem(record)
    }
    const onFinish = async(values) => {
      
      if(selectBrem){
        setLoading(true)
        const submitData = {...values,_id:selectBrem._id}
        const res = await api.brem.update(submitData)
        if(res){
            toast.success("Cập nhật brem thành công")
            setBrems(brems.map(e => {
              if(e._id === selectBrem._id){
                return submitData
              }
              return e
            }))
            form.resetFields()
            setSelectBrem(null)
        }
      }
      else{
        setLoading(true)
        const submitData = {...values,bremNumber}
        const res = await api.brem.create(submitData)
        if(res){
            toast.success("Tạo brem thành công")
            form.resetFields()
            setBremNumber(bremNumber + 1)
            setBrems([...brems,submitData])
        }
      }
      setLoading(false)
    }
    const onCancelModalDelete = () => {
      setIsOpenModalDelete(false)
      setSelectIdDelete(null)
  }
  const handleOpenModalDelete = (id) => {
      setIsOpenModalDelete(true)
      setSelectIdDelete(id)
  }
  const handleDelete = async() => {
    const res = await api.brem.delete(selectIdDelete)
    if(res.status){
        setBrems(brems.filter(e => e._id !== selectIdDelete))
        onCancelModalDelete()
        toast.success("Xoá Brem thành công")
    }
    else{
      const listRoomExist = get(res,'data',[]).map(e => get(e,'roomNumber',0)).join('-')
        onCancelModalDelete()
        toast.error(`Không thể xoá Brem do brem đang dùng ở phòng (${listRoomExist})`)
    }
}
    const columns = [
      {
          title:'Tên Brem',
          key : 'name',
          dataIndex : 'name',
      },
      {
          title:'Mã số',
          key : 'bremNumber',
          dataIndex : 'bremNumber',
      },
      {
          title:'Giá điện',
          key : 'electricityPrice',
          dataIndex : 'electricityPrice',
      },
      {
          title:'Giá nước',
          key : 'waterPrice',
          dataIndex : 'waterPrice',
      },
      {
          title:'Tiền phòng',
          key : 'rent',
          dataIndex : 'rent',
      },
      {
          title:'Tiền rác',
          key : 'trash',
          dataIndex : 'trash',
      },
      {
          title:'Tiền Wifi',
          key : 'wifi',
          dataIndex : 'wifi',
      },
      {
          title:'Thao tác',
          key : 'action',
          dataIndex : 'action',
          render:(item,record,index) => <div>
              <Button onClick={() => handleOpen(record)}><EditTwoTone /></Button>
              <Button  onClick={() => handleOpenModalDelete(record._id)}><DeleteTwoTone /></Button>
          </div>
      },
    ]
  return (
<>
<Form form={form} className='form-center'  onFinish={onFinish}>
        <Row gutter={gutter}>
            <Col span={span}>
            <Form.Item label='Tên brem' name="name" >
          <Input/>
        </Form.Item>
            </Col>
            <Col span={span}> <Form.Item label='Mã số brem' name="bremNumber" >
          <InputNumber placeholder={bremNumber} disabled/>
        </Form.Item></Col>
        </Row>
        <Divider>Chỉ số brem</Divider>
        <Row justify={'space-between'} >
            <Col span={span4}>
            <Form.Item label={<Text>Giá điện <ThunderboltOutlined /></Text>} name="electricityPrice" >
          <Input/>
        </Form.Item>
            </Col>
            <Col span={span4}>
            <Form.Item label={<Text>Giá nước <BgColorsOutlined /></Text>} name="waterPrice" >
          <Input/>
        </Form.Item>
            </Col>
            <Col span={6}>
            <Form.Item label={<Text>Giá thuê phòng <DollarCircleOutlined /></Text>} name="rent" >
          <Input/>
        </Form.Item>
            </Col>
            <Col span={span4}>
            <Form.Item label={<Text>Giá wifi <WifiOutlined /></Text>} name="wifi" >
          <Input/>
        </Form.Item>
            </Col>
            <Col span={span4}>
            <Form.Item label={<Text>Giá rác <DeleteOutlined /></Text>} name="trash" >
          <Input/>
        </Form.Item>
            </Col>
        </Row>
        <Button loading={loading} style={{width : '200px' , margin : '0 auto'}}  htmlType='submit' type='primary'>{selectBrem ? "Cập nhật" : "Tạo mới"}</Button>
    </Form>
    <Divider>Danh sách Brem</Divider>
    {loading ? <SkeletonTable rowCount={5} columns={columns}/> :<Table columns={columns} dataSource={brems} pagination={false}/>}
    <Modal width={300} style={{textAlign : 'center'}} open={isOpenModalDelete} footer={null} onCancel={onCancelModalDelete}>
        <Typography.Title level={4}>
            Xác nhận xoá
        </Typography.Title>
        <Row justify='space-between'>
            <Button onClick={onCancelModalDelete}>Huỷ</Button>
            <Button onClick={handleDelete} danger>Xoá</Button>
        </Row>
        </Modal>
</>
  )
}
