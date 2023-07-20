import React from 'react';
import { Button, Checkbox, Form, Input, Select, Divider, Row } from 'antd';

const { Option } = Select;
import { LockOutlined } from '@ant-design/icons';

import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

import { authReducer } from '../../redux/authSlice';

const CleanerRegister = () => {
  const navigate = useNavigate();

  const [err, setErr] = React.useState({ status: false, message: '' });

  const onFinishStatus = (err, errorInfo: any) => {
    setErr({ err, message: errorInfo });
    setTimeout(() => {
      setErr({ err: false, message: '' });
    }, 3000);
  };

  const prefixSelector = (
    <Form.Item
      name="prefix"
      rules={[{ required: true, message: 'Выберите префикс!' }]}
      noStyle
    >
      <Select style={{ width: 100 }}>
        <Option value="+998">+998</Option>
        <Option value="+996">+996</Option>
        <Option value="+992">+992</Option>
        <Option value="+7">+7</Option>
      </Select>
    </Form.Item>
  );

  const onFinish = async (values: any): Promise<void> => {
    const { name, surname, patrname, prefix, phone, nation, password, pet } =
      values;
    let pets;
    if (pet === 'indefined' ?? !pet.length) {
      pets = false;
    } else {
      pets = true;
    }
    const inputs = {
      patrname,
      name,
      surname,
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
      <Divider>
        <h1>Заявка на сотрудничество</h1>
      </Divider>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 36 }}
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
              message: 'Введите номер телефона!',
            },
          ]}
        >
          <Input
            placeholder="Ваш номер телефона"
            addonBefore={prefixSelector}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item
          name="surname"
          rules={[{ required: true, message: 'Введите фамилию!' }]}
        >
          <Input placeholder="Ваша фамилия" />
        </Form.Item>
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Введите имя!' }]}
        >
          <Input placeholder="Ваше имя" />
        </Form.Item>
        <Form.Item
          name="patrname"
          rules={[{ required: true, message: 'Введите отчество!' }]}
        >
          <Input placeholder="Ваше отчество" />
        </Form.Item>

        <Form.Item
          name="nation"
          rules={[{ required: true, message: 'Введите гражданство!' }]}
        >
          <Select placeholder="Ваше гражданство" allowClear>
            <Option value="Узбекистан">Узбекистан</Option>
            <Option value="Казахстан">Казахстан</Option>
            <Option value="Кыргызстан">Кыргызстан</Option>
            <Option value="Таджикистан">Таджикистан</Option>
            <Option value="Российская Федерация">Российская Федерация</Option>
          </Select>
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
              Могу работать в помещении с домашними животными
            </Checkbox>
          </Checkbox.Group>
        </Form.Item>

        <Row>
          <Link style={{ marginTop: '6px' }} to="/cleanlogin">
            Уже являетесь клинером?
          </Link>
          <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
            <Button type="primary" size="large" htmlType="submit">
              Отправить заявку
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </>
  );
};

export default CleanerRegister;
