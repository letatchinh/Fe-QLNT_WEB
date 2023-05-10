import { Button, Table, Tag } from 'antd';
import { get } from 'lodash';
import React from 'react'
import SkeletonTable from '../../components/comom/SkeletonTable'

export default function DetailUser({data,hobbys}) {
    const columns = [
        {
          title: "Tên",
          key: "name",
          dataIndex: "name",
          fixed: "left",
        },
        {
          title: "Giới tính",
          key: "gender",
          dataIndex: "gender",
        },
        {
          title: "Mã SV",
          key: "MaSv",
          dataIndex: "MaSv",
        },
        {
          title: "Ngành",
          key: "branch",
          dataIndex: "branch",
        },
        {
          title: "Sở thích",
          key: "hobbys",
          dataIndex: "hobbys",
          render: (item) =>
            item?.map((e) => {
                const findOne = hobbys?.find(h => h._id === e)
                return <Tag color="blue-inverse">{get(findOne,'name')}</Tag>
            }),
        },
        {
          title: "CMND",
          key: "CMND",
          dataIndex: "CMND",
        },
        {
          title: "Quê quán",
          key: "countryside",
          dataIndex: "countryside",
        },
        {
          title: "Số điện thoại",
          key: "phone",
          dataIndex: "phone",
        },
        {
          title: "Email",
          key: "email",
          dataIndex: "email",
        },
      ];
  return (
   <>
    {false ? (
        <SkeletonTable rowCount={5} columns={columns} />
      ) : (
        <Table
          scroll={{ x: 2000 }}
          dataSource={data}
          columns={columns}
        />
      )}
   </>
  )
}
