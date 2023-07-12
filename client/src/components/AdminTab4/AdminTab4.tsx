import React from 'react';

import { Button, Space, Descriptions, Card, Col, Row } from 'antd';

const dbClients = [
  {
    id: 1,
    email: 'client@gmail.com',
    username: 'Lera',
    phoneNumber: '89998887776',
  },
];

const AdminTab4 = () => {
  return (
    <>
      {dbClients.map((client) => (
        <Card
          key={`client${client.id}`}
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
              <p>{`Имя: ${client.usernameclient} `}</p>
            </Col>

            <Col span={3}>
              <p>{`${client.phoneNumber}`}</p>
            </Col>

            <Col span={4}>
              <p>{`E-mail: ${client.email}`}</p>
            </Col>

            <Col span={5}>
              <p>Количество заказов:(берется из orders)</p>
            </Col>
            <Col>
              <p>Дата последнего заказа</p>
            </Col>
          </Row>
        </Card>
      ))}
    </>
  );
};

export default AdminTab4;
