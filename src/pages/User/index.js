import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons'
import { Button, Col, Modal, Row, Table, Tag, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import api from '../../api'
import SkeletonTable from '../../components/comom/SkeletonTable'
import FormUser from './FormUser'
import {get} from 'lodash'
import './index.css'
export default function Index() {
    const [visible,setVisible] = useState(false)
    const [selectIdDelete,setSelectIdDelete] = useState(null)
    const [isOpenModalDelete,setIsOpenModalDelete] = useState(false)
    const [select,setSelect] = useState(null)
    const [user,setUser] = useState([])
    console.log(user,"user");
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
            const rooms = await api.room.getAll()
            console.log(rooms,"rooms");
            const newusers = res?.map(user => {
                const findOne = rooms.find(room => room.users.some(e => get(e,'_id') === get(user,'_id')))
                if(findOne){
                    return {...user,roomUser : findOne}
                }
                return {...user,roomUser : null}
            })
            setUser(newusers)
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
            title:'Mã SV',
            key : 'MaSv',
            dataIndex : 'MaSv',
        },
        {
            title:'Ngành',
            key : 'branch',
            dataIndex : 'branch',
        },
        {
            title:'Sở thích',
            key : 'hobbys',
            dataIndex : 'hobbys',
            render: (item) => item?.map(e => <Tag color='blue-inverse'>{get(e,'name','')}</Tag>)
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
            title:'Tình trạng',
            key : 'roomUser',
            align:'center',
            dataIndex : 'roomUser',
            render :(item,record) => item ? <span strong className='haveRoom'>Đã có phòng</span> : <span strong className='notHaveRoom'>Chưa có phòng</span> 
        },
        {
            title:'Thao tác',
            key : 'action',
            dataIndex : 'action',
            fixed:'right',
            width : 150,
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
        {loading ? <SkeletonTable rowCount={5} columns={columns}/> :<Table scroll={{x : 2000}} dataSource={user} columns={columns}/>}
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
