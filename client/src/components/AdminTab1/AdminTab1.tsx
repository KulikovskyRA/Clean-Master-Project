import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';

import moment from 'moment';

import { Button, Card, Col, Row, Modal, Select } from 'antd';

const { Option } = Select;

const AdminTab1 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [orders, setOrders] = useState([]);
  const [cleaners, setCleaners] = useState([]);

  useEffect(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      (async function (): Promise<void> {
        const response: Response = await fetch(
          import.meta.env.VITE_URL + 'order',
          {
            credentials: 'include',
          }
        );

        if (response.ok) {
          const result = await response.json();
          // console.log(result);
          setOrders(result);
        }

        const resCleanerList: Response = await fetch(
          import.meta.env.VITE_URL + 'cleaner',
          {
            credentials: 'include',
          }
        );

        if (resCleanerList.ok) {
          const resultCL = await resCleanerList.json();
          // console.log(resultCL);
          setCleaners(resultCL);
        }
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const deleteOrder = async (orderId) => {
    // console.log(orderId);
    const res: Response = await fetch(
      import.meta.env.VITE_URL + `order/${orderId}`,
      {
        method: 'DELETE',
        credentials: 'include',
      }
    );

    if (res.ok) {
      setOrders((prev) => prev.filter((el) => el.id !== orderId));
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderEditId, setOrderEditId] = useState(0);
  const [cleanerId, setCleanerId] = useState(0);

  const showModal = (orderId) => {
    setIsModalOpen(true);
    setOrderEditId(orderId);
  };

  const handleOk = async () => {
    const res: Response = await fetch(import.meta.env.VITE_URL + `order`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ orderEditId, cleanerId }),
    });

    if (res.ok) {
      const result = await res.json();

      setOrders((prev) => {
        const newOrders = prev.map((ord) => {
          if (ord.id === orderEditId) {
            return { ...ord, Cleaner: { name: result } };
          }
          return ord;
        });
        return newOrders;
      });
    }

    setIsModalOpen(false);
    setOrderEditId(0);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setOrderEditId(0);
  };

  const handleCleanerId = (value) => {
    setCleanerId(Number(value));
  };

  return (
    <>
      <Modal
        title="Выберите клинера"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Select
          style={{ width: 450 }}
          placeholder="Select a option and change input text above"
          onChange={handleCleanerId}
          allowClear
        >
          {cleaners.map((cleaner) => (
            <Option key={`cleaner${cleaner.id}`} value={cleaner.id}>
              {`${cleaner.name}/${cleaner.nation}/Животные? - `}
              {cleaner.pets ? 'Да' : 'Нет'}
            </Option>
          ))}
        </Select>
      </Modal>

      {orders.map((order) => (
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
              <p>{`Заказчик: ${order.User.userName}`}</p>
              <p>{moment(order.cleaningTime).format('HH:mm:ss')}</p>
              <p>{moment(order.cleaningTime).format('DD.MM.YYYY')}</p>
            </Col>

            <Col span={order.Cleaner ? 11 : 15}>
              <p>{`Адрес: ${order.address}`}</p>
              <p>Услуги:</p>
              {order.OrderServices.map((OS) => (
                <p key={`os${OS.id}`}>{`${OS.Service.title}: ${OS.amount}`}</p>
              ))}
            </Col>

            {order.done ? (
              <Col span={4}>
                <p>Заказ выполнен!</p>
                <p>{`Рейтинг: ${order.rating}`}</p>
              </Col>
            ) : null}

            <Col
              style={{
                textAlign: 'center',
              }}
            >
              {order.Cleaner ? (
                <>
                  <p>{`Клинер: ${order.Cleaner.name}`}</p>
                  <Button type="dashed" onClick={() => showModal(order.id)}>
                    Изменить
                  </Button>
                </>
              ) : (
                <>
                  <p>Клинер не выбран</p>
                  <Button onClick={() => showModal(order.id)}>Назначить</Button>
                </>
              )}
              <Row justify="center">
                <Button
                  onClick={() => deleteOrder(order.id)}
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
