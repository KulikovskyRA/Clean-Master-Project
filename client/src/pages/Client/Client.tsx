import { useState } from 'react';
import { UserOutlined, FormOutlined } from '@ant-design/icons';
import { Avatar, Button, Space, List, Modal } from 'antd';
import UserOrdersTabs from '../../components/UserOrdersTabs/UserOrdersTabs';
import UserEditForm from "../../components/UserEditForm/UserEditForm";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/dist/query/core/apiState";

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

  const listData = [
    `Имя: ${userData.name}`,
    `Контактный номер: ${userData.phone}`,
    `E-mail: ${userData.email}`,
  ];

  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const user = useSelector((state: RootState) => state.authSlice);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
              <FormOutlined style={{ fontSize: '24px' }} />
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
            >
              <UserEditForm/>
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


      <UserOrdersTabs />
    </div>


  );
};

export default Client;
