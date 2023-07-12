import React from 'react';

import moment from 'moment';

const dbOrders = [
  {
    id: 1,
    address: 'xyz',
    ordertime: new Date('2023-07-08 10:51:49.612 +0300'),
    user: 'Anna',
    cleaner: 'Alexa',
    price: 228,
    rooms: 3,
    bathroooms: 2,
    done: false,
    score: 0,
  },
  {
    id: 2,
    address: 'wfdwefwf',
    ordertime: new Date('2023-05-02 10:51:49.612 +0300'),
    user: 'Biba',
    cleaner: null,
    price: 555,
    rooms: 1,
    bathroooms: 4,
    done: true,
    score: 3,
  },
  {
    id: 3,
    address: 'xfregergegz',
    ordertime: new Date('2023-01-08 10:51:49.612 +0300'),
    user: 'Pasha',
    cleaner: 'Хьюберт Блейн',
    price: 1055,
    rooms: 4,
    bathroooms: 1,
    done: true,
    score: 2.3,
  },
  {
    id: 4,
    address: '44',
    ordertime: new Date('2023-05-02 10:51:49.612 +0300'),
    user: 'Biba',
    cleaner: 'Boba',
    price: 555,
    rooms: 1,
    bathroooms: 4,
    done: true,
    score: 3,
  },
];

import { Button, Space, Descriptions, Card, Col, Row } from 'antd';

import { Divider } from 'antd';

const AdminTab1 = () => {
  return (
    <>
      {dbOrders.map((order) => (
        <Card
          key={`order${order.id}`}
          style={{
            marginLeft: '15%',
            textAlign: 'start',
            marginRight: '15%',
            marginBottom: '10px',
          }}
        >
          <Row gutter={16}>
            <Col span={5}>
              <p>{`Заказчик: ${order.user}`}</p>
              <p>{moment(order.ordertime).format('HH:mm:ss')}</p>
              <p>{moment(order.ordertime).format('DD.MM.YYYY')}</p>
            </Col>
            <Col span={15}>
              <p>{`Адрес: ${order.address}`}</p>
              <p>Доп.услуги:</p>
            </Col>

            <Col
              style={{
                textAlign: 'center',
              }}
            >
              {order.cleaner ? (
                <>
                  <p>{`Клинер: ${order.cleaner}`}</p>
                  <Button type="dashed">Изменить</Button>
                </>
              ) : (
                <>
                  <p>Клинер не выбран</p>
                  <Button>Назначить</Button>
                </>
              )}
              <Row justify="center">
                <Button
                  danger
                  style={{
                    margin: '5px',
                  }}
                >
                  Удалить
                </Button>
              </Row>
            </Col>
          </Row>
        </Card>
      ))}
    </>
  );
};

export default AdminTab1;
