import {
    UserOutlined
} from "@ant-design/icons";
import { Avatar, Dropdown, Row, theme, Typography } from "antd";
import "antd/dist/reset.css";
import { Header } from "antd/es/layout/layout";
import { get } from "lodash";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { KEY_STORED } from "../constant/defaultValue";
import './index.css'
export default function HeaderMain() {
  const navigate = useNavigate()
    const [account,setAccount] = useState(null)
    useEffect(() => {
        const acc = localStorage.getItem(KEY_STORED)
        if(acc){
          setAccount(JSON.parse(acc))
        }
        else{
          navigate("/login")
        }
       
      },[localStorage.getItem(KEY_STORED)])

    const handleLogout = () => {
        localStorage.removeItem(KEY_STORED)
        navigate('/login')
    }
    const items = [
        {
          key: '1',
          label: (
            <span style={{padding : '5px 20px'}}  onClick={handleLogout}>
              Đăng xuất
            </span>
          ),
        },
      ];
    const {
        token: { colorBgContainer },
      } = theme.useToken();
  return (
    <Header
    style={{
      padding: '0 20px',
      background: colorBgContainer,
    }}
  >
    <Row gutter={16} style={{height : '100%'}} align='middle' justify='end'>
    <Typography.Text strong style={{margin : '0 10px'}}>{get(account,'name','')}</Typography.Text>
    <Dropdown
  menu={{
    items,
  }}
  placement="topRight"
  arrow
>
  <Avatar
  style={{
    backgroundColor: '#87d068',
    cursor :'pointer'
  }}
  icon={<UserOutlined />}
/>
</Dropdown>
    </Row>
  </Header>
  )
}
