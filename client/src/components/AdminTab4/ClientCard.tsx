import { Card, Col, Row, Typography } from 'antd';
const { Text } = Typography;
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
        paddingLeft: '1%',
      }}
    >
      <Row>
        <Col span={3}>
          <Text strong>{`id:\u00A0`}</Text>
          <Text>{`${client.id}`}</Text>
        </Col>
        <Col span={3}>
          <Text strong>{`Имя:\u00A0`}</Text>
          <Text>{`${client.userName}`}</Text>
        </Col>

        <Col span={3}>
          <Text>{`${client.phoneNumber}`}</Text>
        </Col>

        <Col span={5}>
          <Text strong>{`E-mail:\u00A0`}</Text>
          <Text>{`${client.email}`}</Text>
        </Col>

        <Col span={5}>
          <Text strong>{`Количество заказов:\u00A0`}</Text>
          <Text>{`${client.Orders.length}`}</Text>
        </Col>
        <Col>
          <Text strong>{`Дата последнего заказа:\u00A0`}</Text>
          <Text>{`${lastOrderDate}`}</Text>
        </Col>
      </Row>
    </Card>
  );
};

export default ClientCard;
