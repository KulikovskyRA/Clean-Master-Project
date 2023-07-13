import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Client from '../../pages/Client/Client';
import Cleaner from '../../pages/Cleaner/Cleaner';
import Admin from '../../pages/Admin/Admin';

import Paralax from '../Paralax/Paralax';
//! Авторизации и регистрации
import AdminLogin from '../AdminLogin/AdminLogin';
import UserLogin from '../UserLogin/UserLogin';
import UserRegistration from '../UserRegistration/UserRegistration';
import CleanerLogin from '../CleanerLogin/CleanerLogin';

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" Component={Paralax} />
        <Route path="/client" Component={Client} />
        <Route path="/cleaner" Component={Cleaner} />
        <Route path="/admin" Component={Admin} />

        <Route path="/adminlogin" Component={AdminLogin} />

        <Route path="/register" Component={UserRegistration} />

        <Route path="/login" Component={UserLogin} />

        <Route path="/cleanlogin" Component={CleanerLogin} />
      </Routes>
    </>
  );
};

export default AppRouter;
