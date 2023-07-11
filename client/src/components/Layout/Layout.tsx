import { useState, FC } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

interface IProps {
  children: FC;
}

const Layout = ({ children }: IProps) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default Layout;
