import {
  Button,
  Col,
  Descriptions,
  Form,
  InputNumber,
  Row,
  Tag,
  Typography,
} from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import Parameter from "../../components/Brem/Parameter";
import api from "../../api";
import { get } from "lodash";
import moment from "moment";
import { CheckCircleOutlined, CheckOutlined } from "@ant-design/icons";
import {
  formatNumberThreeComma,
  getDateMonthYearNow,
  getDateNow,
  getDatePreMonth,
  getPreMonth,
} from "../../utils";
import { toast } from "react-toastify";
const descriptionItemProps = {
  contentStyle: {
    fontWeight: "bold",
    textAlign: "right",
  },
};
const span = 12;
export default function FormCharge({ room, onCancel,setNewRoom }) {
  console.log(room,"room");
  const { idBrem :brems, _id } = room;
  const { electricityPrice, rent, trash, waterPrice, wifi } = brems;
  const [meters, setMeter] = useState({ meterNow: null, meterPre: null });
  const [form] = Form.useForm();
  useEffect(() => {
    const fetch = async () => {
      const [date, month, year] = getDateMonthYearNow();
      const res = await api.meter.getPreAndMonthNow({ idRoom: _id, date });
      if (res) {
        console.log(res,"res");
        const { meterNow } = res;
        setMeter(res);
        form.setFieldsValue({
          electricity: get(meterNow, "electricity"),
          water: get(meterNow, "water"),
        });
      }
    };
    fetch();
  }, [room,setNewRoom]);
  const electricityUse =
    get(meters, "meterNow.electricity", 0) -
    get(meters, "meterPre.electricity", 0);
  const waterUse =
    get(meters, "meterNow.water", 0) - get(meters, "meterPre.water", 0);
    const html = <Row style={{ width: "100%", margin: "10px 0" }} align="bottom">
    <Col span={24}>
      <Descriptions bordered column={1}>
        <Descriptions.Item
          {...descriptionItemProps}
          label={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>Tiền điện tiêu thụ ({formatNumberThreeComma(electricityUse)})</span>
            </div>
          }
        >
          {formatNumberThreeComma(electricityUse * electricityPrice)}
        </Descriptions.Item>
        <Descriptions.Item
          {...descriptionItemProps}
          label={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>Tiền nước tiêu thụ ({formatNumberThreeComma(waterUse)})</span>
            </div>
          }
        >
          {formatNumberThreeComma(waterUse * waterPrice)}
        </Descriptions.Item>
        <Descriptions.Item
          {...descriptionItemProps}
          label={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>Tiền rác</span>
            </div>
          }
        >
          {trash}
        </Descriptions.Item>
        <Descriptions.Item
          {...descriptionItemProps}
          label={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>Giá thuê phòng</span>
            </div>
          }
        >
          {rent}
        </Descriptions.Item>
        <Descriptions.Item
          {...descriptionItemProps}
          label={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>Tiền Wifi</span>
            </div>
          }
        >
          {wifi}
        </Descriptions.Item>

        <Descriptions.Item
          {...descriptionItemProps}
          label={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>Tổng tiền</span>
            </div>
          }
        >
          <Typography.Title level={3}>
            {formatNumberThreeComma(
              electricityUse * electricityPrice +
                waterPrice * waterUse +
                trash +
                wifi +
                rent
            )}
          </Typography.Title>
        </Descriptions.Item>
      </Descriptions>
    </Col>
  </Row>
  const onFinish = async(values) => {
    console.log(values, "values");
    const submitData = {
      // html,
      idRoom: _id,
      electricityNumber: get(meters, "meterNow.electricity", 0),
      waterNumber: get(meters, "meterNow.water", 0),
      electricityUse,
      waterUse,
      rent,
      trash,
      wifi,
      totalPrice :  electricityUse * electricityPrice +
      waterPrice * waterUse +
      trash +
      wifi +
      rent
    };
    const res = await api.bill.create(submitData)
    console.log(res,"res");
    if(res){
      if(res.status){
        toast.success("Thanh toán thành công")
        const newRoom = {...room,bill : res.createBill}
        setNewRoom(newRoom)
        onCancel()
      }
    }
    else{
      toast.error("Thanh toán thất bại")
    }
  };
  const handleSave = async () => {
    try {
      const { electricity, water } = form.getFieldsValue();
      const submitData = {
        idRoom: _id,
        date: getDateNow(),
        electricity,
        water,
      };
      const res = await api.meter.createOrUpdate(submitData);
      console.log(res,"res");
      if (res) {
        if (get(res, "status", "") === "create") {
          toast.success("Thêm thành công số điện nước");
        }
        if (get(res, "status", "") === "update") {
          toast.success("Cập nhật thành công số điện nước");
        }
       setMeter({...meters,meterNow : res.data})
        form.resetFields();
        onCancel();
      }

      //  form.submit()
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Parameter brem={brems} />
      <Form form={form} onFinish={onFinish}>
        <Row>
          <Col span={span}>
            <Form.Item label="Số điện tháng này" name="electricity">
              <InputNumber
                min={get(meters, "meterPre.electricity", 0)}
                addonAfter={`Số điện tháng trước ${get(
                  meters,
                  "meterPre.electricity",
                  0
                )}`}
              />
            </Form.Item>
          </Col>
          <Col span={span}>
            <Form.Item label="Số nước tháng này" name="water">
              <InputNumber
                min={get(meters, "meterPre.water", 0)}
                addonAfter={`Số nước tháng trước ${get(
                  meters,
                  "meterPre.water",
                  0
                )}`}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Button
            onClick={onCancel}
            style={{ margin: "0 auto", width: "200px" }}
          >
            Huỷ
          </Button>
          <Button
          disabled={room.bill}
            onClick={handleSave}
            style={{ margin: "0 auto", width: "200px" }}
          >
            <CheckOutlined />
            Lưu
          </Button>
          {!room.bill ?<Button
            disabled={!meters.meterNow}
            style={{ margin: "0 auto", width: "200px" }}
            type="primary"
            htmlType="submit"
          >
           Xác nhận thanh toán
          </Button> :  <Tag style={{height : '100%'}} icon={<CheckCircleOutlined />} color="success">
        Đã thanh toán
      </Tag>}
        </Row>

        {meters.meterNow && (
          <Row style={{ width: "100%", margin: "10px 0" }} align="bottom">
            <Col span={24}>
              <Descriptions bordered column={1}>
                <Descriptions.Item
                  {...descriptionItemProps}
                  label={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>Tiền điện tiêu thụ ({formatNumberThreeComma(electricityUse)})</span>
                    </div>
                  }
                >
                  {formatNumberThreeComma(electricityUse * electricityPrice)}
                </Descriptions.Item>
                <Descriptions.Item
                  {...descriptionItemProps}
                  label={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>Tiền nước tiêu thụ ({formatNumberThreeComma(waterUse)})</span>
                    </div>
                  }
                >
                  {formatNumberThreeComma(waterUse * waterPrice)}
                </Descriptions.Item>
                <Descriptions.Item
                  {...descriptionItemProps}
                  label={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>Tiền rác</span>
                    </div>
                  }
                >
                  {trash}
                </Descriptions.Item>
                <Descriptions.Item
                  {...descriptionItemProps}
                  label={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>Giá thuê phòng</span>
                    </div>
                  }
                >
                  {rent}
                </Descriptions.Item>
                <Descriptions.Item
                  {...descriptionItemProps}
                  label={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>Tiền Wifi</span>
                    </div>
                  }
                >
                  {wifi}
                </Descriptions.Item>

                <Descriptions.Item
                  {...descriptionItemProps}
                  label={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>Tổng tiền</span>
                    </div>
                  }
                >
                  <Typography.Title level={3}>
                    {formatNumberThreeComma(
                      electricityUse * electricityPrice +
                        waterPrice * waterUse +
                        trash +
                        wifi +
                        rent
                    )}
                  </Typography.Title>
                </Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        )}
      </Form>
    </>
  );
}
