import { Card, Col, Row } from 'antd';
import { useState, useEffect } from 'react';
import moment from 'moment';

const ClientCard = ({ client }) => {
  const [lastOrderDate, setLastOrderDate] = useState('Нет');

  useEffect(() => {
    const array = structuredClone(client.Orders);

    if (array.length) {
      array.sort((a, b) => new Date(b.cleaningTime) - new Date(a.cleaningTime));

      setLastOrderDate(moment(array[0]).format('DD.MM.YYYY'));
    }
  }, []);

  return (
    <Card
      size="small"
      style={{
        marginLeft: '10%',
        textAlign: 'start',
        marginRight: '10%',
        marginBottom: '10px',
      }}
    >
      <Row>
        <Col span={2}>
          <p>{`id: ${client.id}`}</p>
        </Col>
        <Col span={5}>
          <p>{`Имя: ${client.userName} `}</p>
        </Col>

        <Col span={3}>
          <p>{`${client.phoneNumber}`}</p>
        </Col>

        <Col span={4}>
          <p>{`E-mail: ${client.email}`}</p>
        </Col>

        <Col span={5}>
          <p>{`Количество заказов: ${client.Orders.length}`}</p>
        </Col>
        <Col>
          <p>{`Дата последнего заказа: ${lastOrderDate}`}</p>
        </Col>
      </Row>
    </Card>
  );
};

export default ClientCard;
