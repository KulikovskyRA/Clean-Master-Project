import { useState, useEffect } from 'react';

import moment from 'moment';

import { Button, Card, Col, Row, Modal, Select, Typography, Input } from 'antd';
const { Text } = Typography;

const { Option } = Select;

import { EditOutlined } from '@ant-design/icons';

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

      {orders
        .sort(function (x, y) {
          //! Сотрировка по выполненности
          return y.done === x.done ? 0 : y.done ? -1 : 1;
        })
        .map((order) => (
          <Card
            title={`Заказ №${order.id}: ${moment(order.cleaningTime).format(
              'HH:mm:ss DD.MM.YYYY'
            )}`}
            key={`order${order.id}`}
                     style={{
            marginLeft: '15%',
            textAlign: 'start',
            marginRight: '15%',
            marginBottom: '10px',
            border: '1px solid'
          }}
            headStyle={{ backgroundColor: '#EFEBEB' }}
          >
            <Row>
              <Col span={5}>

                <Row>
                  <Text strong>{`Заказчик:\u00A0`}</Text>
                  <Text>{`${order.User.userName}`}</Text>
                </Row>

                <Row>
                  <Row>
                    <Text strong>{`Цена:\u00A0`}</Text>
                    <Text>{`${order.price}`}</Text>
                  </Row>
                  <EditOutlined
                    style={{ marginLeft: '3px' }}
                    onClick={() => showPriceModal(order.id)}
                  />
                </Row>
              </Col>

              <Col span={9}>
                <Row>
                  <Text strong>{`Адрес:\u00A0`}</Text>
                  <Text>{`${order.address}`}</Text>
                </Row>
                <Text strong style={{ padding: 0, margin: 0 }}>
                  Услуги:
                </Text>
                <div style={{ marginLeft: 20 }}>
                  {order.OrderServices.map((OS) => (
                    <Row key={`os${OS.id}`}>
                      <Text strong>{`${OS.Service.title}:\u00A0`}</Text>
                      <Text>{`${OS.amount}`}</Text>
                    </Row>
                  ))}
                </div>
              </Col>

              {order.done ? (
                <Col span={4}>
                  <Text strong>{`Заказ выполнен!`}</Text>
                  <Row>
                    <Text strong>{`Рейтинг:\u00A0`}</Text>
                    <Text>{`${order.rating}`}</Text>
                  </Row>
                </Col>
              ) : (
                <Col span={4}>
                  <Text strong>{`Заказ ожидает выполнения`}</Text>
                </Col>
              )}

              <Col span={5}>
                {order.Cleaner ? (
                  <>
                    <Row>
                      <Text strong>{`Клинер:\u00A0`}</Text>
                      <Text>{`${order.Cleaner.name}`}</Text>
                    </Row>

                    {!order.done && (
                      <Button type="dashed" onClick={() => showModal(order.id)}>
                        Изменить
                      </Button>
                    )}
                  </>
                ) : (
                  <>
                    <Text strong>{`Клинер не назначен!`}</Text>
                    {!order.done && (
                      <Button onClick={() => showModal(order.id)}>
                        Назначить
                      </Button>
                    )}
                  </>
                )}

                {!order.done && (
                  <Button
                    onClick={() => deleteOrder(order.id)}
                    danger
                    style={{
                      margin: '5px',
                    }}
                  >
                    Удалить
                  </Button>
                )}
              </Col>
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
              {`${cleaner.name} | Работает с питомцами? - `}
              {cleaner.pets ? 'Да' : 'Нет'}
            </Option>
          ))}
        </Select>
      </Modal>
    </>
  );
};

export default AdminTab1;
