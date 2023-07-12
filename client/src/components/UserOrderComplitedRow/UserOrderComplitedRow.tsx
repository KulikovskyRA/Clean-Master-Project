import * as React from 'react';
import { Avatar, Card, Space } from "antd";
import { UserOutlined } from '@ant-design/icons';

const orderData = {
  id: 12334,
  dateStart: new Date(),
  city: 'Ташкент',
  address: 'ул. Ленина д. 10 к.1',
  apartment: '10',
};

const cleanerData = {
  name: 'Айнура'
};

const UserOrderComplitedRow: React.FC = () => {
  return (
    <Card style={{ width: '100%' }}>
      <Space direction="horizontal">
        <div>
          {orderData.dateStart.toLocaleString('ru', { day: 'numeric', month: 'long' })}<br/>
          {orderData.dateStart.toLocaleString('ru', {
            hour: 'numeric',
            minute: 'numeric'
          })}
        </div>
        <div>
          {`${orderData.city}, ${orderData.address}, кв. ${orderData.apartment}`}<br/>
          Заказ: #{orderData.id}
        </div>
        <Space direction="vertical" wrap size={16}>
          <Avatar size={64} icon={<UserOutlined/>}/>
          <p>{cleanerData.name}</p>
        </Space>
      </Space>
    </Card>
  );
};

export default UserOrderComplitedRow;
