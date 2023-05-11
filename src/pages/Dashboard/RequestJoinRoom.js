import { Button, Col, Row, Table } from 'antd'
import { get } from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import api from '../../api'
import SkeletonTable from '../../components/comom/SkeletonTable'
import { STATUS_REQUEST, STATUS_REQUEST_VI } from '../../constant/defaultValue'
import {toast} from 'react-toastify'
import './index.css'
export default function RequestJoinRoom() {
    const [requests,setRequests] = useState([])
    const [loading,setLoading] = useState(false)
    const [loadingSubmit,setLoadingSubmit] = useState(false)
    useEffect(() => {
        const fetch = async() => {
            setLoading(true)
            const res = await api.requestJoinRoom.getAll()
            setRequests(res)
            setLoading(false)
        }
        fetch()
    },[])
    const handleChangeStatus = async(record,status) => {
        setLoadingSubmit(true)
        const submitData = {_id:get(record,'_id'),idStudent : get(record,'idUser._id'),status,roomId : get(record,'idRoom._id')}
        const res = await api.requestJoinRoom.update(submitData)
        if(get(res,'status')){
            console.log(res,'res');
           const newRequests = requests?.map(e => get(e,'_id') === get(res,'data._id') ? ({...e,status : get(res,'data.status')}) : e)
           console.log(newRequests,'newRequests');
           setRequests(newRequests)
            toast.success(`${STATUS_REQUEST_VI[status]} thành công`)
        }
        else{
            toast.error(get(res,'message',''))
        }
        setLoadingSubmit(false)
    }
    const columns = [
        {
          title:'Số phòng',
          dataIndex : 'idRoom',
          key : 'idRoom',
          render : (item,record) => get(item,'roomNumber','')
        },
        {
          title:'Tên Sinh viên Đăng ký',
          dataIndex : 'idUser',
          key : 'idUser',
          render : (item,record) => get(item,'name','')
        },
        {
          title:'Ngày xin',
          dataIndex : 'createdAt',
          key : 'createdAt',
          render : (item,record) => moment(item).format("DD-MM-YYYY HH:mm:ss")
        },
        {
          title:'Tình trạng',
          dataIndex : 'status',
          key : 'status',
          align:'center',
          render : (item,record) => <p className={item}>{STATUS_REQUEST_VI[item]}</p>
        },
        {
          title:'Thao tác',
          dataIndex : 'createdAt',
          key : 'createdAt',
          align : 'center',
          render : (item,record) => <Row style={{width : '90%'}}>
           <Col span={12}>
           <Button disabled={get(record,'status') !== STATUS_REQUEST.NEW} loading={loadingSubmit} onClick={() => handleChangeStatus(record,STATUS_REQUEST.CONFIRM)} type='primary'>Duyệt</Button>
           </Col>
           <Col onClick={() => handleChangeStatus(record,STATUS_REQUEST.DENY)} span={12}>
            <Button disabled={get(record,'status') !== STATUS_REQUEST.NEW}  loading={loadingSubmit} danger>Từ chối</Button>
           </Col>
          </Row>
        },
      ]
  return (
    <>
        {loading ? <SkeletonTable rowCount={5} columns={columns}/> :<Table pagination={false} dataSource={requests} columns={columns}/>}
    </>
  )
}
