import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons'
import { Button, Col, Input, Modal, Row, Table, Tag, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import api from '../../api'
import SkeletonTable from '../../components/comom/SkeletonTable'
import FormUser from './FormUser'
import {get} from 'lodash'
export default function Hobby() {
    const [visible,setVisible] = useState(false)
    const [select,setSelect] = useState(null)
    const [keyword,setKeyword] = useState('')
    const [loading,setLoading] = useState(false)
    const [submitLoading,setSubmitLoading] = useState(false)
    const [hobbys,setHobbys] = useState([])
    const addHobby = async() => {
        setSubmitLoading(true)
        const newHobby = {name:keyword}
        const res = await api.hobby.create(newHobby)
        if(res){
            toast.success("Tạo sở thích thành công")
        }
        setHobbys([...hobbys,newHobby])
        setSubmitLoading(false)
    }
    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            const res = await api.hobby.getAll()
            setHobbys(res)
            setLoading(false)
        }
        fetch()
    },[])
    const columns = [
        {
            title:'Tên',
            key : 'name',
            dataIndex : 'name',
            render : (item) => <Tag color='blue'>{item || ''}</Tag>
        },
        {
            title:'Thao tác',
            key : 'action',
            align:'right',
            dataIndex : 'action',
            render:(item,record,index) => <div>
                <Button ><EditTwoTone /></Button>
                <Button ><DeleteTwoTone /></Button>
            </div>
        },
    ]
  return (
    <div>
        <Row style={{margin : '10px 0'}}>
            <Col span={6}><Input value={keyword} onChange={(e) => setKeyword(e.target.value)}/></Col>
            <Col flex={1}><Button loading={submitLoading} disabled={keyword === ''}  type='primary' onClick={() => addHobby()}>Thêm sở thích</Button></Col>
        </Row>
        {loading ? <SkeletonTable rowCount={5} columns={columns}/> :<Table dataSource={hobbys} columns={columns}/>}
        {/* <Modal open={visible} footer={null} onCancel={onCancel} >
        <FormUser selectUser={select} onCancel={onCancel}/>
        </Modal> */}
        {/* <Modal width={300} style={{textAlign : 'center'}} open={isOpenModalDelete} footer={null} onCancel={onCancelModalDelete}>
        <Typography.Title level={4}>
            Xác nhận xoá
        </Typography.Title>
        <Row justify='space-between'>
            <Button onClick={onCancelModalDelete}>Huỷ</Button>
            <Button onClick={handleDelete} danger>Xoá</Button>
        </Row>
        </Modal> */}
    </div>
  )
}
