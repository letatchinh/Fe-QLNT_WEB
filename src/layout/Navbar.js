import { Button, Col, Dropdown, Image, Menu, Row, Space } from 'antd';
import React from 'react'
import { LOGO } from '../assets/image';
import './index.css'
import { DownOutlined } from '@ant-design/icons';
export default function Navbar() {
    const items = [
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              1st menu item
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
              2nd menu item
            </a>
          ),
        },
        {
          key: '3',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
              3rd menu item
            </a>
          ),
        },
      ];
  return (
    <div className='navbar'>
    <Row  gutter={16}>
     <Col>
     <Image src={LOGO} preview={false} width={50}/>
     </Col>   
     <Col>
     <Dropdown
    menu={{
      items,
    }}
  >
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        Hover me
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
     </Col>   
    </Row>
    </div>
  )
}
