import { Button, Divider, Row, Space, Typography, ConfigProvider } from 'antd';
import Accordion from '../../components/LandingCleaner/Accordion';
import styles from './LandingCleanerStyles.module.css';
import WeOffer from '../../components/LandingCleaner/WeOffer';
import BecomeACleaner from '../../components/LandingCleaner/BecomeACleaner';
import { FormOutlined } from '@ant-design/icons';
import CleanerRegister from '../../components/CleanerRegister/CleanerRegister';
import Navbar from '../../components/Navbar/Navbar';
import { Link } from 'react-router-dom';

const { Title } = Typography;

import CleanerFooter from '../../components/CleanerFooter/CleanerFooter';

export default function LandingCleaner() {
  return (
    <>
      <Navbar />
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: 'black',
            fontSize: 18,
          },
        }}
      >
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <div className={styles.cleanerHeaderDiv}>
            <Title level={4}>ИЩЕМ СПЕЦИАЛИСТОВ ПО УБОРКЕ</Title>
            <Title>
              Надёжный доход <br /> и удобное расписание
            </Title>
            <div>
              <Button
                type="primary"
                size="large"
                icon={<FormOutlined />}
                href="#cleanerRegForm"
                target="_self"
              >
                Заполнить анкету
              </Button>
            </div>
          </div>
          <div
            style={{
              width: '70%',
              margin: '0 auto',
              marginBottom: 'px',
              marginTop: '50px',
            }}
          >
            <Divider>
              <h1>Мы предлагаем</h1>
            </Divider>
            <WeOffer />
          </div>
          <Row>
            <div className={styles.yellowDiv}>
              <Title>
                Мы настроены на долгосрочное <br /> сотрудничество и гарантируем{' '}
                <br />
                стабильный поток клиентов
              </Title>
              <Button
                type="primary"
                size="large"
                icon={<FormOutlined />}
                href="#cleanerRegForm"
                target="_self"
              >
                Заполнить анкету
              </Button>
            </div>
            <div
              style={{
                width: '70%',
                margin: '0 auto',
                marginBottom: '50px',
                marginTop: '50px',
              }}
            >
              <Divider>
                <h1>Как стать клинером в CLEAN MASTER?</h1>
              </Divider>
              <BecomeACleaner />
            </div>
            <div className={styles.lightGrayDiv}>
              <Title>
                Просто войдите в личный кабинет
                <br /> и управляйте своим расписанием
                <br /> и доходами
              </Title>
              <Link to="/cleanlogin">
                <Button
                  type="primary"
                  size="large"
                  // href="#cleanerRegForm"
                  // target="_self"
                >
                  Личный кабинет сотрудника
                </Button>
              </Link>
            </div>
            <div
              style={{
                width: '70%',
                margin: '0 auto',
                marginBottom: '50px',
                marginTop: '50px',
              }}
            >
              <Divider>
                <h1>Ответы на популярные вопросы</h1>
              </Divider>
              <Accordion />
            </div>
          </Row>
          <div className={styles.cleanerRegistrationDiv} id="cleanerRegForm">
            <CleanerRegister />
          </div>

          <CleanerFooter />

          {/* <section className="footer">
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
              <a className="link-footer" href="*">
                Договор
              </a>
              <a className="link-footer" href="*">
                Политика конфиденциальности
              </a>
              <a className="link-footer" href="*">
                Правила работы сайта
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
                <a href="https://vk.com/club134865736">
                  <img className="soc-png" src="./s2.png" alt="" />
                </a>
                <a href="https://www.instagram.com/cleanmastergt/">
                  <img className="soc-png" src="./s1.png" alt="" />
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
          </section> */}
        </Space>
      </ConfigProvider>
    </>
  );
}
