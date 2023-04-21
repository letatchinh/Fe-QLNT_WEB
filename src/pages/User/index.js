import { DeleteTwoTone, EditTwoTone, Loading3QuartersOutlined, MonitorOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Modal, Result, Row, Spin, Switch, Table, Tag, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../api";
import SkeletonTable from "../../components/comom/SkeletonTable";
import FormUser from "./FormUser";
import { get } from "lodash";
import "./index.css";
import ListRoomFind from "./ListRoomFind";
import Search from "antd/es/input/Search";

export default function Index() {
  const [visible, setVisible] = useState(false);
  const [valueSearcher,setValueSearcher] = useState('')

  const [isOpenModalFind,setIsOpenModalFind] = useState(false)
  const [roomFind,setRoomFind] = useState(null)
  const [roomTemp,setRoomTemp] = useState(null)
  const [userSelect,seUserSelect] = useState(null)
  const [loadingFind,setLoadingFind] = useState(false)
  const [isShowHaveRoom, setIsShowHaveRoom] = useState(true);
  const [selectIdDelete, setSelectIdDelete] = useState(null);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [select, setSelect] = useState(null);
  const [user, setUser] = useState([]);
  const [userTemp, setUserTemp] = useState([]);
  const [loading, setLoading] = useState(false);
  const onCancel = () => {
    setVisible(false);
  };
  const handleOpen = (item) => {
    if (item) setSelect(item);
    setVisible(true);
  };
  ////////////////////////////////
  const onCloseModalFind = () => {
    setIsOpenModalFind(false);
    setRoomFind(null);
    setRoomTemp(null)
    seUserSelect(null)
  };
  
  const onOpenModalFind = async(select) => {
    seUserSelect(select)
    setIsOpenModalFind(true);
    setLoadingFind(true)
    const {status,data} = await api.room.findRoomForStudent({...select})
    if(status){
      setRoomTemp(get(data,'listNotGender'))
      setRoomFind(get(data,'result'))
    }
    setLoadingFind(false)
  };
  const setRoomForUser = (newRoom) => {
    const newUser = {...userSelect,roomUser: newRoom}
    setUser(user.map(user => user._id === newUser._id ? newUser : user))
  }
  ////////////////////////////////
  const onCancelModalDelete = () => {
    setIsOpenModalDelete(false);
    setSelectIdDelete(null);
  };
  const handleOpenModalDelete = (id) => {
    setIsOpenModalDelete(true);
    setSelectIdDelete(id);
  };
  const handleSearch = () => {

  }
  const handleDelete = async () => {
    const res = await api.user.delete(selectIdDelete);
    if (res.status) {
      setUser(user.filter((e) => e._id !== selectIdDelete));
      onCancelModalDelete();
      toast.success("Xoá người dùng thành công");
    } else {
      onCancelModalDelete();
      toast.error(
        `Không thể xoá người dùng do người dùng đang còn ở trong phòng ${get(
          res,
          "data.roomNumber",
          ""
        )}`
      );
    }
  };
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const res = await api.user.getAll();
      const rooms = await api.room.getAll();
      const newusers = res?.map((user) => {
        const findOne = rooms.find((room) =>
          room.people.some((e) => get(e, "userId._id") === get(user, "_id"))
        );
        if (findOne) {
          return { ...user, roomUser: findOne };
        }
        return { ...user, roomUser: null };
      });
      setUser(newusers);
      setUserTemp(newusers);
      setLoading(false);
    };
    !visible && fetch();
  }, [visible]);
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
        item?.map((e) => <Tag color="blue-inverse">{get(e, "name", "")}</Tag>),
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
    {
      title: "Tình trạng",
      key: "roomUser",
      align: "center",
      dataIndex: "roomUser",
      render: (item, record) =>
        item ? (
          <div>
            <p strong className="haveRoom">
              Đã có phòng
            </p>
            <Tag bordered={false} color="purple">
              Phòng số {get(item, "roomNumber", 0)}
            </Tag>
          </div>
        ) : (
          <div>
            <p className="notHaveRoom">Chưa có phòng</p>
            <Button onClick={() => onOpenModalFind(record)} icon={<MonitorOutlined />} type="primary">
              Tìm phòng
            </Button>{" "}
          </div>
        ),
    },
    {
      title: "Thao tác",
      key: "action",
      dataIndex: "action",
      fixed: "right",
      width: 150,
      render: (item, record, index) => (
        <div>
          <Button onClick={() => handleOpen(record)}>
            <EditTwoTone />
          </Button>
          <Button onClick={() => handleOpenModalDelete(record._id)}>
            <DeleteTwoTone />
          </Button>
        </div>
      ),
    },
  ];
  const onSearch = (value) => {
      setUserTemp(user.filter(e => e.name.toString().includes(value) ))
  }
  return (
    <div>
      <Row style={{ margin: "10px 0" }} justify="space-between">
      <Row gutter={16} align='middle'>
       
        <Col>
        <Search allowClear value={valueSearcher} onChange={(e) => setValueSearcher(e.target.value)} placeholder="Nhập tên..." onSearch={onSearch} enterButton />
        </Col>
        <Col>
          {" "}
          <Switch
            onChange={(value) => setIsShowHaveRoom(value)}
            defaultChecked
          />{" "}
          <Typography.Text>Đã có phòng</Typography.Text>
        </Col>
      </Row>
        <Col>
          <Button onClick={() => handleOpen()}>Thêm người dùng</Button>
        </Col>
      </Row>
      {loading ? (
        <SkeletonTable rowCount={5} columns={columns} />
      ) : (
        <Table
          scroll={{ x: 2000 }}
          dataSource={isShowHaveRoom ? userTemp : userTemp.filter((e) => !e.roomUser)}
          columns={columns}
        />
      )}
      <Modal open={visible} footer={null} onCancel={onCancel}>
        <FormUser selectUser={select} onCancel={onCancel} />
      </Modal>
      <Modal
        width={300}
        style={{ textAlign: "center" }}
        open={isOpenModalDelete}
        footer={null}
        onCancel={onCancelModalDelete}
      >
        <Typography.Title level={4}>Xác nhận xoá</Typography.Title>
        <Row justify="space-between">
          <Button onClick={onCancelModalDelete}>Huỷ</Button>
          <Button onClick={handleDelete} danger>
            Xoá
          </Button>
        </Row>
      </Modal>
      <Modal style={{textAlign : 'center'}} width={1000} open={isOpenModalFind}  onCancel={onCloseModalFind} footer={null}>
     <Divider><Typography.Title level={4}>Danh sách phòng phù hợp </Typography.Title></Divider>
    {loadingFind ? <Spin tip='Đang tìm phòng...'/> : <div style={{maxHeight : '1000px', overflowY : 'scroll'}}>
        {roomFind && roomFind.length > 0 ? roomFind?.map(e => <ListRoomFind setRoomForUser={setRoomForUser} onCloseModalFind={onCloseModalFind} userSelect={userSelect} roomFind={e}/>) :<Result
    status="403"
    // title="403"
    subTitle="Không còn phòng nào phù hợp với sinh viên này"
    extra={<Button onClick={() => setRoomFind(roomTemp)} type="primary">Xem danh sách phòng còn trống</Button>}
  />}
     </div>}
      </Modal>
    </div>
  );
}
