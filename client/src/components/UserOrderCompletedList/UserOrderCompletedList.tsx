import * as React from 'react';
import axios from 'axios';
import UserOrderCompletedCard from '../UserOrderCompletedCard/UserOrderCompletedCard';
import { useEffect, useState } from 'react';
import UserOrderPlannedCard from '../UserOrderPlannedCard/UserOrderPlannedCard';
import { useSelector } from 'react-redux';

const { VITE_URL } = import.meta.env;

const UserOrderCompletedList = () => {
  const [orders, setOrders] = useState([]);
  const userId = useSelector((state) => state.authSlice.cleaner.id);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get(`${VITE_URL}order/`);
        setOrders(res.data);
        // Handle the response data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getOrders();
  }, []);
  // console.log(orders);

  return (
    <>
      {orders
        .filter((el) => el.done === true && el.user_id === userId)
        .map((el) => (
          <UserOrderCompletedCard orderData={el} key={el.id} />
        ))}
    </>
  );
};

export default UserOrderCompletedList;
