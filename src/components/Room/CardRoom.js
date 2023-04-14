import { CheckCircleOutlined, CloseCircleOutlined, DollarCircleOutlined, EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Tag } from 'antd';
import { room } from '../../assets/image';
import './index.css'
const { Meta } = Card;
const CardRoom = ({item,handleOpen}) => (
  <Card
  style={{marginTop:'10px'}}
    cover={
      <img
        alt="example"
        src={room}
      />
    }
    actions={[
        <DollarCircleOutlined onClick={handleOpen} key='charge'/>,
      <EditOutlined key="edit" />,
      <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <Meta
      avatar={<Avatar src="https://joesch.moe/api/v1/random" />}
      title={`Phòng số ${item.roomNumber}`}
      description={item.bill ?  <Tag icon={<CheckCircleOutlined />} color="success">
        Đã thanh toán
      </Tag> : <Tag icon={<CloseCircleOutlined />} color="error">
        Chưa thanh toán
      </Tag>}
    />
  </Card>
);
export default CardRoom;