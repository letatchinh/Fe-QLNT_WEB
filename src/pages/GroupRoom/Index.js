import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons'
import { Button, Col, Input, Modal, Row, Table, Tag, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import api from '../../api'
import SkeletonTable from '../../components/comom/SkeletonTable'
import {compact, get} from 'lodash'
import { KEY_STORED, ROLE, ROLE_VI } from '../../constant/defaultValue'
import FormGroupRoom from './FormGroupRoom'
export default function Index() {
    const [visible,setVisible] = useState(false)
    const [optionsStaff,setOptionsStaff] = useState([])
    const [profile,setProfile] = useState(null)
    const [select,setSelect] = useState(null)
    const [loading,setLoading] = useState(false)
    const [submitLoading,setSubmitLoading] = useState(false)
    const [groupRooms,setGroups] = useState([])
    const onCancel = () => {
        setVisible(false)
        setSelect(null)
    }
    const handleOpen = (groupRoom) => {
        setVisible(true)
        groupRoom && setSelect(groupRoom)
    }
    const setNewGroup = (newGroup) => setGroups([...groupRooms,newGroup])
    const setNewGroupRoomUpdate = (newGroup) => setGroups(groupRooms.map(e => {
        if(e._id === newGroup._id) return newGroup
        return e
    }))
    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            const res = await api.groupRoom.getAll()
            setGroups(res)
            setLoading(false)
        }
       !visible && fetch()
    },[visible])
    useEffect(() => {
        const acc = JSON.parse(localStorage.getItem(KEY_STORED))
        setProfile(acc)
      },[localStorage.getItem(KEY_STORED)])
    useEffect(() => {
        const fetch = async () => {
            const res = await api.account.getAll()
            const optionsStaff = res?.map(e => {
                if(e.role !== ROLE.superAdmin){
                    return {
                        label:get(e,'name',''),
                        value:get(e,'_id',''),
                    }
                }
            })
            setOptionsStaff(compact(optionsStaff))
        }   
        fetch()
    },[])
    const columns = [
        {
            title:'Tên',
            key : 'name',
            dataIndex : 'name',
            // render : (item) => <Tag color='blue'>{item || ''}</Tag>
        },
        {
            title:'Số tầng',
            key : 'countFloor',
            dataIndex : 'countFloor',
            // render : (item) => <Tag color='blue'>{item || ''}</Tag>
        },
        {
            title:'Số phòng',
            key : 'countRoom',
            dataIndex : 'countRoom',
            // render : (item) => <Tag color='blue'>{item || ''}</Tag>
        },
        {
            title:'Người quản lý',
            key : 'idAccount',
            dataIndex : 'idAccount',
            render : (item) => get(item,'name','')
        },
        {
            title:'Thao tác',
            key : 'action',
            align:'right',
            dataIndex : 'action',
            render:(item,record,index) => <div>
                <Button onClick={() => handleOpen(record)}><EditTwoTone /></Button>
                <Button ><DeleteTwoTone /></Button>
            </div>
        },
    ]
  return <>
    {get(profile,'role') === ROLE.superAdmin ?  <div>
        <Row justify='end' style={{margin : '10px 0'}}>
            <Col><Button loading={submitLoading} onClick={() => handleOpen()}  type='primary' >Thêm Khu nhà</Button></Col>
        </Row>
        {loading ? <SkeletonTable rowCount={5} columns={columns}/> :<Table pagination={false} dataSource={groupRooms} columns={columns}/>}
        <Modal open={visible} footer={null} onCancel={onCancel} >
        <FormGroupRoom optionsStaff={optionsStaff} setNewGroupRoomUpdate={setNewGroupRoomUpdate} setNewGroup={setNewGroup} selectGroup={select} onCancel={onCancel}/>
        </Modal>
        {/* <Modal width={300} style={{textAlign : 'center'}} open={isOpenModalDelete} footer={null} onCancel={onCancelModalDelete}>
        <Typography.Title level={4}>
            Xác nhận xoá
        </Typography.Title>
        <Row justify='space-between'>
            <Button onClick={onCancelModalDelete}>Huỷ</Button>
            <Button onClick={handleDelete} danger>Xoá</Button>
        </Row>
        </Modal> */}
    </div> : <Typography.Title>Bạn không có quyền xem trang này</Typography.Title>}
   
  
  </>
}
