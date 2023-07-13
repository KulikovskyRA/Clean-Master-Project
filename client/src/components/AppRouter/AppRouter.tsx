import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home/Home';
import Client from '../../pages/Client/Client';
import Cleaner from '../../pages/Cleaner/Cleaner';
import Admin from '../../pages/Admin/Admin';

//! Авторизации и регистрации
import AdminLogin from '../AdminLogin/AdminLogin';

import UserRegistration from "../UserRegistration/UserRegistration";

import Paralax from '../Paralax/Paralax';
import UserLogin from "../UserLogin/UserLogin";


const AppRouter = () => {
  return (
    <>
      <Routes>

        <Route path="/" Component={Paralax}/>
        <Route path="/client" Component={Client}/>
        <Route path="/cleaner" Component={Cleaner}/>
        <Route path="/admin" Component={Admin}/>


        <Route path="/adminlogin" Component={AdminLogin}/>

        <Route path="/register" Component={UserRegistration}/>
        <Route path="/login" Component={UserLogin}/>
      </Routes>
    </>
  );
};

export default AppRouter;
