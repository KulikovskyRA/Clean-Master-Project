import React from 'react';

import moment from 'moment';
import { Button, Card, Col, Row, Modal, Select, Typography, Input } from 'antd';
const { Text } = Typography;

const CleanerOrderAvailableCard = ({ orderData }) => {
  console.log('available orderData------->', orderData);

  const acceptOrder = async (orderId) => {
    const res: Response = await fetch(
      import.meta.env.VITE_URL + `order/accept/${orderId}`,
      {
        method: 'PUT',
        credentials: 'include',
      }
    );
  };

  return (
    <Card
      title={`Заявка # ${orderData.id} (${moment(orderData.cleaningTime).format(
        'DD.MM.YYYY'
      )})`}
      style={{ width: '100%', border: '1px solid', marginBottom: '10px' }}
      headStyle={{ backgroundColor: 'LightGray' }}
    >
      <p>
        <b>Время уборки: </b>
        {`${moment(orderData.cleaningTime).format('HH:mm')} - ${moment(
          orderData.cleaningTime
        )
          .add(3, 'hours')
          .format('HH:mm')}`}
      </p>

      <p>
        <b>Адрес: </b>
        {orderData.address}
      </p>

      <Text strong style={{ padding: 0, margin: 0 }}>
        Услуги:
      </Text>
      <div style={{ marginLeft: 20 }}>
        {orderData.OrderServices.map((OS) => (
          <Row key={`os${OS.id}`}>
            <Text strong>{`${OS.Service.title}:\u00A0`}</Text>
            <Text>{`${OS.amount}`}</Text>
          </Row>
        ))}
      </div>

      <p>
        <b>Вы заработаете:</b> {Math.floor(orderData.price * 0.2)} UZS
      </p>
      <Button
        onClick={() => acceptOrder(orderData.id)}
        type="primary"
        size="medium"
      >
        Выполнить уборку
      </Button>
    </Card>
  );
};

export default CleanerOrderAvailableCard;
