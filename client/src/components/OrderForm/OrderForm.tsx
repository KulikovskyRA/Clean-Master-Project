import * as React from 'react';
import { useEffect, useState } from 'react';
import { futureDates, futureTimes } from './orderdates.js';
import {
  Button,
  Checkbox,
  Form,
  Input,
  Typography,
  ConfigProvider,
  Select,
  Row,
  Col,
} from 'antd';
const { Text, Title } = Typography;
const { Option } = Select;
import { Routes, Route, useNavigate } from 'react-router-dom';

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
    date: 0,
    time: '8:00',
  });

  useEffect(() => {
    const getAllServices = async () => {
      try {
        const response = await fetch(`${VITE_URL}service/all`);
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

    setTotal((prev) => prev + el.id * prices[el.id]);
  };

  const handleDecrement = (el) => {
    setFormServices((prev) => ({
      ...prev,
      [el.id]: Number(prev[el.id]) - 1,
    }));
    console.log(formServices);
    setTotal((prev) => prev - el.id * prices[el.id]);
  };

  //! Дата и время
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
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
      <div style={{ width: 450 }}>
        {step === 0 && (
          <>
            {services
              .filter((el) => el.default === true)
              .map((el) => (
                <div key={`default${el.id}`}>
                  <Text>{el.title}</Text>
                  <Row style={{ marginBottom: 10, marginTop: 3 }}>
                    <Button.Group>
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

            <Text>Когда к вам приехать?</Text>
            <Row style={{ marginBottom: 10, marginTop: 3 }}>
              <select name="date" onChange={handleChange}>
                {futureDates.map((el, i) => {
                  return (
                    <option key={i} value={el}>
                      {el.toLocaleString('ru', {
                        day: 'numeric',
                        month: 'long',
                        weekday: 'long',
                      })}
                    </option>
                  );
                })}
              </select>
              <select name="time" onChange={handleChange}>
                {futureTimes.map((el, i) => (
                  <option value={el} key={i}>
                    {el}
                  </option>
                ))}
              </select>
            </Row>
            <Button.Group>
              <Button disabled>НАЗАД</Button>
              <Button onClick={handleNextStep}>ДАЛЕЕ</Button>
            </Button.Group>
          </>
        )}

        {step === 1 && (
          <>
            {services
              .filter((el) => el.default === false && el.single === false)
              .map((el) => (
                <div key={`not-single${el.id}`}>
                  <Text>{el.title}</Text>
                  <Row style={{ marginBottom: 10, marginTop: 3 }}>
                    <Button.Group>
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

            {services
              .filter((el) => el.single === true)
              .map((el) => (
                <div key={`ingle${el.id}`}>
                  {formServices[el.id] ? (
                    <Checkbox.Group>
                      <Checkbox
                        checked
                        style={{ lineHeight: '32px' }}
                        onChange={() => handleChangeCheckBox(el)}
                      >
                        {el.title}
                      </Checkbox>
                    </Checkbox.Group>
                  ) : (
                    <Checkbox.Group>
                      <Checkbox
                        style={{ lineHeight: '32px' }}
                        onChange={() => handleChangeCheckBox(el)}
                      >
                        {el.title}
                      </Checkbox>
                    </Checkbox.Group>
                  )}
                </div>
              ))}

            <Input
              style={{ marginBottom: 10, marginTop: 3 }}
              onChange={handleChange}
              type="text"
              name="info"
              placeholder="Добавьте комментарий"
              value={formData.info}
            />
            <Button.Group>
              <Button onClick={handlePrevStep}>НАЗАД</Button>
              <Button onClick={handleNextStep}>ДАЛЕЕ</Button>
            </Button.Group>
          </>
        )}
        {step === 2 && (
          <>
            {user.id === 0 && (
              <>
                <Input
                  style={{ marginBottom: 10, marginTop: 10 }}
                  onChange={handleChange}
                  type="text"
                  name="phoneNumber"
                  placeholder="Введите номер телефона"
                  value={formData.phoneNumber}
                />
                <Input
                  style={{ marginBottom: 15, marginTop: 3 }}
                  onChange={handleChange}
                  type="email"
                  name="email"
                  placeholder="Введите email"
                  value={formData.email}
                />
              </>
            )}
            <Input
              style={{ marginBottom: 5, marginTop: 10 }}
              onChange={handleChange}
              type="text"
              name="city"
              value={formData.city}
              placeholder="Введите город"
            />
            <Input
              style={{ marginBottom: 5, marginTop: 3 }}
              onChange={handleChange}
              type="text"
              name="street"
              value={formData.street}
              placeholder="Введите улицу и дом"
            />
            <Input
              style={{ marginBottom: 10, marginTop: 3 }}
              onChange={handleChange}
              type="text"
              name="flat"
              value={formData.flat}
              placeholder="Введите номер квартиры"
            />
            <Button.Group>
              <Button onClick={handlePrevStep}>НАЗАД</Button>
              <Button onClick={handleSubmit}>Оформить заказ</Button>
            </Button.Group>
          </>
        )}
        <Title>{total}</Title>
      </div>
    </ConfigProvider>
  );
};

export default OrderForm;
