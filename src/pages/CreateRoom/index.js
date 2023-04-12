import {
  Button, Divider,
  Form, InputNumber,
  Row,
  Select,
  Tag,
  Typography
} from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../api";
import Parameter from "../../components/Brem/Parameter";
export default function Index() {
  const [form] = useForm()
  const [brem, setBrem] = useState([]);
  const [opTionsbrem, setOpTionsBrem] = useState([]);
  const [user, setUser] = useState([]);
  const [listUser, setListUser] = useState([]);
  const [selectBrem, setSelectBrem] = useState(null);
  const onhandleChange = (value) => {
    const exist = listUser.some(e => e === value)
    if(!exist){
      const submitData = [...listUser, value];
      setListUser(submitData);
    }
   
  };
  const onChangeBrem = (value) => {
    const findBrem = brem.find(e => e._id === value);
    setSelectBrem(findBrem);
  };
  const deleteTag = (removedTag) => {
    const newTags = listUser.filter((tag) => tag !== removedTag);
    setListUser(newTags);
  };
  useEffect(() => {
    const fetch = async () => {
      Promise.allSettled([
        await api.brem.getAll(),
        await api.user.getAll(),
      ]).then(([brems, users]) => {
        if (brems.status === "fulfilled") {
          const options = brems.value.map((e) => ({
            label: e.name,
            value: e._id,
          }));
          setOpTionsBrem(options);
          setBrem(brems.value)
        }
        if (users.status === "fulfilled") {
          const options = users.value.map((e) => ({
            label: e.name,
            value: e._id,
          }));
          setUser(options);
        }
      });
    };
    fetch();
  }, []);
  const onFinish = async (values) => {
    const submitData = {...values,people : listUser}
    const res = await api.room.create(submitData)
    if(res){
      if(res){
        toast.success("Tạo phòng thành công")
        form.resetFields()
    }
    }
  };
  return (
    <div>
      <Divider>Tạo phòng</Divider>
      <Form
        labelAlign="left"
        wrapperCol={{ md: 12, lg: 12, sm: 24, xs: 24 }}
        labelCol={{ md: 10, lg: 10 }}
        onFinish={onFinish}
      >
        <Form.Item label="Số phòng" name="roomNumber">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Trang Thiết bị" name="equipment">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Người ở" name="people">
          <Select onChange={onhandleChange} options={user} />
        </Form.Item>
        <Row>
          {listUser?.map((e) => {
            const findOne = user.find((item) => item.value === e);
            return (
              <Tag
                color="blue"
                closable
                onClose={() => deleteTag(findOne.value)}
              >
                {findOne.label}
              </Tag>
            );
          })}
        </Row>
        <Form.Item label="Chọn brem phòng" name="idBrem">
          <Select onChange={onChangeBrem} options={opTionsbrem} />
        </Form.Item>
       {selectBrem && <Parameter brem={selectBrem}/>}
        <Row>
          <Button
            style={{ margin: "0 auto", width: "200px" }}
            type="primary"
            htmlType="submit"
          >
            Tạo phòng
          </Button>
        </Row>
      </Form>
    </div>
  );
}
