import React from 'react';

import { Divider, Radio, Typography, Tabs, Card } from 'antd';
const { Title } = Typography;

const AdminTab2 = () => {
  return (
    <Card
      style={{
        marginLeft: '30%',
        textAlign: 'start',
        marginRight: '30%',
      }}
    >
      <Title level={5}>Общее количество заказов:</Title>
      <Title level={5}>Количество выполненных заказов:</Title>
      <Title level={5}>Отменённые заказы:</Title>
      <Title level={5}>Количество выполненных заказов:</Title>
      <Title level={5}>Оборот:</Title>
      <Title level={5}>Выплаты клинерам:</Title>
      <Title level={3}>Чистая прибыль:</Title>
    </Card>
  );
};

export default AdminTab2;
