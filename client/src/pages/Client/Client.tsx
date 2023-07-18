import * as React from 'react';
import styles from './ClientStyles.module.css';
import Navbar from '../../components/Navbar/Navbar';
import { Button, Space, ConfigProvider, Divider } from 'antd';
import UserOrdersTabs from '../../components/UserOrdersTabs/UserOrdersTabs';
import { Link } from 'react-router-dom';

import { Typography } from 'antd';

const { Title } = Typography;

const { VITE_URL } = import.meta.env;

interface IUserData {
  name: string;
  phone: string;
  email: string;
}

const userData: IUserData = {
  name: 'Акакий',
  phone: '+998 94 720 2212',
  email: 'puk@example.com',
};

const Client: React.FC = () => {
  return (
    <>
      <Navbar />
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: 'black',
            fontSize: 15,
          },
        }}
      >
        <div
          style={{
            width: '80%',
            margin: '0 auto',
            marginBottom: '50px',
            marginTop: '50px',
          }}
        >
          <div>
            <div className={styles.userInfoDiv}>
              <Title>Рады видеть вас, {userData.name}!</Title>
              <Title level={3}>Пора навести чистоту?</Title>
              <Button type="primary" size="large">
                Заказать уборку
              </Button>
              <Space></Space>
            </div>
          </div>
          <UserOrdersTabs />
        </div>
        <section className="footer">
          <div className="first-box">
            <div className="link-title">Меню</div>
            <a className="link-footer" href="/">
              Главная
            </a>
            <a className="link-footer" href="#plus">
              О компании
            </a>

            <Link className="link-footer" to="/jobs">
              Вакансии
            </Link>

            <a className="link-footer" href="#price">
              Цены
            </a>
          </div>

          <div className="contact-box">
            <div className="link-title">Контакты</div>
            <a className="link-footer" href="tel:8 800-2222-945">
              8 800-2222-945
            </a>
            <a className="link-footer" href="tel:8 (921) 928-72-58">
              8 (921) 928-72-58
            </a>
            <a className="link-footer" href="mailto:info@clean-master.com">
              info@clean-master.com
            </a>
            <div className="social">
              <a href="https://www.instagram.com/cleanmastergt/">
                <img className="soc-png" src="./s1.png" alt="" />
              </a>
              <a href="https://vk.com/club134865736">
                <img className="soc-png" src="./s2.png" alt="" />
              </a>
              <a href="https://web.telegram.org/a/#-1751514282">
                <img className="soc-png" src="./s4.png" alt="" />
              </a>
              <a className="link-footer" href="https://web.whatsapp.com/">
                <img className="soc-png" src="./s5.png" alt="" />
              </a>
            </div>
          </div>

          <div className="three-box">
            <div className="link-title">Способы оплаты</div>
            <div className="pays-box">
              <img className="pay1" src="./p1.png" alt="" />
              <img className="pay" src="./p2.png" alt="" />
              <img className="pay" src="./p3.png" alt="" />
            </div>
          </div>
        </section>
      </ConfigProvider>
    </>
  );
};

export default Client;
