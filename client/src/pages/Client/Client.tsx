import { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Space, List, Modal } from 'antd';
import UserOrdersTabs from "../../components/UserOrdersTabs/UserOrdersTabs";

interface IUserData {
  name: string;
  phone: string;
  email: string;
}

const userData: IUserData = {
  name: 'Валентина',
  phone: '+7 000 000 00 00',
  email: 'email@example.com'
};

const Client: React.FC = () => {
  const listData = [
    `Здравствуйте, ${userData.name}!`,
    `Контактный номер: ${userData.phone}`,
    `E-mail: ${userData.email}`,
  ];

  const [ isModalOpen, setIsModalOpen ] = useState(false);


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
    <>
      <h2>Личный кабинет</h2>
      <div>
        <div>
          <Space direction="horizontal" size={16}>
            <Space wrap size={16}>
              <Avatar size={64} icon={<UserOutlined/>}/>
            </Space>
            <Space>
              <List
                size="small"
                dataSource={listData}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />

            </Space>
          </Space>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Button block onClick={showModal}>
              Редактировать профиль
            </Button>
            <Modal title="Редактирование профиля" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </Modal>
          </Space>
        </div>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Button block type="primary">
            Заказать уборку
          </Button>
        </Space>
      </div>

      <UserOrdersTabs/>

    </>
  );
};

export default Client;
