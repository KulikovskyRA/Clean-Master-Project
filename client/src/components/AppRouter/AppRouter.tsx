import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home/Home';
import Client from '../../pages/Client/Client';
import Cleaner from '../../pages/Cleaner/Cleaner';
import Admin from '../../pages/Admin/Admin';

//! Авторизации и регистрации
import AdminLogin from '../AdminLogin/AdminLogin';
import Paralax from '../Paralax/Paralax';

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" Component={Paralax} />
        <Route path="/client" Component={Client} />
        <Route path="/cleaner" Component={Cleaner} />
        <Route path="/admin" Component={Admin} />

        <Route path="/adminlogin" Component={AdminLogin} />
      </Routes>
    </>
  );
};

export default AppRouter;
