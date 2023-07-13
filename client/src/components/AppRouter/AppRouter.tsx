import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home/Home';
import Client from '../../pages/Client/Client';
import Cleaner from '../../pages/Cleaner/Cleaner';
import LandingCleaner from '../../pages/Cleaner/LandingCleaner';
import Admin from '../../pages/Admin/Admin';

//! Авторизации и регистрации
import AdminLogin from '../AdminLogin/AdminLogin';

import UserRegistration from "../UserRegistration/UserRegistration";

import Paralax from '../Paralax/Paralax';

const AppRouter = () => {
  return (
    <>
      <Routes>

        <Route path="/" Component={Paralax} />
        <Route path="/client" Component={Client} />
        <Route path="/cleaner" Component={Cleaner} />
        <Route path="/jobs" Component={LandingCleaner} />
        <Route path="/admin" Component={Admin} />

        <Route path="/adminlogin" Component={AdminLogin}/>

        <Route path="/register" Component={UserRegistration}/>
      </Routes>
    </>
  );
};

export default AppRouter;
