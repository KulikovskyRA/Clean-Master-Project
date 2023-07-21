import React from 'react';

import moment from 'moment';
import { Button, Card, Row, Typography, Col } from 'antd';
const { Text } = Typography;
import { SmileOutlined } from '@ant-design/icons';

import { useNavigate } from 'react-router-dom';

const CleanerOrderAvailableCard = ({ orderData }) => {
  // console.log('available orderData------->', orderData);

  const navigate = useNavigate();

  const acceptOrder = async (orderId) => {
    const res: Response = await fetch(
      import.meta.env.VITE_URL + `order/accept/${orderId}`,
      {
        method: 'PUT',
        credentials: 'include',
      }
    );
    if (res.ok) {
      navigate(0);
    }
  };

  return (
    <Card
      title={`Заявка # ${orderData.id} (${moment(orderData.cleaningTime).format(
        'DD.MM.YYYY'
      )})`}
      style={{
        marginLeft: '11%',
        width: '80%',
        border: '1px solid',
        marginBottom: '10px',
      }}
      headStyle={{ backgroundColor: 'LightGray' }}
    >
      <Row justify="space-between">
        <Col span={8}>
          <Row>
            <Text strong>{`Время уборки:\u00A0`}</Text>
            <Text>
              {`${moment(orderData.cleaningTime).format('HH:mm')} - ${moment(
                orderData.cleaningTime
              )
                .add(3, 'hours')
                .format('HH:mm')}`}
            </Text>
          </Row>
          <Row>
            <Text strong>{`Адрес:\u00A0`}</Text>
            <Text>{orderData.address}</Text>
          </Row>

          <Row>
            <Text strong>{`Хозяин квартиры:\u00A0`}</Text>
            <Text> {orderData.User.userName}</Text>
          </Row>
          <Row>
            <Text strong>{`Контактный номер:\u00A0`}</Text>
            <Text> {orderData.User.phoneNumber}</Text>
          </Row>
          <Row>
            <Text strong>{`Комментарий к заказу:\u00A0`}</Text>
            <Text> {orderData.info}</Text>
          </Row>
          <Row>
            <Text strong>{`Вы заработаете:\u00A0`}</Text>
            <Text> {Math.floor(orderData.price * 0.7)} UZS</Text>
          </Row>
        </Col>
        <Col span={10}>
          <Row>
            <Text strong style={{ padding: 0, margin: 0 }}>
              {`Услуги:\u00A0`}
            </Text>
          </Row>
          <div style={{ marginLeft: 20 }}>
            {orderData.OrderServices.map((OS) => (
              <Row key={`os${OS.id}`}>
                <Text strong>{`${OS.Service.title}:\u00A0`}</Text>
                <Text>{`${OS.amount}`}</Text>
              </Row>
            ))}
          </div>
        </Col>

        <Col span={6}>
          <Button
            onClick={() => acceptOrder(orderData.id)}
            type="primary"
            size="large"
            style={{ marginTop: 30 }}
          >
            Откликнуться
            <SmileOutlined />
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default CleanerOrderAvailableCard;
