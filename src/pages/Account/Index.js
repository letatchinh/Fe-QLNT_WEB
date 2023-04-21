import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons'
import { Button, Col, Input, Modal, Row, Table, Tag, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import api from '../../api'
import SkeletonTable from '../../components/comom/SkeletonTable'
import {get} from 'lodash'
import FormAccount from './FormAccount'
import { KEY_STORED, ROLE, ROLE_VI } from '../../constant/defaultValue'
export default function Index() {
    const [visible,setVisible] = useState(false)
    const [profile,setProfile] = useState(null)
    const [select,setSelect] = useState(null)
    const [loading,setLoading] = useState(false)
    const [submitLoading,setSubmitLoading] = useState(false)
    const [accounts,setAccounts] = useState([])
    const onCancel = () => {
        setVisible(false)
        setSelect(null)
    }
    const handleOpen = (account) => {
        setVisible(true)
        account && setSelect(account)
    }
    const setNewAccount = (newAccount) => setAccounts([...accounts,newAccount])
    const setNewAccountUpdate = (newAccount) => setAccounts(accounts.map(e => {
        if(e._id === newAccount._id) return newAccount
        return e
    }))
    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            const res = await api.account.getAll()
            setAccounts(res)
            setLoading(false)
        }
        fetch()
    },[])
    useEffect(() => {
        const acc = JSON.parse(localStorage.getItem(KEY_STORED))
        setProfile(acc)
      },[localStorage.getItem(KEY_STORED)])
    const columns = [
        {
            title:'Tên',
            key : 'name',
            dataIndex : 'name',
            // render : (item) => <Tag color='blue'>{item || ''}</Tag>
        },
        {
            title:'Tài khoản',
            key : 'username',
            dataIndex : 'username',
            // render : (item) => <Tag color='blue'>{item || ''}</Tag>
        },
        {
            title:'Mật khẩu',
            key : 'password',
            dataIndex : 'password',
            // render : (item) => <Tag color='blue'>{item || ''}</Tag>
        },
        // {
        //     title:'Quản lí khu nhà',
        //     key : 'password',
        //     dataIndex : 'password',
        //     // render : (item) => <Tag color='blue'>{item || ''}</Tag>
        // },
        {
            title:'Vai trò',
            key : 'role',
            dataIndex : 'role',
            render : (item) => ROLE_VI[item] || ''
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
            <Col><Button loading={submitLoading} onClick={() => handleOpen()}  type='primary' >Thêm tài khoản</Button></Col>
        </Row>
        {loading ? <SkeletonTable rowCount={5} columns={columns}/> :<Table pagination={false} dataSource={accounts} columns={columns}/>}
        <Modal open={visible} footer={null} onCancel={onCancel} >
        <FormAccount setNewAccountUpdate={setNewAccountUpdate} setNewAccount={setNewAccount} selectAccount={select} onCancel={onCancel}/>
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
