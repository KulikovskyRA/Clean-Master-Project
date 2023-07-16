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
  Modal,
  Select,
  Input,
  InputNumber,
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [service, setService] = useState(0);
  const [inputValues, setInputValues] = useState({});

  const showModal = (service) => {
    setIsModalOpen(true);
    setService(service);
    setInputValues({});
  };

  const handleOk = async () => {
    const res: Response = await fetch(
      import.meta.env.VITE_URL + `service/${service.id}`,
      {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(inputValues),
      }
    );
    if (res.ok) {
      if (service.default) {
        setDefaults((prev) => {
          const newDefs = prev.map((d) => {
            if (d.id === service.id) {
              return { ...d, singlePrice: inputValues.price };
            }
            return d;
          });
          return newDefs;
        });
      }
    }
    setIsModalOpen(false);
    setService({});
    setInputValues({});
  };

  const handleChangePrice = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setService({});
    setInputValues({});
  };

  return (
    <>
      <Modal
        title="Изменение "
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          name="price"
          onChange={handleChangePrice}
          style={{ width: 250 }}
          placeholder="Введите цену"
          value={inputValues.price}
        />

        {!service.default && (
          <>
            <div>Место под изменение типа</div>
            {/* <Input
              name="price"
              onChange={handleChangePrice}
              style={{ width: 250 }}
              placeholder="Введите цену"
            /> */}
          </>
        )}
      </Modal>

      <Row
        align="middle"
        justify="space-evenly"
        style={{
          marginLeft: '15%',
          textAlign: 'start',
          marginRight: '15%',
        }}
      >
        <Card>
          <Title
            level={5}
          >{`Общее количество заказов: ${data.allNumber}`}</Title>
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
            <Row key={`def${def.id}`}>
              <Text>{`${def.title}: ${def.singlePrice} UZS     `}</Text>
              <EditOutlined onClick={() => showModal(def)} />;
            </Row>
          ))}

          <Title level={4}>Дополнительные:</Title>
          {extra.map((ex) => (
            <Row key={`ex${ex.id}`}>
              <Text>{`${ex.title}: ${ex.singlePrice} UZS     `}</Text>
              <EditOutlined onClick={() => showModal(ex)} />;
            </Row>
          ))}
        </Card>
      </Row>
    </>
  );
};

export default AdminTab2;
