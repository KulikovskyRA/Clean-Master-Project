import React from 'react';

import {
  Divider,
  Radio,
  Typography,
  Tabs,
  Button,
  Space,
  Descriptions,
  Card,
  Col,
  Row,
} from 'antd';
const { Title, Text } = Typography;

import { EditOutlined } from '@ant-design/icons';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AdminTab2 = () => {
  const [data, setData] = useState({});

  const [defaults, setDefaults] = useState([]);
  const [extra, setExtra] = useState([]);

  useEffect(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      (async function (): Promise<void> {
        const response: Response = await fetch(
          import.meta.env.VITE_URL + 'order/tab2',
          {
            credentials: 'include',
          }
        );
        if (response.ok) {
          const result = await response.json();
          setData(result);
        }

        const res: Response = await fetch(
          import.meta.env.VITE_URL + 'service/all',
          {
            credentials: 'include',
          }
        );
        if (res.ok) {
          const allServices = await res.json();
          const defaults = allServices.filter((el) => el.default);
          const extra = allServices.filter((el) => !el.default);
          setDefaults(defaults);
          setExtra(extra);
        }
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Row
      align="middle"
      justify="space-evenly"
      style={{
        marginLeft: '25%',
        textAlign: 'start',
        marginRight: '25%',
      }}
    >
      <Card>
        <Title level={5}>{`Общее количество заказов: ${data.allNumber}`}</Title>
        <Title
          level={5}
        >{`Количество выполненных заказов: ${data.doneNumber}`}</Title>
        <Title level={5}>{`Оборот: ${data.oborot}`}</Title>
        <Title level={5}>{`Выплаты клинерам: ${data.cleanerSalary}`}</Title>
        <Title level={4}>{`Чистая прибыль: ${data.money}`}</Title>
      </Card>
      <Card>
        <Title level={2}>Услуги:</Title>
        <Title level={4}>Базовые:</Title>

        {defaults.map((def) => (
          <Row>
            <Text>{`${def.title}: ${def.singlePrice} UZS     `}</Text>
            <EditOutlined />;
          </Row>
        ))}
      </Card>
    </Row>
  );
};

export default AdminTab2;
