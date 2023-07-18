import React from 'react';
import {
  Button,
  Form,
  Input,
  Typography,
  ConfigProvider,
  Space,
  Row,
} from 'antd';
const { Title } = Typography;
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { authReducer } from '../../redux/authSlice';

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [err, setErr] = React.useState({ status: false, message: '' });

  const onFinishStatus = (err, errorInfo: any) => {
    setErr({ err, message: errorInfo });

    setTimeout(() => {
      setErr({ err: false, message: '' });
    }, 3000);
  };

  const onFinish = async (values: any): Promise<void> => {
    const res = await fetch(import.meta.env.VITE_URL + 'admin/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(values),
    });

    if (res.ok) {
      const result = await res.json();
      dispatch(
        authReducer({
          type: 'admin',
          name: result.adminName,
          id: result.id,
          email: result.email,
        })
      );

      navigate('/admin');
    } else if (res.status === 403) {
      onFinishStatus(true, 'Неверный email/пароль');
    } else {
      onFinishStatus(true, 'Произошла ошибка, попробуйте позже');
    }
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: 'black',
            fontSize: 18,

            colorLink: 'black',
            colorLinkActive: 'black',
            colorLinkHover: 'gray',
          },
        }}
      >
        <Form
          name="basic"
          // labelCol={{ span: 8 }}
          // wrapperCol={{ span: 16 }}
          style={{ maxWidth: 500, paddingLeft: '2%' }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          {!err.status && (
            <Form.Item validateStatus="error" help={err.message} />
          )}
          <Title level={3}> Авторизация администратора</Title>
          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                required: true,
                message: 'Некорректно введена электронная почта!',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Введите электронную почту"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Вы забыли ввести пароль!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Введите пароль"
            />
          </Form.Item>

          {/* <Form.Item wrapperCol={{ offset: 4 }}>
            <Button type="primary" htmlType="submit">
              Войти в качестве администратора
            </Button>
          </Form.Item> */}

          <Row>
            <Link style={{ marginTop: '3px', marginLeft: '6px' }} to="/">
              На главную
            </Link>
            <Form.Item wrapperCol={{ offset: 3, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Войти в качестве администратора
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </ConfigProvider>
    </div>
  );
};

export default AdminLogin;
