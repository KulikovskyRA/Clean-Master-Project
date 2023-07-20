import * as React from 'react';
import { useEffect, useState } from 'react';
import { futureDates, futureTimes } from './orderdates.js';
import {
  Button,
  Checkbox,
  Input,
  Typography,
  ConfigProvider,
  Select,
  Row,
  Col,
  Divider,
} from 'antd';

import styles from './OrderFormStyles.module.css';

const { Text, Title } = Typography;
import { useNavigate } from 'react-router-dom';

import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

const { VITE_URL } = import.meta.env;

import { useSelector } from 'react-redux';

const OrderForm = () => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.authSlice.user);

  const [formServices, setFormServices] = useState({});

  const [services, setServices] = useState([]);

  const [prices, setPrices] = useState({});

  const [step, setStep] = useState(0);

  const [total, setTotal] = useState(0);

  const [formData, setFormData] = useState({
    date: futureDates[0],
    time: futureTimes[0],
  });

  useEffect(() => {
    const getAllServices = async () => {
      try {
        const response = await fetch(`${VITE_URL}service/all`);
        console.log('------->', response);
        const jsonData = await response.json();
        setServices(jsonData);

        const initialServices = {};
        const initialPrices = {};
        jsonData.forEach((el) => {
          initialServices[el.id] = 0;
          initialPrices[el.id] = el.singlePrice;
        });
        setPrices(initialPrices);
        setFormServices(initialServices);

        console.log(prices);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getAllServices();
  }, []);

  const handleIncrement = (el) => {
    setFormServices((prev) => ({
      ...prev,
      [el.id]: Number(prev[el.id]) + 1,
    }));
    console.log(formServices);
    console.log(total);
    console.log(el.id);

    setTotal((prev) => prev + prices[el.id]);
  };

  const handleDecrement = (el) => {
    setFormServices((prev) => ({
      ...prev,
      [el.id]: Number(prev[el.id]) - 1,
    }));
    console.log(formServices);
    console.log(prices);
    setTotal((prev) => prev - prices[el.id]);
    console.log(total);
    console.log(el.id);
  };

  //! Дата и время
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // console.log(formData);
  };

  const handleChangeCheckBox = (el) => {
    let count;
    if (formServices[el.id] === 0) {
      count = 1;
    } else {
      count = -1;
    }
    setFormServices((prev) => ({
      ...prev,
      [el.id]: Number(prev[el.id]) + count,
    }));

    setTotal((prev) => prev + count * prices[el.id]);

    console.log(formServices);
  };

  const handleNextStep = () => {
    if (step < 2) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e) => {
    const responseAddOrder = await fetch(
      import.meta.env.VITE_URL + 'order/addorder',
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ formData, formServices }),
      }
    );

    if (responseAddOrder.ok) {
      navigate('/client');
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: 'black',
          fontSize: 18,
          colorTextBase: 'black',
        },
      }}
    >
      <Row justify="center">
        <Text style={{ fontSize: '40px', fontWeight: 'bold' }}>
          ФОРМА ЗАКАЗА
        </Text>
      </Row>
      <div className={styles.orderFormDiv}>
        <Col style={{ width: 550 }}>
          {step === 0 && (
            <>
              {services
                .filter((el) => el.default === true)
                .map((el) => (
                  <div key={`default${el.id}`}>
                    <Row justify="center">
                      <Text>{el.title}</Text>
                    </Row>
                    <Row
                      justify="center"
                      style={{ marginBottom: 20, marginTop: 10 }}
                    >
                      <Button.Group size="large">
                        {formServices[el.id] > 0 ? (
                          <Button onClick={() => handleDecrement(el)}>
                            <MinusOutlined />
                          </Button>
                        ) : (
                          <Button disabled>
                            <MinusOutlined />
                          </Button>
                        )}
                        <Button>{formServices[el.id]}</Button>
                        <Button onClick={() => handleIncrement(el)}>
                          <PlusOutlined />
                        </Button>
                      </Button.Group>
                    </Row>
                  </div>
                ))}

              <Row justify="center">
                <Text>Выберите дату и время начала уборки:</Text>
              </Row>
              <Row justify="center" style={{ marginBottom: 35, marginTop: 10 }}>
                <select
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  style={{ fontSize: '20px' }}
                >
                  {futureDates.map((el, i) => (
                    <option key={i} value={el}>
                      {el.toLocaleString('ru', {
                        day: 'numeric',
                        month: 'long',
                        weekday: 'long',
                      })}
                    </option>
                  ))}
                </select>

                <select
                  value={formData.time}
                  name="time"
                  onChange={handleChange}
                  style={{ fontSize: '20px' }}
                >
                  {futureTimes.map((el, i) => (
                    <option value={el} key={i}>
                      {el}
                    </option>
                  ))}
                </select>
              </Row>
              <Row justify="center">
                <Button.Group size="large">
                  <Button disabled>НАЗАД</Button>
                  <Button type="primary" onClick={handleNextStep}>
                    ДАЛЕЕ
                  </Button>
                </Button.Group>
              </Row>
            </>
          )}

          {step === 1 && (
            <>
              {services
                .filter((el) => el.default === false && el.single === false)
                .map((el) => (
                  <div key={`not-single${el.id}`}>
                    <Row justify="center">
                      <Text
                        style={{
                          fontSize: '20px',
                          fontWeight: 'bold',
                          marginBottom: 35,
                        }}
                      >
                        ВЫБЕРИТЕ ДОПОЛНИТЕЛЬНЫЕ УСЛУГИ
                      </Text>
                    </Row>
                    <Row justify="start">
                      <Text style={{ marginLeft: 25 }}>{el.title}</Text>
                      <Button.Group
                        size="small"
                        style={{
                          marginLeft: 20,
                        }}
                      >
                        {formServices[el.id] > 0 ? (
                          <Button onClick={() => handleDecrement(el)}>-</Button>
                        ) : (
                          <Button disabled>-</Button>
                        )}
                        <Button>{formServices[el.id]}</Button>

                        <Button onClick={() => handleIncrement(el)}>+</Button>
                      </Button.Group>
                    </Row>
                  </div>
                ))}

              {services
                .filter((el) => el.single === true)
                .map((el) => (
                  <div key={`ingle${el.id}`}>
                    {formServices[el.id] ? (
                      <Row justify="start">
                        <Checkbox.Group>
                          <Checkbox
                            checked
                            style={{ lineHeight: '32px' }}
                            onChange={() => handleChangeCheckBox(el)}
                          >
                            {el.title}
                          </Checkbox>
                        </Checkbox.Group>
                      </Row>
                    ) : (
                      <Row justify="start">
                        <Checkbox.Group>
                          <Checkbox
                            style={{ lineHeight: '32px' }}
                            onChange={() => handleChangeCheckBox(el)}
                          >
                            {el.title}
                          </Checkbox>
                        </Checkbox.Group>
                      </Row>
                    )}
                  </div>
                ))}
              <Row justify="center">
                <Input.TextArea
                  rows={3}
                  style={{ marginBottom: 49, marginTop: 40, width: '100%' }}
                  onChange={handleChange}
                  type="text"
                  name="info"
                  placeholder="Комментарий (например, номер подъезда или на что обратить внимание во время уборки)"
                  value={formData.info}
                />
              </Row>
              <Row justify="center">
                <Button.Group size="large">
                  <Button onClick={handlePrevStep}>НАЗАД</Button>
                  <Button type="primary" onClick={handleNextStep}>
                    ДАЛЕЕ
                  </Button>
                </Button.Group>
              </Row>
            </>
          )}
          {step === 2 && (
            <>
              {user.id === 0 && (
                <>
                  <Row justify="center">
                    <Input
                      onChange={handleChange}
                      type="text"
                      name="phoneNumber"
                      placeholder="Введите номер телефона"
                      value={formData.phoneNumber}
                    />
                  </Row>
                  <Row justify="center">
                    <Input
                      style={{ marginBottom: 15, marginTop: 3 }}
                      onChange={handleChange}
                      type="email"
                      name="email"
                      placeholder="Введите email"
                      value={formData.email}
                    />
                  </Row>
                  <Divider style={{ marginTop: 0, marginBottom: 2 }} />
                </>
              )}
              <Row justify="center">
                <Text>По какому адресу выполнить уборку:</Text>
              </Row>

              <Row justify="center">
                <Input
                  style={{ marginBottom: 5, marginTop: 10 }}
                  onChange={handleChange}
                  type="text"
                  name="city"
                  value={formData.city}
                  placeholder="Ваш город"
                />
              </Row>
              <Row justify="center">
                <Input
                  style={{ marginBottom: 5, marginTop: 3 }}
                  onChange={handleChange}
                  type="text"
                  name="street"
                  value={formData.street}
                  placeholder="Введите улицу и номер дома"
                />
              </Row>
              <Row justify="center">
                <Input
                  style={{ marginBottom: 20, marginTop: 3 }}
                  onChange={handleChange}
                  type="text"
                  name="flat"
                  value={formData.flat}
                  placeholder="Введите номер квартиры"
                />
              </Row>
              <Row justify="center" style={{ marginBottom: 20, marginTop: 50 }}>
                <Button.Group size="large">
                  <Button onClick={handlePrevStep}>НАЗАД</Button>
                  <Button type="primary" onClick={handleSubmit}>
                    ОФОРМИТЬ ЗАКАЗ
                  </Button>
                </Button.Group>
              </Row>
            </>
          )}
          <Title
            level={5}
            style={{ textAlign: 'center' }}
          >{`СТОИМОСТЬ УБОРКИ: ${total} UZS`}</Title>
        </Col>
      </div>
    </ConfigProvider>
  );
};

export default OrderForm;
