import { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Space, List, Modal } from 'antd';
import UserOrdersTabs from '../../components/UserOrdersTabs/UserOrdersTabs';

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
    `Здравствуйте, ${userData.name}!`,
    `Контактный номер: ${userData.phone}`,
    `E-mail: ${userData.email}`,
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <div className="user-main">
        <div>
          <Space className="user-profile" direction="horizontal" size={16}>
            <Space wrap size={16}>
              <Avatar size={64} icon={<UserOutlined />} />
            </Space>
            <Space>
              <List
                className="info-user"
                size="small"
                dataSource={listData}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            </Space>
          </Space>
          <Space>
            <Button id="btn-profile" block onClick={showModal}>
              Редактировать профиль
            </Button>
            <Modal
              id="modal-user"
              title="Редактирование профиля"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </Modal>
          </Space>
        </div>
        <Space direction="vertical" style={{ width: '100%' }}>
          <div className="btn-box">
            <Button id="order-user" block type="primary">
              Заказать уборку
            </Button>
          </div>
        </Space>
      </div>

      <UserOrdersTabs />
    </>
  );
};

export default Client;
