import * as React from 'react';
import { Button, Form, Input, InputNumber, Select } from 'antd';

import { IRegisterInputs, messageType } from '../../types/typesForms';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const { Option } = Select;

const { VITE_URL }: string = import.meta.env;

import { useDispatch } from 'react-redux';

import { authReducer } from '../../redux/authSlice';

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select style={{ width: 70 }}>
      <Option value="86">+86</Option>
      <Option value="87">+87</Option>
    </Select>
  </Form.Item>
);

const UserRegistration: React.FC = () => {
  const [ message, setMessage ] = useState<messageType>('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values: IRegisterInputs): Promise<object> => {
    try {
      const response = await fetch(`${VITE_URL}auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(values),
      });
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        dispatch(
          authReducer({
            type: 'user',
            name: result.user.userName,
            id: result.user.id,
            email: result.user.email,
            phoneNumber: result.user.phoneNumber,
          })
        );
        navigate('/client');
      }
      // else {
      //   authReducer({
      //     type: '',
      //     name: '',
      //     id: 0,
      //     email: '',
      //   });

      setTimeout(() => {
        setMessage('');
      }, 3000);
      setMessage(result.error);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      name="basic"
      layout="vertical"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <h1 className="text-red-600">{message}</h1>
      <Form.Item
        label="Как Вас зовут?"
        name="userName"
        rules={[ { required: true, message: 'Пожалуйста, введите Ваше имя!' } ]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        label="E-mail"
        name="email"
        rules={[
          {
            type: 'email',
            required: true,
            message: 'Пожалуйста, введите корректный email!',
          },
        ]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        label="Телефон"
        name="phone"
        rules={[ { required: true, message: 'Please input your phone number!' } ]}
      >
        <InputNumber addonBefore={prefixSelector} style={{ width: '100%' }}/>
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[ { required: true, message: 'Please input your password!' } ]}
      >
        <Input.Password/>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Зарегистрироваться
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserRegistration;
