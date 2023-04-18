import {
    DesktopOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserAddOutlined,
    UserOutlined,
  } from "@ant-design/icons";
  import { Avatar, Breadcrumb, Button, Dropdown, Layout, Menu, Row, theme, Typography } from "antd";
  import "antd/dist/reset.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATH_APP } from "../routes/path";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { KEY_STORED } from "../constant/defaultValue";
import HeaderMain from "./HeaderMain";

  const { Header, Content, Footer, Sider } = Layout;
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const itemsNavbar = [
    getItem("Thống kê", PATH_APP.main.dashboard, <PieChartOutlined />),
    getItem("Danh sách phòng trọ", PATH_APP.rooms.root, <DesktopOutlined />),
    getItem("Quản lý tài khoản", PATH_APP.account.root, <TeamOutlined />),
    getItem("Quản lí sinh viên", "sub2", <UserAddOutlined />,[
      getItem("Danh sách sinh viên", PATH_APP.user.root),
      getItem("Danh sách sở thích", PATH_APP.user.hobby),
    ]),
    getItem("Quản lí phòng trọ", "sub1", <UserOutlined />, [
      getItem("Thêm phòng trọ", PATH_APP.rooms.create),
      getItem("Tạo brem phòng", PATH_APP.brem.create),
      // getItem("Tính tiền phòng", PATH_APP.rooms.charge),
      // getItem("Sửa đổi phòng", PATH_APP.rooms.update),
    ]),
  ];
export default function LayoutMain({children,title}) {

    const navigate = useNavigate();
    useEffect(() => {
      const account = localStorage.getItem(KEY_STORED)
    },[localStorage.getItem(KEY_STORED)])
  const [collapsed, setCollapsed] = useState(false);

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
      disabled={!localStorage.getItem(KEY_STORED)}
        onClick={handleMenuClick}
        theme="dark"
        defaultSelectedKeys={[PATH_APP.main.dashboard]}
        mode="inline"
        items={itemsNavbar}
      />
    </Sider>
    <Layout className="site-layout">
     <HeaderMain />
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
