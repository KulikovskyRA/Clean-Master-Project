import { Link } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';

import { useState, useEffect } from 'react';

import UserLogin from '../UserLogin/UserLogin';
import UserRegistration from '../UserRegistration/UserRegistration';

import {
  Button,
  Checkbox,
  Row,
  Form,
  Input,
  ConfigProvider,
  Modal,
} from 'antd';

const Navbar = () => {
  const handleLogout = () => {
    fetch(import.meta.env.VITE_URL + 'auth/logout', {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => {
        window.location.href = '/';
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  };

  const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);
  const [isRegisterState, setIsRegisterState] = useState(false);

  const handleLoginCancel = () => {
    setIsModalLoginOpen(false);
  };

  const showLoginModal = () => {
    setIsModalLoginOpen(true);
  };

  const changeModaltoRegister = () => {
    setIsRegisterState(true);
  };

  const changeModaltoLogin = () => {
    setIsRegisterState(false);
  };

  return (
    <div className="nav">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: 'black',
            fontSize: 18,
            colorLink: 'black',
            colorLinkActive: 'black',
            colorLinkHover: 'gray',
          },
        }}
      >
        <Modal
          title="Введите свои данные:"
          open={isModalLoginOpen}
          onCancel={handleLoginCancel}
          footer={null}
        >
          {!isRegisterState ? (
            <>
              <UserLogin />
              <Button
                style={{ position: 'absolute', bottom: 45, left: 60 }}
                type="link"
                onClick={changeModaltoRegister}
              >
                Нет аккаунта? Создать!
              </Button>
            </>
          ) : (
            <>
              <UserRegistration />
              <Button
                style={{ position: 'absolute', bottom: 45, left: 30 }}
                type="link"
                onClick={changeModaltoLogin}
              >
                У меня уже есть аккаунт!
              </Button>
            </>
          )}
        </Modal>
      </ConfigProvider>

      <Link className="nav-link" to="/">
        На главную
      </Link>
      <Link className="nav-link" to="/client">
        Личный кабинет
      </Link>

      <ConfigProvider
        theme={{
          token: {
            fontSize: 16,
            // fontWeight: 600,
            fontFamily: 'Roboto',
            colorLink: 'black',
            colorLinkActive: 'black',
            colorLinkHover: 'black',
          },
        }}
      >
        <Button
          type="link"
          style={{ fontWeight: 600, paddingLeft: 0, paddingRight: 0 }}
          onClick={showLoginModal}
        >
          Войти!
        </Button>
      </ConfigProvider>

      <button className="logout-btn " onClick={handleLogout}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="currentColor"
          className="bi bi-door-closed"
          viewBox="0 0 16 16"
        >
          <path d="M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2zm1 13h8V2H4v13z" />
          <path d="M9 9a1 1 0 1 0 2 0 1 1 0 0 0-2 0z" />
        </svg>
      </button>
    </div>
  );
};

export default Navbar;
