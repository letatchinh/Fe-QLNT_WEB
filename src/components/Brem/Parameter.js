import {
    BgColorsOutlined,
    DeleteOutlined,
    DollarCircleOutlined,
    ThunderboltOutlined,
    WifiOutlined
} from "@ant-design/icons";
import {
    Col,
    Divider, Row, Typography
} from "antd";
import React from "react";
  const { Text } = Typography;
  const span4 = 4;

export default function Parameter({brem}) {
    const {rent,trash,waterPrice,wifi,electricityPrice} = brem;
  return (
    <>
         <Divider>Chỉ số brem</Divider>
        <Row style={{margin : '10px 0'}} justify={"space-between"}>
          <Col span={span4}>
            <Text>
              Giá điện <ThunderboltOutlined />: {electricityPrice}
            </Text>
          </Col>
          <Col span={span4}>
            <Text>
              Giá nước <BgColorsOutlined /> : {waterPrice}
            </Text>
          </Col>
          <Col span={6}>
            <Text>
              Giá thuê phòng <DollarCircleOutlined /> : {rent}
            </Text>
          </Col>
          <Col span={span4}>
            <Text>
              Giá wifi <WifiOutlined /> : {wifi}
            </Text>
          </Col>
          <Col span={span4}>
            <Text>
              Giá rác <DeleteOutlined /> : {trash}
            </Text>
          </Col>
        </Row>
    </>
  )
}
