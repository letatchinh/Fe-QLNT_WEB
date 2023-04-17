import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons'
import { Button, Col, Modal, Row, Table, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import api from '../../api'
import SkeletonTable from '../../components/comom/SkeletonTable'
import FormUser from './FormUser'
import {get} from 'lodash'
export default function Index() {
    const [visible,setVisible] = useState(false)
    const [selectIdDelete,setSelectIdDelete] = useState(null)
    const [isOpenModalDelete,setIsOpenModalDelete] = useState(false)
    const [select,setSelect] = useState(null)
    const [user,setUser] = useState([])
    const [loading,setLoading] = useState(false)
    const onCancel = () => {
        setVisible(false)
    }
    const handleOpen = (item) => {
        console.log(item,"item");
        if(item) setSelect(item)
        setVisible(true)
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
        const res = await api.user.delete(selectIdDelete)
        if(res.status){
            setUser(user.filter(e => e._id !== selectIdDelete))
            onCancelModalDelete()
            toast.success("Xoá người dùng thành công")
        }
        else{
            onCancelModalDelete()
            toast.error(`Không thể xoá người dùng do người dùng đang còn ở trong phòng ${get(res,'data.roomNumber','')}`)
        }
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
        {
            title:'Thao tác',
            key : 'action',
            dataIndex : 'action',
            render:(item,record,index) => <div>
                <Button onClick={() => handleOpen(record)}><EditTwoTone /></Button>
                <Button onClick={() => handleOpenModalDelete(record._id)}><DeleteTwoTone /></Button>
            </div>
        },
    ]
  return (
    <div>
        <Row style={{margin : '10px 0'}} justify='space-between'>
            <Col></Col>
            <Col><Button onClick={() => handleOpen()}>Thêm người dùng</Button></Col>
        </Row>
        {loading ? <SkeletonTable rowCount={5} columns={columns}/> :<Table dataSource={user} columns={columns}/>}
        <Modal open={visible} footer={null} onCancel={onCancel} >
        <FormUser selectUser={select} onCancel={onCancel}/>
        </Modal>
        <Modal width={300} style={{textAlign : 'center'}} open={isOpenModalDelete} footer={null} onCancel={onCancelModalDelete}>
        <Typography.Title level={4}>
            Xác nhận xoá
        </Typography.Title>
        <Row justify='space-between'>
            <Button onClick={onCancelModalDelete}>Huỷ</Button>
            <Button onClick={handleDelete} danger>Xoá</Button>
        </Row>
        </Modal>
    </div>
  )
}
