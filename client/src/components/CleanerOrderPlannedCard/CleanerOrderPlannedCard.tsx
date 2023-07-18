/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as React from "react";
import { Button, Card, Space } from "antd";

// const endTime = new Date(orderData.startTime.getTime() + 3 * 60 * 60 * 1000);

const userData = {
  userName: "Пётр",
  phone: "+998 95 678 2345",
};

const CleanerOrderPlannedCard = ({orderData}) => {
  console.log('orderData------->', orderData);
  
  return (
    <Card
      title={`Заявка # ${orderData.id} (${orderData.cleaningTime.toLocaleString("ru", {
        day: "numeric",
        month: "long",
        weekday: "long",
      })})`}
      style={{ width: "100%", border: "1px solid", marginBottom: "10px" }}
      headStyle={{ backgroundColor: "OldLace" }}
    >
      {/* <p>
        <b>Время уборки:</b>{" "}
        {orderData.startTime.toLocaleString("ru", {
          hour: "numeric",
          minute: "numeric",
        })}{" "}
        -{" "}
        {orderData.endTime.toLocaleString("ru", {
          hour: "numeric",
          minute: "numeric",
        })}
      </p> */}
      <p>
        <b>Адрес: </b>
        {orderData.address}
      </p>
      <p>
        <b>Дополнительные услуги:</b> {orderData.OrderServices}
      </p>
      <p>
        <b>Хозяин квартиры:</b> {orderData.User.userName}
      </p>
      <p>
        <b>Контактный номер:</b> {orderData.User.phoneNumber}
      </p>
      <p>
        <b>Комментарий к заказу:</b> {orderData.info}
      </p>
      <p>
        <b>Вы заработаете:</b> {Math.floor(orderData.price * 0.2)} UZS
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
