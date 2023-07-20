import * as React from 'react';
import CleanerOrderAvailableCard from '../CleanerOrderAvailableCard/CleanerOrderAvailableCard';

const CleanerOrdersAvailableList = () => {
  const [availableOrders, setAvailableOrders] = React.useState([]);

  const fetchAvailableOrders = async () => {
    try {
      const response = await fetch(
        `http://localhost:3500/api/order/available`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const result = await response.json();
      setAvailableOrders(result);
      // console.log("available orders-------->", result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  React.useEffect(() => {
    void fetchAvailableOrders();
  }, []);

  return (
    <>
      {' '}
      {availableOrders.map((card) => (
        <CleanerOrderAvailableCard orderData={card} />
      ))}
    </>
  );
};

export default CleanerOrdersAvailableList;
