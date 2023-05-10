import { DeleteTwoTone } from '@ant-design/icons'
import { Button, Modal, Table } from 'antd'
import { get } from 'lodash'
import React, { useEffect, useState } from 'react'
import api from '../../api'
import SkeletonTable from '../../components/comom/SkeletonTable'
import { KEY_STORED } from '../../constant/defaultValue'
import { formatNumberThreeComma } from '../../utils'
import DetailUser from './DetailUser'

export default function FindRoom() {
  const [dataSource, setDataSource] = useState([])
  const [isOpenModal,setIsOpenModal] = useState(false)
  const [hobbys,setHobbys] = useState([])
  const [listUser,setListUser] = useState([])
  const [loading, setLoading] = useState(false)
  const handleOpenModal = (list) => {
    setListUser(list?.map(e => ({...get(e,'userId')})))
    setIsOpenModal(true)
  }
  const handleCloseModal = () => {
    setListUser([])
    setIsOpenModal(false)
  }
  useEffect(() => {
    const fetch = async() => {
      setLoading(true)
      const account = JSON.parse(localStorage.getItem(KEY_STORED))
      const res = await api.room.getRoomForUser(get(account,'username'))
      const hobby = await api.hobby.getAll()
      setHobbys(hobby)
      setDataSource(res)
      setLoading(false)
    }
    fetch()
  },[])
  const columns = [
    {
        title:'Số phòng',
        key : 'roomNumber',
        dataIndex : 'roomNumber',
    },
    {
        title:'Số người ở',
        key : 'people',
        dataIndex : 'people',
        render : (item,record) => `${item.length}/${get(record,'maxUser','')} Người`
    },
    {
        title:'Trang thiết bị',
        key : 'equipment',
        dataIndex : 'equipment',
    },
    {
        title:'Giá tiền (VND)',
        key : 'idBrem',
        dataIndex : 'idBrem',
        render : (item,record) => <div>
          <div>
            <span>Tiền phòng : </span><strong>{formatNumberThreeComma(get(item,'rent',0))}</strong>
          </div>
          <div>
            <span>Tiền rác : </span><strong>{formatNumberThreeComma(get(item,'trash',0))}</strong>
          </div>
          <div>
            <span>Tiền wifi : </span><strong>{formatNumberThreeComma(get(item,'wifi',0))}</strong>
          </div>
          <div>
            <span>Tiền nước : </span><strong>{formatNumberThreeComma(get(item,'waterPrice',0))}</strong>
          </div>
          <div>
            <span>Tiền điện : </span><strong>{formatNumberThreeComma(get(item,'electricityPrice',0))}</strong>
          </div>
        </div>
    },
    {
        title:'Thao tác',
        key : 'action',
        align:'right',
        dataIndex : 'action',
        width : 100,
        align : 'center',
        render:(item,record,index) => <div style={{display : 'flex',flexDirection : 'column'}}>
            <Button onClick={() => handleOpenModal(get(record,'people',[]))}>Xem chi tiết người ở</Button>
            <Button type='primary' >Xin vào phòng</Button>
        </div>
    },
]
  return (
  <>
     {loading ? <SkeletonTable rowCount={5} columns={columns}/> :<Table pagination={false} dataSource={dataSource} columns={columns}/>}
     <Modal open={isOpenModal} width={1000} onCancel={handleCloseModal} closable={false} footer={null}>
      <DetailUser hobbys={hobbys} data={listUser}/>
     </Modal>
  </>
  )
}
