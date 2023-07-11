import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home/Home';
import Client from '../../pages/Client/Client';
import Cleaner from '../../pages/Cleaner/Cleaner';
import Admin from '../../pages/Admin/Admin';

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/client" Component={Client} />
        <Route path="/cleaner" Component={Cleaner} />
        <Route path="/admin" Component={Admin} />
      </Routes>
    </>
  );
};

export default AppRouter;
