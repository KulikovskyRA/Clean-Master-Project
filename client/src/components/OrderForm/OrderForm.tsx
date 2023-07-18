import * as React from 'react';
import { useState } from "react";

const OrderForm = () => {
  const [ roomsCount, setRoomsCount ] = useState(0);

  const incrementRooms = () => {
    setRoomsCount(roomsCount + 1);
  };
  return (

    <form>
      <button>-</button>
      <input type="text" value={roomsCount} readOnly/>
      <div onClick={incrementRooms}>+</div>
    </form>

  );
};

export default OrderForm;
