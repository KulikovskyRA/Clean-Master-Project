import * as React from 'react';
import { Avatar, Card, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const orderData = {
  id: 12334,
  dateStart: new Date(),
  city: 'Ташкент',
  address: 'ул. Ленина д. 10 к.1',
  apartment: '10',
};

const cleanerData = {
  name: 'Айнура',
};

const UserOrderComplitedRow: React.FC = () => {
  return (
    <Card
      style={{
        fontSize: '18px',
        marginBottom: '50px',
        width: '600px',
        background: 'none',
        border: '1px black solid',
        marginLeft: '250px',
      }}
    >
      <Space direction="horizontal">
        <div>
          {orderData.dateStart.toLocaleString('ru', {
            day: 'numeric',
            month: 'long',
          })}
          <br />
          {orderData.dateStart.toLocaleString('ru', {
            hour: 'numeric',
            minute: 'numeric',
          })}
        </div>
        <div>
          {`${orderData.city}, ${orderData.address}, кв. ${orderData.apartment}`}
          <br />
          Заказ: #{orderData.id}
        </div>
        <Space direction="vertical" wrap size={16}>
          <Avatar
            style={{ marginLeft: '50px' }}
            size={100}
            icon={<UserOutlined />}
          />
          <p
            style={{
              marginLeft: '70px',
              marginTop: '-20px',
              fontWeight: 'bold',
            }}
          >
            {cleanerData.name}
          </p>
        </Space>
      </Space>
    </Card>
  );
};

export default UserOrderComplitedRow;
