import { Button, Col, Modal, Row, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import api from '../../api'
import SkeletonTable from '../../components/comom/SkeletonTable'
import FormUser from './FormUser'

export default function Index() {
    const [visible,setVisible] = useState(false)
    const [user,setUser] = useState([])
    const [loading,setLoading] = useState(false)
    const onCancel = () => {
        setVisible(false)
    }
    const handleOpen = () => {
        setVisible(true)
    }
    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            const res = await api.user.getAll()
            setUser(res)
            setLoading(false)
        }
        !visible && fetch()
    },[visible])
    const columns = [
        {
            title:'Tên',
            key : 'name',
            dataIndex : 'name',
        },
        {
            title:'CMND',
            key : 'CMND',
            dataIndex : 'CMND',
        },
        {
            title:'Quê quán',
            key : 'countryside',
            dataIndex : 'countryside',
        },
        {
            title:'Số điện thoại',
            key : 'phone',
            dataIndex : 'phone',
        },
        {
            title:'Email',
            key : 'email',
            dataIndex : 'email',
        },
    ]
  return (
    <div>
        <Row style={{margin : '10px 0'}} justify='space-between'>
            <Col></Col>
            <Col><Button onClick={handleOpen}>Thêm người dùng</Button></Col>
        </Row>
        {loading ? <SkeletonTable rowCount={5} columns={columns}/> :<Table dataSource={user} columns={columns}/>}
        <Modal open={visible} footer={null} onCancel={onCancel} >
        <FormUser onCancel={onCancel}/>
        </Modal>
    </div>
  )
}
