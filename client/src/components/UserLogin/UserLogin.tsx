import * as React from 'react';
import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { VITE_URL }: string = import.meta.env;

import { useDispatch } from 'react-redux';

import { authReducer } from '../../redux/authSlice';

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const UserLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [message, setMessage] = useState('');

  const onFinish = async (values: any) => {
    try {
      const response = await fetch(`${VITE_URL}auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(values),
      });
      const result = await response.json();
      if (response.ok) {
        dispatch(
          authReducer({
            type: 'user',
            name: result.user.name,
            id: result.user.id,
            email: result.user.email,
            phoneNumber: result.user.phoneNumber,
          })
        );
        navigate(0);

        setTimeout(() => {
          setMessage('');
        }, 3000);
        setMessage(result.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      // wrapperCol={{ span: 16 }}
      style={{ maxWidth: 700 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <h1>{message}</h1>
      <Form.Item
        // label="Email"
        name="email"
        rules={[
          {
            type: 'email',
            required: true,
            message: 'Пожалуйста, введите электронную почту',
          },
        ]}
      >
        <Input placeholder="Введите электронную почту:" />
      </Form.Item>

      <Form.Item
        // label="Password"
        name="password"
        rules={[{ required: true, message: 'Вы забыли ввести пароль' }]}
      >
        <Input.Password placeholder="Введите пароль:" />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 15, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserLogin;
