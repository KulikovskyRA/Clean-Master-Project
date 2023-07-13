import * as React from 'react';
import { Button, Form, Input } from 'antd';
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/dist/query/core/apiState";

const { VITE_URL }: string = import.meta.env;

const UserEditForm = () => {
  const user = useSelector((state: RootState) => state.authSlice);
  const { name, phone, email } = user;

  const onFinish = async (values: any) => {
    try {
      const response = await fetch(`${VITE_URL}user/edit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(values),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      //initialValues={{ remember: true }}
      initialValues={{
        ["userName"]: name,
        ["email"]: email,
        ["phoneNumber"]: phone
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Имя"
        name="userName"
        rules={[ { required: true, message: 'Please input your username!' } ]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        label="Телефон"
        name="phoneNumber"
        rules={[ { required: true, message: 'Please input your phone!' } ]}
      >
        <Input value={phone}/>
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        value={email}
        rules={[ { type: 'email', required: true, message: 'Please input your email!' } ]}
      >
        <Input/>
      </Form.Item>


      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserEditForm;
