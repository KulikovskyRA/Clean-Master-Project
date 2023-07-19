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
  //const [ singleServices, setSingleServices ] = useState([]);
  //const [ noSingleServices, setNoSingleServices ] = useState([]);
  const [ isChecked, setIsChecked ] = useState(false);
  const [ services, setServices ] = useState([]);
  const [ formServices, setFormServices ] = useState({});

  const [ formData, setFormData ] = useState({
    rooms: 1,
    baths: 1,
    date: 0,
    time: '8:00'
    // Add more form fields here
  });

  useEffect(() => {
    const getAllServices = async () => {
      try {
        const response = await fetch(`${VITE_URL}service/all`);
        const jsonData = await response.json();
        console.log(jsonData);
        setServices(jsonData);
        const initialServices = {};
        jsonData.forEach(el => {
          initialServices[el.id] = 0;
        });

        console.log(initialServices);
        setFormServices(initialServices);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // const singleServicesData = async () => {
    //   try {
    //     const response = await fetch(`${VITE_URL}service/singleprice`);
    //     const jsonData = await response.json();
    //     setSingleServices(jsonData);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // };
    //
    // const noSingleServicesData = async () => {
    //   try {
    //     const response = await fetch(`${VITE_URL}service/nosingleprice`);
    //     const jsonData = await response.json();
    //     setNoSingleServices(jsonData);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // };
    //
    // singleServicesData();
    // noSingleServicesData();
    getAllServices();
  }, []);

  // const handleIncrement = (e) => {
  //   setFormServices((prev) => {...prev, [e.target.id]: prev[e.target.id] + 1})
  //   }
  // };

  const handleIncrement = (e) => {
    setFormServices((prev) => ({ ...prev, [e.target.id]: prev[e.target.id] + 1 }));
    console.log(formServices);
  };


  const handleDecrement = (e) => {
    setFormServices((prev) => ({ ...prev, [e.target.id]: prev[e.target.id] - 1 }));
    console.log(formServices);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeInput = (e) => {
    setFormServices({ ...formServices, [e.target.name]: e.target.value });
    console.log(formServices);
  };

  const handleServicesChange = (e) => {
    setFormData({ ...formData, services: { [e.target.name]: e.target.value } });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, services: { [e.target.name]: e.target.checked } });
    setIsChecked(true);
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form values:', formData);

  };

  const handlePlus = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: (Number(prev[e.target.id]) + Number(e.target.value)) ?? 1
    }));
  };

  // const handlePlus = (e) => {
  //   setFormData((prev) => { ...prev, [e.target.id]: (prev[e.target.id]) + e.target.value });
  //   //setOrders((prev) => prev.filter((el) => el.id !== orderId));
  //   //setFormData({ ...formData, [e.target.id]: formData.name + e.target.value });
  // };

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

        {services.filter((el) => el.default === true)
          .map(el => (
            <>
              <label>{el.title}</label>
              {(formServices[el.id] > 0) && <div id={el.id} onClick={handleDecrement}>-</div>}
              <input name={el.id} type="text" value={formServices[el.id]} onChange={handleChangeInput}/>
              <div id={el.id} onClick={handleIncrement}>+</div>
            </>
          ))
        }

        {/*<label>Количество комнат</label>*/}
        {/*<div onClick={() => handleDecrement('roomsCount')}>-</div>*/}
        {/*<input name="rooms" type="text" value={formData.rooms} onChange={handleChange}/>*/}
        {/*<div onClick={() => handleIncrement('roomsCount')}>+</div>*/}

        {/*<label>Количество санузлов</label>*/}
        {/*<div onClick={() => handleDecrement('bathCount')}>-</div>*/}
        {/*<input name="baths" type="text" value={formData.baths} onChange={handleChange}/>*/}
        {/*<div onClick={() => handleIncrement('bathCount')}>+</div>*/}

        {/*<label>Когда к вам приехать?</label>*/}
        {/*<select name="date" onChange={handleChange}>*/}
        {/*  {futureDates.map((el, i) => {*/}
        {/*    return (<option key={i} value={el}>{el.toLocaleString("ru", {*/}
        {/*      day: "numeric",*/}
        {/*      month: "long",*/}
        {/*      weekday: "long",*/}
        {/*    })}</option>);*/}
        {/*  })}*/}
        {/*</select>*/}
        {/*<select name="time" onChange={handleChange}>*/}
        {/*  {futureTimes.map((el, i) => <option value={el} key={i}>{el}</option>)}*/}
        {/*</select>*/}
      </>}

      {(step === 1) &&
        <>
          {singleServices.map(el => {
            return (<label>
              <input
                type="checkbox"
                name={el.id}
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              {el.title}
            </label>);
          })}

          {noSingleServices.map(el => {
            return (
              <>
                <label>{el.title}</label>
                <div onClick={() => handleDecrement('services')}>-</div>
                <input name={el.id} type="text" value={formData.services[el.id]} onChange={handleServicesChange}/>
                <div id={el.id} value={1} onClick={handlePlus}>+</div>
              </>);
          })}


        </>}
      <div onClick={handleNextStep}>ДАЛЕЕ</div>
      <button type="submit">Отправить</button>
    </form>

  );
};

export default OrderForm;
