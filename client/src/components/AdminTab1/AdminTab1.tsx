import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';

import moment from 'moment';

import { Button, Card, Col, Row } from 'antd';

const AdminTab1 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [orders, setOrders] = useState([]);

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

  return (
    <>
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
              <p>Доп.услуги:</p>
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
