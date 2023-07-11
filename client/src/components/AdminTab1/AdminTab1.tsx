import React from 'react';

import moment from 'moment';
// moment(el.createdAt).format('YYYY-MM-DD HH:mm:ss')

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
    cleaner: 'Masha',
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
          style={{
            marginLeft: '300px',
            textAlign: 'start',
            marginRight: '300px',
            marginBottom: '10px',
          }}
        >
          <Row gutter={16}>
            <Col span={5}>
              <p>{`Заказчик: ${order.user}`}</p>
              <p>{moment(order.ordertime).format(' HH:mm:ss')}</p>
              <p>{moment(order.ordertime).format('DD.MM.YYYY')}</p>
              {/* <Card title={`Заказчик: ${order.user}`} bordered={false}>
                {moment(order.ordertime).format(' HH:mm:ss    DD.MM.YYYY')}
              </Card> */}
            </Col>
            <Col span={13}>
              <p>{`Адрес: ${order.address}`}</p>
              <p>Доп.услуги:</p>
              {/* <Card title={order.address} bordered={false}>
                Доп.услуги:
              </Card> */}
            </Col>

            <Col
              span={4}
              style={{
                textAlign: 'center',
              }}
            >
              {order.cleaner ? (
                <>
                  <p>{`Клинер: ${order.cleaner}`}</p>
                  <Button size="small">Изменить</Button>
                </>
              ) : (
                <>
                  <p>Клинер не выбран</p>
                  <Button size="small">Назначить</Button>
                </>
              )}
              <Button
                danger
                style={{
                  margin: '5px',
                }}
                size="small"
              >
                Удалить
              </Button>
            </Col>
          </Row>
        </Card>
      ))}
    </>
  );
};

export default AdminTab1;

{
  /* <Space style={{ paddingLeft: '200px', textAlign: 'start' }}>
            <Descriptions
              title={moment(order.ordertime).format(' HH:mm:ss    DD.MM.YYYY')}
              size="small"
            >
              <Descriptions.Item label="User">{order.user}</Descriptions.Item>
              <Descriptions.Item label="Cleaner">
                {order.cleaner}
              </Descriptions.Item>

              <Descriptions.Item label="Remark">
                <Button type="text">Text Button</Button>
              </Descriptions.Item>

              <Descriptions.Item label="Address">
                {order.address}
              </Descriptions.Item>
            </Descriptions>
          </Space>
          <Divider /> */
}
