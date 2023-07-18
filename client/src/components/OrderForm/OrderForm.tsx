import * as React from 'react';
import { useState } from "react";
import { futureDates, futureTimes } from './orderdates.js';
import { Button, Checkbox, Form, Input } from 'antd';


console.log(futureDates);
const OrderForm = () => {
  // const [ roomsCount, setRoomsCount ] = useState(1);
  // const [ bathCount, setBathCount ] = useState(1);

  const [ formData, setFormData ] = useState({
    rooms: 1,
    baths: 1,
    date: 0,
    time: '8:00'
    // Add more form fields here
  });

  const handleIncrement = (fieldName) => {
    switch (fieldName) {
      case 'roomsCount':
        setFormData((prev) => ({ ...prev, rooms: prev.rooms + 1 }));
        // setRoomsCount(roomsCount + 1);
        break;
      case 'bathCount':
        setFormData((prev) => ({ ...prev, baths: prev.baths + 1 }));
        //setBathCount(bathCount + 1);
        break;
      default:
        break;
    }
  };

  const handleDecrement = (fieldName) => {
    switch (fieldName) {
      case 'roomsCount':
        setFormData((prev) => ({ ...prev, rooms: prev.rooms - 1 }));
        if (formData.rooms <= 1) {
          setFormData((prev) => ({ ...prev, rooms: 1 }));
        }
        break;
      case 'bathCount':
        setFormData((prev) => ({ ...prev, baths: prev.baths - 1 }));
        if (formData.baths <= 1) {
          setFormData((prev) => ({ ...prev, baths: 1 }));
        }
        break;
      default:
        break;
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form values:', formData);
  };
  return (

    <form onSubmit={handleSubmit}>
      <label>Количество комнат</label>
      <div onClick={() => handleDecrement('roomsCount')}>-</div>
      <input name="rooms" type="text" value={formData.rooms} onChange={handleChange}/>
      <div onClick={() => handleIncrement('roomsCount')}>+</div>

      <label>Количество санузлов</label>
      <div onClick={() => handleDecrement('bathCount')}>-</div>
      <input name="baths" type="text" value={formData.baths} onChange={handleChange}/>
      <div onClick={() => handleIncrement('bathCount')}>+</div>

      <label>Когда к вам приехать?</label>
      <select name="date" onChange={handleChange}>
        {futureDates.map((el) => {
          return (<option>{el.toLocaleString("ru", {
            day: "numeric",
            month: "long",
            weekday: "long",
          })}</option>);
        })}
      </select>
      <select name="time" onChange={handleChange}>
        {futureTimes.map(el => <option value={el}>{el}</option>)}
      </select>

      <button type="submit">Отправить</button>
    </form>

  );
};

export default OrderForm;
