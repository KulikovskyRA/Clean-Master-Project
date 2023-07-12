import React from 'react';
import { Button, Checkbox, Form, Input, Typography } from 'antd';
const { Title } = Typography;

const AdminLogin = () => {
  return (
    <>
      <Title>Авторизация администратора</Title>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              required: true,
              message: 'Неправильно введена электронная почта!',
            },
          ]}
        >
          <Input placeholder="Введите электронную почту" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Вы забыли ввести пароль!' }]}
        >
          <Input.Password placeholder="Введите пароль" />
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
