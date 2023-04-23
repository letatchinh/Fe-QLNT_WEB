import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Button, Col, Input, Modal, Row, Table, Tag, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../api";
import SkeletonTable from "../../components/comom/SkeletonTable";
import FormUser from "./FormUser";
import { get } from "lodash";
export default function Hobby() {
  const [visible, setVisible] = useState(false);
  const [select, setSelect] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [hobbys, setHobbys] = useState([]);
  const addHobby = async () => {
    setSubmitLoading(true);
    const newHobby = { name: keyword };
    const res = await api.hobby.create(newHobby);
    if (res.status) {
      toast.success("Tạo sở thích thành công");
    setKeyword('')
      setHobbys([...hobbys, newHobby]);
    }
    else{
        toast.error(get(res,'message',''))
    }
    setSubmitLoading(false);
  };
  const updateHobby = async () => {
    setSubmitLoading(true);
    const newHobby = { name: keyword,_id : get(select,'_id') };
    const res = await api.hobby.update(newHobby)
    if(res.status){
        toast.success("Cập nhật sở thích thành công")
        setHobbys(hobbys.map(e => get(e,'_id') === get(select,'_id') ? newHobby : e));
    }
    else{
        toast.error(get(res,'message',''))
    }
    
    setSubmitLoading(false);
  };
  const onCancel = () => {
    setSelect(null)
    setKeyword('')
  }
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const res = await api.hobby.getAll();
      setHobbys(res);
      setLoading(false);
    };
    fetch();
  }, []);
  const columns = [
    {
      title: "Tên",
      key: "name",
      dataIndex: "name",
      render: (item) => <Tag color="blue">{item || ""}</Tag>,
    },
    {
      title: "Thao tác",
      key: "action",
      align: "right",
      dataIndex: "action",
      render: (item, record, index) => (
        <div>
          <Button
            onClick={() => {
              setSelect(record);
              setKeyword(get(record, "name", ""));
            }}
          >
            <EditTwoTone />
          </Button>
          <Button>
            <DeleteTwoTone />
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Row style={{ margin: "10px 0" }}>
        <Col span={6}>
          <Input value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        </Col>
        {select ? (
          <>
          <Col >
            <Button
              loading={submitLoading}
              disabled={keyword === ""}
              type="primary"
              onClick={() => updateHobby()}
            >
              Cập nhật sở thích
            </Button>
          </Col>
          <Col flex={1}>
            <Button
              onClick={onCancel}
            >
              Huỷ
            </Button>
          </Col>
          </>
        ) : (
          <Col flex={1}>
            <Button
              loading={submitLoading}
              disabled={keyword === ""}
              type="primary"
              onClick={() => addHobby()}
            >
              Thêm sở thích
            </Button>
          </Col>
        )}
      </Row>
      {loading ? (
        <SkeletonTable rowCount={5} columns={columns} />
      ) : (
        <Table dataSource={hobbys} columns={columns} />
      )}
    </div>
  );
}
