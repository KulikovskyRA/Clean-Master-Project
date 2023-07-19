import * as React from 'react';
import { Avatar, Button, Card, Space } from 'antd';

const orderData = {
  id: 456,
  date: new Date(),
  startTime: new Date(),
  endTime: new Date(),
  city: "Ташкент",
  address: "ул. Ракат 17, кв. 5, 2 этаж",
  comment: "Пожалуйста не используйте хлорку",
  additionalService: ["помыть окно"],
  totalPrice: 249000,
};

const endTime = new Date(orderData.startTime.getTime() + 3 * 60 * 60 * 1000);

const cleanerData = {
  name: 'Айнура',
};

const UserOrderCompletedCard: React.FC = () => {
  return (
    
    <Card
      title={`Заявка # ${orderData.id} (${orderData.date.toLocaleString("ru", {
        day: "numeric",
        month: "long",
        weekday: "long",
      })})`}
      style={{ width: "100%", border: "1px solid" }}
      headStyle={{ backgroundColor: "#EFEBEB" }}
    >
      <p>
        <b>Время уборки:</b>{" "}
        {orderData.startTime.toLocaleString("ru", {
          hour: "numeric",
          minute: "numeric",
        })}{" "}
        -{" "}
        {endTime.toLocaleString("ru", {
          hour: "numeric",
          minute: "numeric",
        })}
      </p>
      <p>
        <b>Адрес:</b>
        {`${orderData.city}, ${orderData.address}`}
      </p>
      <p>
        <b>Дополнительные услуги:</b> {orderData.additionalService}
      </p>
      <p>
        <b>Комментарий к заказу:</b> {orderData.comment}
      </p>
      <p>
        <b>Стоимость уборки:</b> {orderData.totalPrice} UZS
      </p>

      {/* <Avatar
        style={{
          marginLeft: "50px",
          marginTop: "-200px",
          marginRight: "30px",
        }}
        size={100}
        icon={<UserOutlined />}
      />
      <p style={{ marginLeft: "45px", marginTop: "-80px" }}>Ищем клинера</p> */}
      <Space>
        <Button type="primary" size="medium">
          Повторить уборку
        </Button>
        <Button type="default" size="medium">
          Оценить
        </Button>
      </Space>
    </Card>
  );
};

export default UserOrderCompletedCard;
