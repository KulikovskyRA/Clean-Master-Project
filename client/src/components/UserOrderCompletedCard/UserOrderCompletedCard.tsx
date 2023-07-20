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
  additionalService: [ "помыть окно" ],
  totalPrice: 249000,
};

const endTime = new Date(orderData.startTime.getTime() + 3 * 60 * 60 * 1000);

const cleanerData = {
  name: 'Айнура',
};

const UserOrderCompletedCard: React.FC = ({ orderData }) => {
  const { id, address, cleaningTime, OrderServices, info, price } = orderData;
  const date = new Date(cleaningTime);
  const endTime = new Date(date.getTime() + 3 * 60 * 60 * 1000);

  return (

    <Card
      title={`Заявка # ${id} (${date.toLocaleString("ru", {
        day: "numeric",
        month: "long",
        weekday: "long",
      })})`}
      style={{ width: "100%", border: "1px solid" }}
      headStyle={{ backgroundColor: "#EFEBEB" }}
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
        <b>Основные услуги:</b>
        <ul>
          {OrderServices
            .filter(el => el.Service.default === true)
            .map((el, i) => (
              <li key={i}>{el.Service.title} {el.amount}</li>
            ))}
        </ul>
        <b>Дополнительные услуги:</b>
        {console.log('SERVICES!', orderData.OrderServices)}
        <ul>
          {OrderServices
            .filter(el => el.Service.single === false && el.Service.default === false)
            .map((el, i) => (
              <li key={i}>{el.Service.title} {el.amount}</li>
            ))}

          {OrderServices
            .filter(el => el.Service.single === true && el.Service.default === false)
            .map((el, i) => (
              <li key={i}>{el.Service.title}</li>
            ))}
        </ul>
      </p>
      <p>
        <b>Комментарий к заказу:</b> {info}
      </p>
      <p>
        <b>Стоимость уборки:</b> {price} UZS
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
