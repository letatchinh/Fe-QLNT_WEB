import { DollarCircleOutlined, EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import { room } from '../../assets/image';
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
      description="This is the description"
    />
  </Card>
);
export default CardRoom;