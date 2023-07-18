import { useState, useEffect } from 'react';

import moment from 'moment';

import { Button, Card, Col, Row, Modal, Select, Typography, Input } from 'antd';
const { Title, Text } = Typography;

const { Option } = Select;

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const AdminTab1 = () => {
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
          setCleaners(resultCL);
        }
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const deleteOrder = async (orderId) => {
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

  const [price, setPrice] = useState('');
  const [isModalPriceOpen, setIsModalPriceOpen] = useState(false);

  const showPriceModal = (orderId) => {
    setIsModalPriceOpen(true);
    setOrderEditId(orderId);
    setPrice('');
  };
  const handlePriceCancel = () => {
    setIsModalPriceOpen(false);
    setOrderEditId(0);
  };
  const handleChangePrice = (e: ChangeEvent<HTMLInputElement>): void => {
    setPrice(e.target.value);
    // console.log(price);
  };

  const handlePriceOk = async () => {
    const res: Response = await fetch(import.meta.env.VITE_URL + `order`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        orderEditId,
        price,
      }),
    });

    if (res.ok) {
      setOrders((prev) => {
        const newOrders = prev.map((ord) => {
          if (ord.id === orderEditId) {
            return { ...ord, price };
          }
          return ord;
        });
        return newOrders;
      });
    }

    setIsModalPriceOpen(false);
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

            <Col span={12}>
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
            ) : (
              <Col span={4}>{/* <p>Заказ выполняется.</p> */}</Col>
            )}

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
          <Row gutter={16}>
            <Text>{`Цена: ${order.price}`}</Text>
            <EditOutlined onClick={() => showPriceModal(order.id)} />
          </Row>
        </Card>
      ))}

      {/* Модалка изменения цены */}
      <Modal
        title="Установите цену:"
        open={isModalPriceOpen}
        onOk={handlePriceOk}
        onCancel={handlePriceCancel}
      >
        <Input onChange={handleChangePrice} value={price} />
      </Modal>

      {/* Модалка выбора клинера */}
      <Modal
        title="Выберите клинера:"
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
    </>
  );
};

export default AdminTab1;
