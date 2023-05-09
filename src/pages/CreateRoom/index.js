import {
  Button,
  Col,
  Divider,
  Form,
  InputNumber,
  Modal,
  Row,
  Select,
  Tag,
  Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { get } from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../api";
import Parameter from "../../components/Brem/Parameter";
import { KEY_STORED, ROLE } from "../../constant/defaultValue";
import LoadingPage from '../../components/comom/LoadingPage'
export default function Index() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    const acc = JSON.parse(localStorage.getItem(KEY_STORED));
    setProfile(acc);
  }, [localStorage.getItem(KEY_STORED)]);

  const [loadingLoadPage, setLoadingLoadPage] = useState(false);
  const [brem, setBrem] = useState([]);
  const [opTionsbrem, setOpTionsBrem] = useState([]);
  const [GroupRoom, setGroupRoom] = useState([]);
  const [groupSelect, setGroupSelect] = useState(null);
  const [opTionsGroupRoom, setOpTionsGroupRoom] = useState([]);
  const [user, setUser] = useState([]);
  const [AllUser, setAllUser] = useState([]);
  const [listUser, setListUser] = useState([]);
  const [selectBrem, setSelectBrem] = useState(null);
  async function handleDropdownVisibleChange(open) {
    if (open) {
      const res = await api.room.getListStudent();
      if (res) {
        const options = res.listUser.map((e) => ({
          label: e.name,
          value: e._id,
        }));
        setUser(options);
      }
    }
  }
  const handleChangeGroupRoom = (value) => {
    setGroupSelect(GroupRoom.find((e) => e._id === value));
  };

  const onhandleChange = (value) => {
    const exist = listUser.some((e) => e === value);
    if (!exist) {
      const submitData = [...listUser, value];
      setListUser(submitData);
    }
  };
  const onChangeBrem = (value) => {
    const findBrem = brem.find((e) => e._id === value);
    setSelectBrem(findBrem);
  };
  const deleteTag = (el, removedTag) => {
    el.preventDefault();
    setListUser((currentValue) => {
      let newValue = currentValue.filter((e) => e !== removedTag);
      return [...newValue];
    });
  };
  useEffect(() => {
    const fetch = async () => {
      setLoadingLoadPage(true);
      Promise.allSettled([
        await api.brem.getAll(),
        await api.room.getListStudent(),
        await api.groupRoom.getAll(),
        await api.user.getAll(),
      ]).then(([brems, users, groupRoom, allUser]) => {
        if (brems.status === "fulfilled") {
          const options = brems.value.map((e) => ({
            label: e.name,
            value: e._id,
          }));
          setOpTionsBrem(options);
          setBrem(brems.value);
        }
        if (users.status === "fulfilled") {
          const options = users?.value?.listUser?.map((e) => ({
            label: e.name,
            value: e._id,
          }));
          setUser(options);
        }
        if (groupRoom.status === "fulfilled") {
          
          const acc = JSON.parse(localStorage.getItem(KEY_STORED));
          if (get(acc, "role") === ROLE.superAdmin) {
            const options = groupRoom.value.map((e) => {
              return {
                label: e.name,
                value: e._id,
              };
            });
            console.log(groupRoom);
            setOpTionsGroupRoom(options);
            setGroupRoom(groupRoom.value);
          } else {
            const findOne = groupRoom.value.find(
              (e) => get(e, "idAccount._id") === get(acc, "_id")
            );
            const options = [
              { label: get(findOne, "name"), value: get(findOne, "_id") },
            ];
            setOpTionsGroupRoom(options);
            setGroupRoom(groupRoom.value);
          }
        }
        if (allUser.status === "fulfilled") {
          const options = allUser?.value?.map((e) => ({
            label: e.name,
            value: e._id,
          }));
          setAllUser(options);
        }
        setLoadingLoadPage(false);
      });
    };
    fetch();
  }, []);
  const onFinish = async (values) => {
    setLoading(true);
    const submitData = {
      ...values,
      date: moment().subtract(1, "M").format("YYYY-MM-DD"),
      people: listUser.map((e) => ({ userId: e })),
    };
    const res = await api.room.create(submitData);
    if (get(res, "status")) {
      toast.success("Tạo phòng thành công");
      form.resetFields();
      setGroupSelect(null);
      setListUser([]);
      setSelectBrem(null);
    } else {
      toast.error(get(res, "message", ""));
    }
    setLoading(false);
  };
  return (
    <div>
    <LoadingPage loading={loadingLoadPage}/>
      <Divider>Tạo phòng</Divider>
      <Form
        form={form}
        labelAlign="left"
        wrapperCol={{ md: 12, lg: 12, sm: 24, xs: 24 }}
        labelCol={{ md: 10, lg: 10 }}
        onFinish={onFinish}
      >
        <Form.Item
          rules={[
            {
              required: true,
              message: "Vui lòng điền !",
            },
          ]}
          label="Khu nhà"
          name="idGroupRoom"
        >
          <Select
            loading={loadingLoadPage}
            onChange={handleChangeGroupRoom}
            options={opTionsGroupRoom}
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Vui lòng điền !",
            },
          ]}
          label="Số người tối đa"
          name="maxUser"
          // help="Tối đa 6 người"
        >
          <InputNumber disabled={!groupSelect} min={1} max={6} />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Vui lòng điền !",
            },
          ]}
          label="Tầng"
          name="floor"
          help={
            groupSelect
              ? `Toà nhà này tối đa ${get(groupSelect, "countFloor", 6)} tâng`
              : ""
          }
        >
          <InputNumber
            disabled={!groupSelect}
            min={1}
            max={get(groupSelect, "countFloor", 6)}
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Vui lòng điền !",
            },
          ]}
          label="Số phòng"
          name="roomNumber"
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Vui lòng điền !",
            },
          ]}
          label="Trang Thiết bị"
          name="equipment"
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Vui lòng điền !",
            },
          ]}
          label="Người ở"
          name="people"
        >
          <Select
            onDropdownVisibleChange={handleDropdownVisibleChange}
            loading={loadingLoadPage}
            onChange={onhandleChange}
            options={user}
          />
        </Form.Item>
        <Row>
          {listUser?.map((e) => {
            const findOne = AllUser.find((item) => item.value === e);
            return (
              <Tag
                key={e}
                color="blue"
                closable
                onClose={(es) => deleteTag(es, findOne.value)}
              >
                {findOne.label || ""}
              </Tag>
            );
          })}
        </Row>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Vui lòng điền !",
            },
          ]}
          label="Chọn brem phòng"
          name="idBrem"
        >
          <Select
            loading={loadingLoadPage}
            onChange={onChangeBrem}
            options={opTionsbrem}
          />
        </Form.Item>
        {selectBrem && <Parameter brem={selectBrem} />}
        <Row>
          <Col span={10}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền !",
                },
              ]}
              label="Số điện hiện tại"
              name="electricity"
            >
              <InputNumber style={{ width: "150px" }} />
            </Form.Item>
          </Col>
          <Col span={14}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền !",
                },
              ]}
              label="Số nước hiện tại"
              name="water"
            >
              <InputNumber style={{ width: "150px" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Button
            style={{ margin: "0 auto", width: "200px" }}
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Tạo phòng
          </Button>
        </Row>
      </Form>
    </div>
  );
}
