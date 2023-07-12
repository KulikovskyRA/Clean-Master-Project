import * as React from 'react';
import { Button, Card, Space } from "antd";

const orderData = {
  id: 456,
  date: new Date(),
  starTime: new Date(),
  endTime: new Date(),
  city: 'Ташкент',
  address: 'ул. Ракат 17, кв. 5, 2 этаж',
  comment: 'Пожалуйста не используйте хлорку',
  additionalService: ['помыть окно'],
  totalPrice: 1761,
};

const userData = {
  userName: 'Пётр', 
  phone: '+998 95 678 2345',
}

const CleanerOrderPlannedCard = () => {
  return (
    <Card style={{ width: '100%' }}>
      <Space direction="horizontal" size={16}>
        <Space direction="vertical">
        <p>Номер заказа: {orderData.id}</p>
          <p>{orderData.date.toLocaleString('ru', { day: 'numeric', month: 'long', weekday: 'long' })}</p>
          <p>Время уборки: {orderData.starTime.toLocaleString('ru', {
            hour: 'numeric',
            minute: 'numeric'
          })} - {orderData.endTime.toLocaleString('ru', { hour: 'numeric', minute: 'numeric' })}</p>
          <p>{`${orderData.city}, ${orderData.address}`}</p>
          <p>Дополнительные услуги: {orderData.additionalService}</p>
          <p>Хозяин квартиры: {userData.userName}</p>
          <p>Контактный номер: {userData.phone}</p>
          <p>Комментарий к заказу: {orderData.comment}</p>
          <p>Вы заработаете: {Math.floor(orderData.totalPrice*0.2)} UZS</p>
          <Space direction="horizontal">
            <Button size="large">
              Отказаться
            </Button>
          </Space>
        </Space>
      </Space>
    </Card>
  );
};

export default CleanerOrderPlannedCard;
