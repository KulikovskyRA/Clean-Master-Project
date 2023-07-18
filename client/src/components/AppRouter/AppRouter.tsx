import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Client from '../../pages/Client/Client';
import Cleaner from '../../pages/Cleaner/Cleaner';
import LandingCleaner from '../../pages/Cleaner/LandingCleaner';
import Admin from '../../pages/Admin/Admin';

import Paralax from '../Paralax/Paralax';
//! Авторизации и регистрации
import AdminLogin from '../AdminLogin/AdminLogin';
import UserLogin from '../UserLogin/UserLogin';
import UserRegistration from '../UserRegistration/UserRegistration';
import CleanerLogin from '../CleanerLogin/CleanerLogin';
import CleanerRegister from '../CleanerRegister/CleanerRegister';
import OrderForm from "../OrderForm/OrderForm";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" Component={Paralax}/>
        <Route path="/client" Component={Client}/>
        <Route path="/cleaner" Component={Cleaner}/>
        <Route path="/jobs" Component={LandingCleaner}/>
        <Route path="/admin" Component={Admin}/>

        <Route path="/adminlogin" Component={AdminLogin}/>
        <Route path="/register" Component={UserRegistration}/>
        <Route path="/login" Component={UserLogin}/>

        <Route path="/cleanlogin" Component={CleanerLogin}/>
        <Route path="/cleanregister" Component={CleanerRegister}/>

        <Route path="/neworder" Component={OrderForm}/>
      </Routes>
    </>
  );
};

export default AppRouter;
