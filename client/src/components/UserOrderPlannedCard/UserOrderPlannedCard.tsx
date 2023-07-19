import * as React from "react";
import { Avatar, Button, Card, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";

// const orderData = {
//   id: 456,
//   date: new Date(),
//   startTime: new Date(),
//   endTime: new Date(),
//   city: "Ташкент",
//   address: "ул. Ракат 17, кв. 5, 2 этаж",
//   comment: "Пожалуйста не используйте хлорку",
//   additionalService: [ "помыть окно" ],
//   totalPrice: 249000,
// };


const UserOrderPlannedCard = ({ orderData }) => {
  const { id, address, cleaningTime, OrderServices, info } = orderData;
  const date = new Date(cleaningTime);
  const endTime = new Date(date.getTime() + 3 * 60 * 60 * 1000);

  const totalPrice = OrderServices.reduce((accumulator, currentObject) => {
    return accumulator + (currentObject.Service.singlePrice * currentObject.amount);
  }, 0);


  return (
    <Card
      title={`Заявка # ${id} (${date
        .toLocaleString("ru", {
          day: "numeric",
          month: "long",
          weekday: "long",
        })})`}
      style={{ width: "100%", border: "1px solid" }}
      headStyle={{ backgroundColor: "#B4C8DD" }}
    >
      <p>
        <b>Время уборки:</b>{" "}
        {date.toLocaleString("ru", {
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
        {`${address}`}
      </p>
      <p>
        <b>Дополнительные услуги:</b>
        {/*{console.log(orderData.OrderServices)}*/}
        <ul>
          {OrderServices.map((el, i) => (
            <li key={i}>{el.Service.title} {el.amount}</li>
          ))}
        </ul>
      </p>
      <p>
        <b>Комментарий к заказу:</b> {info}
      </p>
      <p>
        <b>Стоимость уборки:</b> {totalPrice} UZS
      </p>

      {/*<Avatar*/}
      {/*  style={{*/}
      {/*    marginLeft: "50px",*/}
      {/*    marginTop: "-200px",*/}
      {/*    marginRight: "30px",*/}
      {/*  }}*/}
      {/*  size={100}*/}
      {/*  icon={<UserOutlined/>}*/}
      {/*/>*/}
      {/*<p style={{ marginLeft: "45px", marginTop: "-80px" }}>Ищем клинера</p>*/}
      <Space>
        <Button type="primary" size="medium">
          Редактировать
        </Button>
        <Button type="default" size="medium">
          Отменить
        </Button>
      </Space>
    </Card>
  );
};

export default UserOrderPlannedCard;
