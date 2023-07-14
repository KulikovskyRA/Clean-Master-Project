import React from 'react';
import { Button, Checkbox, Form, Input, Typography, Select } from 'antd';
const { Title } = Typography;
const { Option } = Select;
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { authReducer } from '../../redux/authSlice';

const CleanerRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [err, setErr] = React.useState({ status: false, message: '' });

  const onFinishStatus = (err, errorInfo: any) => {
    setErr((prev) => ({
      err,
      message: errorInfo,
    }));
  };

  const prefixSelector = (
    <Form.Item name="prefix" rules={[{ required: true }]} noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  const onFinish = async (values: any): Promise<void> => {
    const { name, surname, patrname, prefix, phone, nation, password, pet } =
      values;
    // console.log(pet);
    let pets;
    if (pet === 'indefined' || pet.length === 0) {
      pets = false;
    } else {
      pets = true;
    }
    // console.log(pets);

    const inputs = {
      name,
      surname,
      patrname,
      phoneNumber: prefix + phone,
      nation,
      password,
      pets,
    };

    const res = await fetch(import.meta.env.VITE_URL + 'cleaner/register', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(inputs),
    });

    if (res.ok) {
      const result = await res.json();
      //   console.log(result);

      authReducer({
        type: 'cleaner',
        name: result.cleaner.name,
        id: result.cleaner.id,
        email: '',
        phoneNumber: result.cleaner.phoneNumber,
      });
      navigate('/cleaner');
    } else if (res.status === 403) {
      onFinishStatus(true, 'Клинер с таким номером уже существует');
    } else {
      onFinishStatus(true, 'Произошла ошибка, попробуйте позже');
    }
  };

  return (
    <>
      <Title>Регистрация клинера</Title>
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
          name="phone"
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
          name="name"
          rules={[{ required: true, message: 'Введите имя!' }]}
        >
          <Input placeholder="Введите имя!" />
        </Form.Item>

        <Form.Item
          name="surname"
          rules={[{ required: true, message: 'Введите фамилию!' }]}
        >
          <Input placeholder="Введите фамилию!" />
        </Form.Item>

        <Form.Item
          name="patrname"
          rules={[{ required: true, message: 'Введите отчество!' }]}
        >
          <Input placeholder="Введите отчество!" />
        </Form.Item>

        <Form.Item
          name="nation"
          rules={[{ required: true, message: 'Какое у Вас гражданство?' }]}
        >
          <Input placeholder="Какое у Вас гражданство?" />
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
        <Form.Item name="pet">
          <Checkbox.Group>
            <Checkbox value="true" style={{ lineHeight: '32px' }}>
              Готова работать с питомцами
            </Checkbox>
          </Checkbox.Group>
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

export default CleanerRegister;
