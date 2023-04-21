import { CheckCircleOutlined, CloseCircleOutlined, DollarCircleOutlined, EditOutlined, EllipsisOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Row, Tag, Typography } from 'antd';
import { get } from 'lodash';
import { room } from '../../assets/image';
import './index.css'
const { Meta } = Card;
const CardRoom = ({item,handleOpen,handleUpdate}) => (
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
      <EditOutlined key="edit" onClick={handleUpdate}/>,
      <EllipsisOutlined key="ellipsis" />,
    ]}
  >
  <Row style={{marginBottom : '10px'}}>
    <Col push={1} span={5}><UserOutlined /></Col>
    <Col span={4}><Typography.Text strong>{get(item,'people',[]).length}/{get(item,'maxUser',0)}</Typography.Text></Col>
    <Col>{get(item,'maxUser',0) === get(item,'people',[]).length && <Tag color='warning'>Đã đầy</Tag>}</Col>
  </Row>
    <Meta
      avatar={<Avatar src="https://joesch.moe/api/v1/random" />}
      title={<div>Phòng số {item.roomNumber}</div>}
      description={item.bill ?  <Tag icon={<CheckCircleOutlined />} color="success">
        Đã thanh toán
      </Tag> : <Tag icon={<CloseCircleOutlined />} color="error">
        Chưa thanh toán
      </Tag>}
    />
  </Card>
);
export default CardRoom;