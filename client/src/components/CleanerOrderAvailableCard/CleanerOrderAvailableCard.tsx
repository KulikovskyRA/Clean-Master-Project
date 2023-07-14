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
  phone: '+998 95 678 2345'
};

const CleanerOrderAvailableCard: React.FC = () => {
  return (
    <Card title={`Заявка # ${orderData.id} (${orderData.date.toLocaleString('ru', { day: 'numeric', month: 'long', weekday: 'long' })})`}  bordered={false} style={{ width: "100%" }}>
          <p>Время уборки: {orderData.starTime.toLocaleString('ru', {
            hour: 'numeric',
            minute: 'numeric'
          })} - {orderData.endTime.toLocaleString('ru', { hour: 'numeric', minute: 'numeric' })}</p>
          <p>{`${orderData.city}, ${orderData.address}`}</p>
          <p>Дополнительные услуги: {orderData.additionalService}</p>
          <p>Вы заработаете: {Math.floor(orderData.totalPrice*0.2)} UZS</p>
            <Button type="primary" size="medium">
              Выполнить уборку
            </Button>
    </Card>
  );
};

export default CleanerOrderAvailableCard;
