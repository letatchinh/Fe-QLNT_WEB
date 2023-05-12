import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import { KEY_STORED, ROLE } from '../../constant/defaultValue';
import api from '../../api'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {get} from 'lodash'

const Index = () => { 
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    const onFinish = async(values) => {
        setLoading(true)
      const res = await api.account.login(values)
      if(res.status){
        toast.success("Đăng nhập thành công")
        localStorage.setItem(KEY_STORED,JSON.stringify(get(res,'accountOne',{})))
        if(get(res,'accountOne.role') === ROLE.student){
          navigate("/findRoom")
        }
        else{
          navigate("/")
        }
      }
      else{
        toast.error("Đăng nhập Thất bại")
      }
      setLoading(false)
    };
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
    return (
  <Row align='center'>
    <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 1000,
      width : 400
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Tài khoản"
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Mật khẩu"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    {/* <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item> */}

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Row>
     <Col span={10}>
     <Button onClick={() =>navigate("/register")}>
        Đăng ký
      </Button>
     </Col>
    <Col span={10}>
    <Button loading={loading} type="primary" htmlType="submit">
        Đăng nhập
      </Button>
    </Col>
      </Row>
    </Form.Item>
  </Form>
  </Row>
)};
export default Index;