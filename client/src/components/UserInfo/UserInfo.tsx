import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { RootState } from "@reduxjs/toolkit/dist/query/core/apiState";
import { authReducer } from "../../redux/authSlice";

import { FormOutlined } from "@ant-design/icons";
import { Space, Button, Form, Input, Modal } from "antd";

const { VITE_URL } = import.meta.env;

interface IUserData {
  name: string;
  phone: string;
  email: string;
}

const userData: IUserData = {
  name: "Акакий",
  phone: "+998 94 720 2212",
  email: "puk@example.com",
};

export default function UserInfo() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector((state: RootState) => state.authSlice.user);

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
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ values, id: user.id }),
      });
      const result = await response.json();
      if (response.ok) {
        dispatch(
          authReducer({
            type: "user",
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
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <p>
        <b>Имя пользователя: </b>
        {userData.name}
      </p>
      <p>
        <b>Контактный номер: </b>
        {userData.phone}
      </p>
      <p>
        <b>E-mail: </b>
        {userData.email}
      </p>
      <Space>
        <Button
          type="default"
          size="small"
          icon={<FormOutlined />}
          onClick={showModal}
        >
          Редактировать данные
        </Button>
      </Space>
      <Modal
        id="modal-user"
        title="Редактирование данных профиля"
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
          initialValues={{
            ["userName"]: userData.name,
            ["email"]: userData.email,
            ["phoneNumber"]: userData.phone,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Имя"
            name="userName"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Телефон"
            name="phoneNumber"
            rules={[{ required: true, message: "Please input your phone!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Сохранить
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
