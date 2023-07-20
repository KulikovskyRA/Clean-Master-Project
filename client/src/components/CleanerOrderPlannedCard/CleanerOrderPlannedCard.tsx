/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as React from 'react';
import { Button, Card, Space } from 'antd';

import moment from 'moment';

const CleanerOrderPlannedCard = ({ orderData }) => {
  // console.log("orderData------->", orderData);

  return (
    <Card
      title={`Заявка # ${orderData.id} (${moment(orderData.cleaningTime).format(
        'DD.MM.YYYY'
      )})`}
      style={{ width: '100%', border: '1px solid', marginBottom: '10px' }}
      headStyle={{ backgroundColor: 'OldLace' }}
    >
      <p>
        <p>
          <b>Время уборки: </b>
          {`${moment(orderData.cleaningTime).format('HH:mm')} - ${moment(
            orderData.cleaningTime
          )
            .add(3, 'hours')
            .format('HH:mm')}`}
        </p>
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
