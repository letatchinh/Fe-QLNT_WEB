import {
  Button, Col, Divider,
  Form, InputNumber,
  Row,
  Select,
  Tag,
  Typography
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { get } from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api";
import Parameter from "../../components/Brem/Parameter";
import LoadingPage from "../../components/comom/LoadingPage";
export default function Index() {
  const [form] = Form.useForm()
  const {id} = useParams()
  const [loading,setLoading] = useState(false)
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
      setLoading(true)
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
        setLoading(false)
      });
    };
    fetch();
  }, []);
  useEffect(() => {
    const fetch = async() => {
      setLoading(true)
      const res = await api.room.getById(id)
      if(res){
        const {roomNumber , people,idBrem,equipment} = res
        form.setFieldsValue({
          roomNumber,
          equipment,
          idBrem:get(idBrem,'_id')
        })
        const newListUser = people.map(e => get(e,'userId._id'))
        // console.log(listUser,"listUser");
        setListUser(newListUser)
        setSelectBrem(idBrem)
      }
      setLoading(false)
    }
    fetch()
  },[id])
  const onFinish = async (values) => {
    const submitData = {...values,people : listUser.map(e => ({userId : e})),_id:id}
    console.log(submitData,"submitData");
    const res = await api.room.update(submitData)
      if(get(res,'status')){
        toast.success("Cập nhật thành công")
    }
    else{
      toast.error(get(res,'message',''))
    }
  };
  return (
    <div>
    <LoadingPage loading={loading}/>
      <Divider>Tạo phòng</Divider>
      <Form
      form={form}
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
                {get(findOne,'label','')}
              </Tag>
            );
          })}
        </Row>
        <Form.Item label="Chọn brem phòng" name="idBrem">
          <Select onChange={onChangeBrem} options={opTionsbrem} />
        </Form.Item>
       {selectBrem && <Parameter brem={selectBrem}/>}
       {/* <Row>
          <Col span={10}>
            <Form.Item  label='Số điện hiện tại' name='electricity'>
              <InputNumber style={{width : '150px'}}/>
            </Form.Item>
          </Col>
          <Col span={14}>
            <Form.Item label='Số nước hiện tại' name='water'>
              <InputNumber style={{width : '150px'}}/>
            </Form.Item>
          </Col>
        </Row> */}
        <Row>
        
          <Button
            style={{ margin: "0 auto", width: "200px" }}
            type="primary"
            htmlType="submit"
          >
            Cập nhật
          </Button>
        </Row>
      </Form>
    </div>
  );
}
