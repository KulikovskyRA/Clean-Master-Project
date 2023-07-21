import * as React from 'react';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import { Rate } from 'antd';
import axios from "axios";

const { VITE_URL } = import.meta.env;


const OrderAsses = ({ id }) => {
  const customIconStyle = {
    fontSize: '54px', // Change this value to adjust the icon size
  };
  const customIcons: Record<number, React.ReactNode> = {
    1: <FrownOutlined style={customIconStyle}/>,
    2: <FrownOutlined style={customIconStyle}/>,
    3: <MehOutlined style={customIconStyle}/>,
    4: <SmileOutlined style={customIconStyle}/>,
    5: <SmileOutlined style={customIconStyle}/>,
  };

  const getScore = async (value) => {
    try {
      const res = await axios.put(`${VITE_URL}order/assesorder`, { id, value }, {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div>
      <Rate defaultValue={0} onChange={getScore} character={({ index }: { index: number }) => customIcons[index + 1]}/>
    </div>
  );
};

export default OrderAsses;
