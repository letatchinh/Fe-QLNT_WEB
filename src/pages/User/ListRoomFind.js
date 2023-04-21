import { CalendarFilled, CompassOutlined, CustomerServiceOutlined } from "@ant-design/icons";
import { Button, Divider, List, Tag, Typography } from "antd";
import { get } from "lodash";
import React, { useState } from "react";
import { toast } from "react-toastify";
import api from "../../api";
import { INFO } from "../../constant/defaultValue";
const listKey = ["countryside", "branch", "hobbys"];
export default function ListRoomFind({ roomFind,userSelect,onCloseModalFind,setRoomForUser }) {
  const { count, value } = roomFind;
  const [loading,setLoading] = useState(false)
  console.log(value,"value");
  const addUserToRoom = async (data) => {
    setLoading(true)
    const res = await api.room.addOneUserToRoom({idRoom:get(data,'idRoom',''),newUser : get(data,'newUser','')})
    if(get(res,'status')){
      toast.success("Thêm thành công sinh vien vào phòng")
      onCloseModalFind()
      setRoomForUser(res.data || {})
    }else{
      toast.error("Lỗi gì đó")
    }
    setLoading(false)
  }
  return (
    <>
      <List
      style={{maxHeight : '500px',overflowY : 'scroll'}}
        header={
          <div>
            Độ phù hợp <Typography.Text strong>{count}</Typography.Text>
          </div>
        }
        bordered
        dataSource={value}
        renderItem={(
          { roomNumber, floor, maxUser, keySame, people, idGroupRoom,_id },
          index
        ) => (
          <List.Item
            style={{ display: "flex", justifyContent: "space-between" }}
            actions={[
              <Button loading={loading} onClick={() => addUserToRoom({idRoom : _id,newUser : {userId : userSelect._id}})} type="primary" key={index}>
                Thêm vào phòng
              </Button>,
            ]}
          >
            Phòng số {roomNumber},Khu nhà {get(idGroupRoom, "name", "")},Tầng{" "}
            {floor},Số người {people.length || 0}/{maxUser} {count !== 0 && ',có bạn cùng chung'}{" "}
            {keySame?.map(({type,data}) => {
            if(type === INFO.hobbys){
                return <Tag color='cyan' icon={<CustomerServiceOutlined />}>{get(data, "name")}</Tag>
            }
            if(type === INFO.branch){
                return <Tag color='success' icon={<CalendarFilled />}>{data || ''}</Tag>
            }
            if(type === INFO.countryside){
                return <Tag color='blue' icon={<CompassOutlined />}>{data || ''}</Tag>
            }
            
            })}
          </List.Item>
        )}
      />
    </>
  );
}
