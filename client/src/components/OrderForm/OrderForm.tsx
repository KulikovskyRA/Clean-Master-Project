import * as React from 'react';
import { useEffect, useState } from "react";
import { futureDates, futureTimes } from './orderdates.js';
import { Button, Checkbox, Form, Input } from 'antd';

const { VITE_URL } = import.meta.env;


console.log(futureDates);
const OrderForm = () => {
  // const [ roomsCount, setRoomsCount ] = useState(1);
  // const [ bathCount, setBathCount ] = useState(1);
  const [ step, setStep ] = useState(0);
  const [ singleServices, setSingleServices ] = useState([]);
  const [ noSingleServices, setNoSingleServices ] = useState([]);

  const [ formData, setFormData ] = useState({
    rooms: 1,
    baths: 1,
    date: 0,
    time: '8:00',
    // Add more form fields here
  });

  useEffect(() => {
    const singleServicesData = async () => {
      try {
        const response = await fetch(`${VITE_URL}service/singleprice`);
        const jsonData = await response.json();
        setSingleServices(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const noSingleServicesData = async () => {
      try {
        const response = await fetch(`${VITE_URL}service/nosingleprice`);
        const jsonData = await response.json();
        setNoSingleServices(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    singleServicesData();
    noSingleServicesData();
  }, []);

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
      case 'services':
        setFormData((prev) => ({ ...prev, services: {} }));
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

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form values:', formData);
  };

  // const getSingleServices = async () => {
  //   const response = await fetch(`${VITE_URL}services/singlePrice`);
  //   const result = await response.json();
  //   console.log('SINGLE====>', result);
  //   return result;
  // };
  //
  //
  // console.log('SINGLE==+++++==>', getSingleServices);


  return (

    <form onSubmit={handleSubmit}>
      {(step === 0) && <>
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
          {futureDates.map((el, i) => {
            return (<option key={i} value={el}>{el.toLocaleString("ru", {
              day: "numeric",
              month: "long",
              weekday: "long",
            })}</option>);
          })}
        </select>
        <select name="time" onChange={handleChange}>
          {futureTimes.map((el, i) => <option value={el} key={i}>{el}</option>)}
        </select>
      </>}

      {(step === 1) &&
        <>
          {singleServices.map(el => {
            return (<label>
              <input
                type="checkbox"
                checked={true}
                // onChange={handleCheckboxChange}
              />
              {el.title}
            </label>);
          })}

          {noSingleServices.map(el => {
            return (
              <>
                <label>{el.title}</label>
                <div onClick={() => handleDecrement('services')}>-</div>
                <input name={el.id} type="text" value={formData.baths} onChange={handleChange}/>
                <div onClick={() => handleIncrement('services')}>+</div>
              </>);
          })}


        </>}
      <div onClick={handleNextStep}>ДАЛЕЕ</div>
      <button type="submit">Отправить</button>
    </form>

  );
};

export default OrderForm;
