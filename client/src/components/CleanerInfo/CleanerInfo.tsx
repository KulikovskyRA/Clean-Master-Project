import { Descriptions, Divider } from 'antd';
import React, { useEffect, useState } from 'react';

export default function CleanerInfo() {
  const [cleanerData, setCleanerData] = useState([]);
  const [ordersDone, setOrdersDone] = useState(0);
  const [ordersPlanned, setOrdersPlanned] = useState(0);
  const [salary, setSalary] = useState(0);

  const fetchCleanerData = async () => {
    try {
      const response = await fetch(`http://localhost:3500/api/cleaner/info`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const result = await response.json();
      // console.log('cleaner data ---------->', result);

      setCleanerData(result);

      const done = result.Orders.filter((el) => el.done === true);
      setOrdersDone(done.length);
      setOrdersPlanned(result.Orders.length - done.length);

      let salary = 0;
      done.forEach((el) => {
        salary += el.price;
      });

      setSalary(salary);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    void fetchCleanerData();
  }, []);

  return (
    <>
      <Divider orientation="center" orientationMargin="0">
        <h4>Карточка сотрудника</h4>
      </Divider>
      <Descriptions
        layout="vertical"
        bordered={true}
        style={{ width: '150vh' }}
        column={6}
        contentStyle={{ fontWeight: 'bold' }}
      >
        <Descriptions.Item label="Ф.И.О">
          {cleanerData.name} {cleanerData.patrname} {cleanerData.surname}
        </Descriptions.Item>
        <Descriptions.Item label="ID">{cleanerData.id}</Descriptions.Item>
        <Descriptions.Item label="Номер телефона">
          {cleanerData.phoneNumber}
        </Descriptions.Item>
        <Descriptions.Item label="Гражданство">
          {cleanerData.nation}
        </Descriptions.Item>
        <Descriptions.Item label="Выполнено уборок">
          {ordersDone}
        </Descriptions.Item>
        <Descriptions.Item label="Запланировано уборок">
          {ordersPlanned}
        </Descriptions.Item>
        <Descriptions.Item label="Доход за всё время">
          {salary} UZS
        </Descriptions.Item>
      </Descriptions>
    </>
  );
}
