import { CalendarFilled, CompassOutlined, CustomerServiceOutlined } from "@ant-design/icons";
import { Button, Divider, List, Tag, Typography } from "antd";
import { get } from "lodash";
import React from "react";
import { INFO } from "../../constant/defaultValue";
const listKey = ["countryside", "branch", "hobbys"];
export default function ListRoomFind({ roomFind }) {
  const { count, value } = roomFind;
  console.log(value, "value");
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
          { roomNumber, floor, maxUser, keySame, people, idGroupRoom },
          index
        ) => (
          <List.Item
            style={{ display: "flex", justifyContent: "space-between" }}
            actions={[
              <Button type="primary" key={index}>
                Thêm vào phòng
              </Button>,
            ]}
          >
            Phòng số {roomNumber},Khu nhà {get(idGroupRoom, "name", "")},Tầng{" "}
            {floor},Số người {people.length || 0}/{maxUser}: : có bạn cùng chung{" "}
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
