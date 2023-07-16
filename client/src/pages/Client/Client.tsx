import { useState } from "react";
import { UserOutlined, FormOutlined } from "@ant-design/icons";
import {
  Button,
  Space,
  List,
  Modal,
  Form,
  Input,
  ConfigProvider,
  Divider,
} from "antd";
import UserOrdersTabs from "../../components/UserOrdersTabs/UserOrdersTabs";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/dist/query/core/apiState";
import * as React from "react";
import { authReducer } from "../../redux/authSlice";
import { useDispatch } from "react-redux";

const { VITE_URL }: string = import.meta.env;

interface IUserData {
  name: string;
  phone: string;
  email: string;
}

const userData: IUserData = {
  name: "Валентина",
  phone: "+7 000 000 00 00",
  email: "email@example.com",
};

const Client: React.FC = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "black",
          fontSize: 15,
        },
      }}
    >
      <div
        style={{
          width: "80%",
          margin: "0 auto",
          marginBottom: "50px",
          marginTop: "50px",
        }}
      >
        <Divider>
          <h1>Личный кабинет</h1>
        </Divider>
        <div>
          <div>
            <Button
              style={{
                marginLeft: "20px",
                marginTop: "-15px",
                background: "none",
                border: "none",
                boxShadow: "none",
                display: "flex",
              }}
              block
              onClick={showModal}
            >
              <FormOutlined style={{ fontSize: "24px" }} />
            </Button>
            <Space>
              <List
                size="small"
                dataSource={listData}
                renderItem={(item) => (
                  <List.Item style={{ fontSize: "18px" }}>{item}</List.Item>
                )}
              />
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
                    ["phoneNumber"]: user.phoneNumber,
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
                    rules={[
                      { required: true, message: "Please input your phone!" },
                    ]}
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
            </Space>
          </div>
          <Space direction="vertical" style={{ width: "100%" }}>
            <div className="btn-box">
              <Button type="primary" size="large" href="#cleanerRegForm" target="_self">
                Заказать уборку
              </Button>
            </div>
          </Space>
        </div>
        <UserOrdersTabs />
      </div>
    </ConfigProvider>
  );
};

export default Client;
