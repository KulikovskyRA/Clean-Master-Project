import * as React from "react";
import { Button, Card, Space } from "antd";

const orderData = {
  id: 456,
  date: new Date(),
  starTime: new Date(),
  endTime: new Date(),
  city: "Ташкент",
  address: "ул. Ракат 17, кв. 5, 2 этаж",
  comment: "Пожалуйста не используйте хлорку",
  additionalService: ["помыть окно"],
  totalPrice: 1761,
};

const userData = {
  userName: "Пётр",
  phone: "+998 95 678 2345",
};

const CleanerOrderPlannedCard = () => {
  return (
    <Card
      title={`Заявка # ${orderData.id} (${orderData.date.toLocaleString("ru", {
        day: "numeric",
        month: "long",
        weekday: "long",
      })})`}
      bordered={false}
      style={{ width: "100%", border: "1px solid" }}
      headStyle={{ backgroundColor: "OldLace" }}
    >
      <p>
        <b>Время уборки:</b>{" "}
        {orderData.starTime.toLocaleString("ru", {
          hour: "numeric",
          minute: "numeric",
        })}{" "}
        -{" "}
        {orderData.endTime.toLocaleString("ru", {
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
        <b>Хозяин квартиры:</b> {userData.userName}
      </p>
      <p>
        <b>Контактный номер:</b> {userData.phone}
      </p>
      <p>
        <b>Комментарий к заказу:</b> {orderData.comment}
      </p>
      <p>
        <b>Вы заработаете:</b> {Math.floor(orderData.totalPrice * 0.2)} UZS
      </p>
      <Space>
        <Button type="primary" size="medium">
          Выполнена
        </Button>
        <Button type="default" size="medium">
          Отказаться
        </Button>
      </Space>
    </Card>
  );
};

export default CleanerOrderPlannedCard;
