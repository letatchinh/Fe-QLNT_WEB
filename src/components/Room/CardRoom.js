import { CheckCircleOutlined, CloseCircleOutlined, DollarCircleOutlined, EditOutlined, EllipsisOutlined, SettingOutlined, UserOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Row, Tag, Typography } from 'antd';
import { get } from 'lodash';
import { room } from '../../assets/image';
import './index.css'
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const { Meta } = Card;
const CardRoom = ({item,handleOpen,handleUpdate}) => {
  const listUser = get(item,'people',[]).map(e => {
    const submitData = {
      'Tên' : get(e,'userId.name'),
      'Mã sinh viên' :  get(e,'userId.MaSv'),
      'Ngành' :  get(e,'userId.branch'),
      'CMND' :  get(e,'userId.CMND'),
      'email' :  get(e,'userId.email'),
      'Số điện thoại' :  get(e,'userId.phone'),
      'Quê quán' :  get(e,'userId.countryside'),
    }
    return {...submitData}
  })
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const exportToCSV = () => {
      const ws = XLSX.utils.json_to_sheet(listUser);
      const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], {type: fileType});
      FileSaver.saveAs(data, `Danh sách sin viên phòng ${get(item,'roomNumber','')}` + fileExtension);
  }

  return (
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
        <VerticalAlignBottomOutlined onClick={exportToCSV} key="ellipsis" />,
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
  )
};
export default CardRoom;