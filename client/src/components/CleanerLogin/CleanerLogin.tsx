import React from 'react';
import { Button, Checkbox, Form, Input, Typography, Select } from 'antd';
const { Title } = Typography;
const { Option } = Select;
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { authReducer } from '../../redux/authSlice';

const CleanerLogin = () => {
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

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  const onFinish = async (values: any): Promise<void> => {
    const phone = values.prefix + values.phonelast;
    console.log(phone);
  };

  return (
    <>
      <Title>Авторизация клинета</Title>
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
          name="phonelast"
          rules={[
            {
              required: true,
              message:
                'Напиши свою звонилку нормально, если не хочешь потерять работу! ',
            },
          ]}
        >
          <Input
            placeholder="Введите номер телефона"
            addonBefore={prefixSelector}
            style={{ width: '100%' }}
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

export default CleanerLogin;
