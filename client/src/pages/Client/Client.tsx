import { useState } from 'react';
import { UserOutlined, FormOutlined } from '@ant-design/icons';
import { Avatar, Button, Space, List, Modal, Form, Input } from 'antd';
import UserOrdersTabs from '../../components/UserOrdersTabs/UserOrdersTabs';
import UserEditForm from "../../components/UserEditForm/UserEditForm";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/dist/query/core/apiState";
import * as React from "react";
import { authReducer } from "../../redux/authSlice";
import { useDispatch } from 'react-redux';

const { VITE_URL }: string = import.meta.env;

interface IUserData {
  name: string;
  phone: string;
  email: string;
}

const userData: IUserData = {
  name: 'Валентина',
  phone: '+7 000 000 00 00',
  email: 'email@example.com',
};

const Client: React.FC = () => {

  const dispatch = useDispatch();
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const user = useSelector((state: RootState) => state.authSlice.user);

  const listData = [
    `Имя: ${user.name}`,
    `Контактный номер: ${user.phoneNumber}`,
    `E-mail: ${user.email}`,
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values: any) => {
    try {
      const response = await fetch(`${VITE_URL}user/edit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ values, id: user.id }),
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
      }
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div>
      <h2 style={{ marginLeft: '30px', color: 'rgb(2, 2, 134)' }}>
        CLEAN MASTER
      </h2>
      <div>
        <div>
          <h2 style={{ textAlign: 'center' }}>ЛИЧНЫЙ КАБИНЕТ</h2>
          <Space
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              marginLeft: '250px',
              width: '800px',
              margin: '0px auto',
            }}
            direction="horizontal"
            size={16}
          >
            <Space wrap size={16}>

              <Avatar size={64} icon={<UserOutlined/>}/>

            </Space>
            <Button
              style={{
                marginLeft: '20px',
                marginTop: '-15px',
                background: 'none',
                border: 'none',
                boxShadow: 'none',
                display: 'flex',
              }}
              block
              onClick={showModal}
            >
              <FormOutlined style={{ fontSize: '24px' }}/>
            </Button>
            <Space>
              <List
                size="small"
                dataSource={listData}
                renderItem={(item) => (
                  <List.Item style={{ fontSize: '18px' }}>{item}</List.Item>
                )}
              />
            </Space>
          </Space>
          <Space>
            <Modal
              id="modal-user"
              title="Редактирование профиля"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={null}
            >
              <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                //initialValues={{ remember: true }}
                initialValues={{
                  ["userName"]: user.name,
                  ["email"]: user.email,
                  ["phoneNumber"]: user.phoneNumber
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
                  <Input/>
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
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
            </Modal>
          </Space>
        </div>
        <Space direction="vertical" style={{ width: '100%' }}>
          <div className="btn-box">
            <Button
              style={{
                width: '200px',
                margin: '0px auto',
                background: 'rgba(240, 203, 37, 0.699)',
                color: 'black',
                fontWeight: 'bold',
                fontFamily: "'Oswald', sans-serif",
              }}
              id="order-user"
              block
              type="primary"
            >
              ЗАКАЗАТЬ УБОРКУ
            </Button>
          </div>
        </Space>
      </div>


      <UserOrdersTabs/>
    </div>


  );
};

export default Client;
