import * as React from 'react';
import { Button, Form, Input } from 'antd';

const UserEditForm = ({ user }) => {
  const { name, phone, email } = user;
  console.log(name);
  const onFinish = (values: any) => {
    console.log('Success:', values);
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
