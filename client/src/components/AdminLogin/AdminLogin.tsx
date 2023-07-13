import React from 'react';
import { Button, Checkbox, Form, Input, Typography } from 'antd';
const { Title } = Typography;
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { authReducer } from '../../redux/authSlice';

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [err, setErr] = React.useState({ status: false, message: '' });

  const onFinishStatus = (err, errorInfo: any) => {
    setErr((prev) => ({
      err,
      message: errorInfo,
    }));

    setTimeout(() => {
      setErr((prev) => ({
        err: false,
        message: '',
      }));
    }, 3000);
  };

  const onFinish = async (values: any): Promise<void> => {
    // console.log(values);
    const res = await fetch(import.meta.env.VITE_URL + 'admin/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(values),
    });

    if (res.ok) {
      const result = await res.json();

      // console.log(result);

      dispatch(
        authReducer({
          type: 'admin',
          name: result.adminName,
          id: result.id,
          email: result.email,
        })
      );

      navigate('/admin');
      onFinishStatus(false, '');
    } else if (res.status === 403) {
      onFinishStatus(true, 'Неверный email/пароль');
    } else {
      onFinishStatus(true, 'Произошла ошибка, попробуйте позже');
    }
  };

  return (
    <>
      <Title>Авторизация администратора</Title>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        {!err.status && <Form.Item validateStatus="error" help={err.message} />}

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

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AdminLogin;
