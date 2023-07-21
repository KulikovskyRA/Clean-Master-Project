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
import { useEffect } from 'react';

export default function LandingCleaner() {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

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
                href="/cleanerRegForm"
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
                <Button type="primary" size="large">
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
        </Space>

        <CleanerFooter />
      </ConfigProvider>
    </>
  );
}
