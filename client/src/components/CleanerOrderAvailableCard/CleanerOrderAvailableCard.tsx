import React from "react";
import { Button, Card } from "antd";
import moment from "moment";

const CleanerOrderAvailableCard = ({ orderData }) => {
  console.log("available orderData------->", orderData);
  return (
    <Card
      title={`Заявка # ${orderData.id} (${moment(orderData.cleaningTime).format(
        "DD.MM.YYYY"
      )})`}
      style={{ width: "100%", border: "1px solid", marginBottom: "10px" }}
      headStyle={{ backgroundColor: "LightGray" }}
    >
      <p>
        <b>Время уборки: </b>
        {`${moment(orderData.cleaningTime).format("HH:mm")} - ${moment(
          orderData.cleaningTime
        )
          .add(3, "hours")
          .format("HH:mm")}`}
      </p>
      <p>
        <b>Адрес: </b>
        {orderData.address}
      </p>
      <p>
        <b>Дополнительные услуги:</b> {orderData.OrderServices}
      </p>
      <p>
        <b>Вы заработаете:</b> {Math.floor(orderData.price * 0.2)} UZS
      </p>
      <Button type="primary" size="medium">
        Выполнить уборку
      </Button>
    </Card>
  );
};

export default CleanerOrderAvailableCard;