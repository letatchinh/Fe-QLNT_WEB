import {
    DesktopOutlined,
    PieChartOutlined,
    UserOutlined,
  } from "@ant-design/icons";
  import { Breadcrumb, Layout, Menu, theme } from "antd";
  import "antd/dist/reset.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATH_APP } from "../routes/path";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  const { Header, Content, Footer, Sider } = Layout;
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const items = [
    getItem("Thống kê", PATH_APP.main.dashboard, <PieChartOutlined />),
    getItem("Danh sách phòng trọ", PATH_APP.rooms.root, <DesktopOutlined />),
    getItem("Quản lí phòng trọ", "sub1", <UserOutlined />, [
      getItem("Thêm phòng trọ", PATH_APP.rooms.create),
      getItem("Tạo brem phòng", PATH_APP.brem.create),
      getItem("Tính tiền phòng", PATH_APP.rooms.charge),
      getItem("Sửa đổi phòng", PATH_APP.rooms.update),
    ]),
  ];
export default function LayoutMain({children,title}) {
    const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const handleMenuClick = (e) => {
    navigate(e.key,{replace : true});
  };
  return (
    <Layout
    style={{
      minHeight: "100vh",
    }}
  >
   <ToastContainer />
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div
        style={{
          height: 32,
          margin: 16,
          background: "rgba(255, 255, 255, 0.2)",
        }}
      />
      <Menu
        onClick={handleMenuClick}
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
      />
    </Sider>
    <Layout className="site-layout">
      <Header
        style={{
          padding: 0,
          background: colorBgContainer,
        }}
      />
      <Content
        style={{
          margin: "0 16px",
        }}
      >
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item>{title}</Breadcrumb.Item>
        </Breadcrumb>
      
           {children}
         
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        ChinhPro ©2023 Created by Chính
      </Footer>
    </Layout>
  </Layout>
  )
}
