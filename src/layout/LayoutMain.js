import {
  BankOutlined,
    DesktopOutlined,
    PieChartOutlined,
    SkinTwoTone,
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
import { KEY_STORED, ROLE } from "../constant/defaultValue";
import HeaderMain from "./HeaderMain";
import { get } from "lodash";

  const { Header, Content, Footer, Sider } = Layout;
 
 
export default function LayoutMain({children,title}) {
  const [account,setAccount]= useState(null)
    const navigate = useNavigate();
    useEffect(() => {
      const account = JSON.parse(localStorage.getItem(KEY_STORED))
      if(account){
        setAccount(account)
      }
      else{
        navigate("/login")
      }
    },[localStorage.getItem(KEY_STORED)])
  const [collapsed, setCollapsed] = useState(false);

  const handleMenuClick = (e) => {
    navigate(e.key,{replace : true});
  };
  function getItem(label, key, icon, children,role = []) {
    return {
      key,
      icon,
      children,
      label,
      disabled : role[0] === 1 ? false : get(account,'role','') === ROLE.superAdmin ? false : !account || !role.includes(get(account,'role')),
    };
  }
  const itemsNavbar = [
    getItem("Thống kê", PATH_APP.main.dashboard, <PieChartOutlined />,null,[ROLE.staff]),
    getItem("Danh sách Khu nhà", PATH_APP.groupRoom.root, <BankOutlined />),
    getItem("Danh sách phòng trọ", PATH_APP.rooms.root, <DesktopOutlined />,null,[ROLE.staff]),
    getItem("Quản lý tài khoản", PATH_APP.account.root, <TeamOutlined />),
    getItem("Quản lí sinh viên", "sub2", <UserAddOutlined />,[
      getItem("Danh sách sinh viên", PATH_APP.user.root,null,null,[ROLE.staff]),
      getItem("Danh sách sở thích", PATH_APP.user.hobby,null,null,[ROLE.staff]),
    ],[ROLE.staff]),
    getItem("Quản lí phòng trọ", "sub1", <UserOutlined />, [
      getItem("Thêm phòng trọ", PATH_APP.rooms.create,null,null,[ROLE.staff]),
      getItem("Tạo brem phòng", PATH_APP.brem.create,null,null,[ROLE.staff]),
    ],[ROLE.staff]),
``
  ];
  const itemsNavbarStudent = [
    getItem("Dành cho sinh viên", "sub3", <SkinTwoTone />, [
      getItem("Đăng ký tài khoản", PATH_APP.user.register,null,null,[1]),
      getItem("Tìm phòng", PATH_APP.user.findRoom,null,null,[ROLE.student]),
    ],[1]),
  ];
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
        items={account && account?.role !== ROLE.student ? itemsNavbar : itemsNavbarStudent}
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
