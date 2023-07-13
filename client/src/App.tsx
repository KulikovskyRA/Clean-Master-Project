import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { authReducer } from './redux/authSlice';

import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Layout } from 'antd';
import AppRouter from './components/AppRouter/AppRouter';
import Paralax from './components/Paralax/Paralax';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      (async function (): Promise<void> {
        const response: Response = await fetch(
          import.meta.env.VITE_URL + 'auth',
          {
            credentials: 'include',
          }
        );

        // console.log(result);
        if (response.ok) {
          const result = await response.json();
          dispatch(
            authReducer({
              type: result.type,
              name: result.adminName,
              id: result.id,
              email: result.email,
            })
          );
        }
        // else {
        //   dispatch(
        //     authReducer({
        //       type: '',
        //       name: '',
        //       id: 0,
        //       email: '',
        //     })
        //   );
        // }
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    >
      <Navbar />
      <AppRouter />
    </div>
  );
}

export default App;
