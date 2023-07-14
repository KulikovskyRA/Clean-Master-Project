import * as React from 'react';
import { Avatar, Button, Card, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const orderData = {
  date: new Date(),
  starTime: new Date(),
  endTime: new Date(),
  city: 'Ташкент',
  address: 'ул. Ленина д. 10 к.1',
  apartment: '10',
  comment: 'Пользовательский комментарий к заказу',
};

const UserOrderPlannedCard = () => {
  return (
    <Card
      style={{
        width: '600px',
        background: 'none',
        border: '1px black solid',
        marginLeft: '250px',
        marginBottom: '50px',
        fontSize: '18px',
      }}
    >
      <Space direction="horizontal" size={16}>
        <Space direction="vertical">
          <p style={{ fontWeight: 'bold' }}>
            {orderData.date.toLocaleString('ru', {
              day: 'numeric',
              month: 'long',
              weekday: 'long',
            })}
          </p>
          <p>
            Время уборки:{' '}
            {orderData.starTime.toLocaleString('ru', {
              hour: 'numeric',
              minute: 'numeric',
            })}{' '}
            -{' '}
            {orderData.endTime.toLocaleString('ru', {
              hour: 'numeric',
              minute: 'numeric',
            })}
          </p>
          <p>
            Адрес:{' '}
            {`${orderData.city}, ${orderData.address}, кв. ${orderData.apartment}`}
          </p>
          <Space direction="horizontal">
            <Button
              style={{ backgroundColor: 'green', color: 'white' }}
              size="large"
            >
              Перенести
            </Button>
            <Button
              style={{
                border: '1px red solid',
                background: 'red',
                color: 'white',
              }}
              size="large"
            >
              Отменить
            </Button>
          </Space>
          <p style={{ fontWeight: 'bold' }}>
            Комментарий к заказу:{' '}
            <p
              style={{
                height: '80px',
                fontWeight: 'normal',
              }}
            >
              {' '}
              {orderData.comment}
            </p>
          </p>
        </Space>
        <Space direction="vertical" wrap size={16}>
          <Avatar
            style={{
              marginLeft: '50px',
              marginTop: '-200px',
              marginRight: '30px',
            }}
            size={100}
            icon={<UserOutlined />}
          />
          <p style={{ marginLeft: '45px', marginTop: '-80px' }}>Ищем клинера</p>
        </Space>
      </Space>
    </Card>
  );
};

export default UserOrderPlannedCard;
