import * as React from 'react';
import { Avatar, Button, Card, Space } from "antd";
import { UserOutlined } from '@ant-design/icons';

const orderData = {
  date: new Date(),
  starTime: new Date(),
  endTime: new Date(),
  city: 'Ташкент',
  address: 'ул. Ленина д. 10 к.1',
  apartment: '10',
  comment: 'Пользовательский комментарий к заказу'
};

const UserOrderPlannedCard = () => {
  return (
    <Card style={{ width: '100%' }}>

      <Space direction="horizontal" size={16}>
        <Space direction="vertical">
          <p>{orderData.date.toLocaleString('ru', { day: 'numeric', month: 'long', weekday: 'long' })}</p>
          <p>Время уборки: {orderData.starTime.toLocaleString('ru', {
            hour: 'numeric',
            minute: 'numeric'
          })} - {orderData.endTime.toLocaleString('ru', { hour: 'numeric', minute: 'numeric' })}</p>
          <p>{`${orderData.city}, ${orderData.address}, кв. ${orderData.apartment}`}</p>
          <Space direction="horizontal">
            <Button type="primary" size="large">
              Перенести
            </Button>
            <Button size="large">
              Отменить
            </Button>
          </Space>
          <p>Комментарий к заказу: {orderData.comment}</p>
        </Space>
        <Space direction="vertical" wrap size={16}>
          <Avatar size={64} icon={<UserOutlined/>}/>
          <p>Ищем клинера</p>
        </Space>
      </Space>
    </Card>
  );
};

export default UserOrderPlannedCard;
