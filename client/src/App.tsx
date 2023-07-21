import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { checkAuthReducer } from './redux/authSlice';

import './App.css';

import AppRouter from './components/AppRouter/AppRouter';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      (async function (): Promise<void> {
        const response: Response = await fetch(
          import.meta.env.VITE_URL + 'auth',
          {
            credentials: 'include',
          }
        );

        if (response.ok) {
          const result = await response.json();

          //! НЕ НАДО!!!!!
          // if (!result.user && window.location.pathname === '/client') {
          //   navigate('/');
          // }

          if (!result.admin && window.location.pathname === '/admin') {
            navigate('/adminlogin');
          }

          if (!result.cleaner && window.location.pathname === '/cleaner') {
            navigate('/cleanlogin');
          }

          dispatch(checkAuthReducer(result));
        }
      })();
    } catch (error) {
      console.log(error);
    }
  });

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
      <AppRouter />
    </div>
  );
}

export default App;
