import * as React from 'react';
import { useEffect, useState } from 'react';
import { futureDates, futureTimes } from './orderdates.js';
import { Button, Checkbox, Form, Input } from 'antd';
import { Routes, Route, useNavigate } from 'react-router-dom';

const { VITE_URL } = import.meta.env;

import { useSelector } from 'react-redux';

// console.log(futureDates);
const OrderForm = () => {
  const navigate = useNavigate();

  // const user = useSelector((state) => state.authSlice.user);

  const [step, setStep] = useState(0);
  const [services, setServices] = useState([]);
  const [formServices, setFormServices] = useState({});
  const [formData, setFormData] = useState({
    date: 0,
    time: '8:00',
  });

  useEffect(() => {
    const getAllServices = async () => {
      try {
        const response = await fetch(`${VITE_URL}service/all`);
        const jsonData = await response.json();
        // console.log(jsonData);
        setServices(jsonData);

        const initialServices = {};
        jsonData.forEach((el) => {
          initialServices[el.id] = 0;
        });

        setFormServices(initialServices);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getAllServices();
  }, []);

  const handleIncrement = (e) => {
    setFormServices((prev) => ({
      ...prev,
      [e.target.id]: Number(prev[e.target.id]) + 1,
    }));
    console.log(formServices);
  };

  const handleDecrement = (e) => {
    setFormServices((prev) => ({
      ...prev,
      [e.target.id]: Number(prev[e.target.id]) - 1,
    }));
    console.log(formServices);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleChangeInput = (e) => {
    setFormServices({ ...formServices, [e.target.name]: e.target.value });
    console.log(formServices);
  };

  const handleChangeCheckBox = (e) => {
    let count;
    if (formServices[e.target.name] === 0) {
      count = 1;
    } else {
      count = -1;
    }
    setFormServices((prev) => ({
      ...prev,
      [e.target.name]: Number(prev[e.target.name]) + count,
    }));
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
    e.preventDefault();
    // console.log('Form values:', formData, formServices);

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
      // navigate('/login')
      console.log('wfw');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {step === 0 && (
        <>
          {services
            .filter((el) => el.default === true)
            .map((el) => (
              <div key={`default${el.id}`}>
                <label>{el.title}</label>
                {formServices[el.id] > 0 && (
                  <div id={el.id} onClick={handleDecrement}>
                    -
                  </div>
                )}
                <input
                  name={el.id}
                  type="text"
                  value={formServices[el.id]}
                  onChange={handleChangeInput}
                />
                <div id={el.id} onClick={handleIncrement}>
                  +
                </div>
              </div>
            ))}

          <label>Когда к вам приехать?</label>
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
        </>
      )}

      {step === 1 && (
        <>
          {services
            .filter((el) => el.default === false && el.single === false)
            .map((el) => (
              <div key={`not-single${el.id}`}>
                <label>{el.title}</label>
                {formServices[el.id] > 0 && (
                  <div id={el.id} onClick={handleDecrement}>
                    -
                  </div>
                )}
                <input
                  name={el.id}
                  type="text"
                  value={formServices[el.id]}
                  onChange={handleChangeInput}
                />
                <div id={el.id} onClick={handleIncrement}>
                  +
                </div>
              </div>
            ))}

          {services
            .filter((el) => el.single === true)
            .map((el) => (
              <div key={`ingle${el.id}`}>
                <label>{el.title}</label>
                <input
                  name={el.id}
                  type="checkbox"
                  onChange={handleChangeCheckBox}
                />
              </div>
            ))}

          <input
            onChange={handleChange}
            type="text"
            name="info"
            placeholder="Добавьте комментарий"
          />
        </>
      )}
      {step === 2 && (
        <>
          {user.id === 0 && (
            <>
              <input
                onChange={handleChange}
                type="text"
                name="phoneNumber"
                placeholder="Введите номер телефона"
              />
              <input
                onChange={handleChange}
                type="email"
                name="email"
                placeholder="Введите email"
              />
            </>
          )}
          <input
            onChange={handleChange}
            type="text"
            name="city"
            placeholder="Введите город"
          />
          <input
            onChange={handleChange}
            type="text"
            name="street"
            placeholder="Введите улицу и дом"
          />
          <input
            onChange={handleChange}
            type="text"
            name="flat"
            placeholder="Введите номер квартиры"
          />
          <button type="submit">Отправить</button>
        </>
      )}
      <div onClick={handlePrevStep}>НАЗАД</div>
      <div onClick={handleNextStep}>ДАЛЕЕ</div>
    </form>
  );
};

export default OrderForm;
