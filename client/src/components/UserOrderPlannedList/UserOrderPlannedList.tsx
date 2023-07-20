import * as React from 'react';
import axios from "axios";
import UserOrderPlannedCard from '../UserOrderPlannedCard/UserOrderPlannedCard';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const { VITE_URL } = import.meta.env;

const UserOrderPlannedList = () => {
  const [ orders, setOrders ] = useState([]);
  const userId = useSelector((state) => state.authSlice.cleaner.id);

  console.log(VITE_URL);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get(`${VITE_URL}order/userorders`, {
          withCredentials: true,
        });
        setOrders(res.data);
        // Handle the response data
      } catch (error) {
        console.error('Error fetching data:', error);
      }


    };
    getOrders();
  }, []);
  return (
    <>
      {orders.filter(el => el.done == false)
        .map(el => <UserOrderPlannedCard orderData={el} key={el.id}/>)}
    </>);
};

export default UserOrderPlannedList;
