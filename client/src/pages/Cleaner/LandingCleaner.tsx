import React from "react";
import { Button, Divider, Row, Space, Typography, ConfigProvider } from "antd";
import Accordion from "../../components/LandingCleaner/Accordion";
import styles from "./LandingCleanerStyles.module.css";
import WeOffer from "../../components/LandingCleaner/WeOffer";
import BecomeACleaner from "../../components/LandingCleaner/BecomeACleaner";
import { FormOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function LandingCleaner() {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "black",
          },
        }}
      >
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          <div className={styles.cleanerHeaderDiv}>
            <Title level={4}>ИЩЕМ СПЕЦИАЛИСТОВ ПО УБОРКЕ</Title>
            <Title>
              Надёжный доход <br /> и удобное расписание
            </Title>
            <div>
              <Button type="primary" size="large" icon={<FormOutlined />}>
                Заполнить анкету
              </Button>
            </div>
          </div>
          <div style={{ width: "70%", margin: "0 auto", marginBottom: "20px" }}>
            <Divider>
              <h1>Мы предлагаем</h1>
            </Divider>
            <WeOffer />
          </div>
          <Row>
            <div className={styles.yellowDiv}>
              <Title>
                С вас - качественный сервис, <br /> с нас - стабильный поток
                клиентов
              </Title>
              <Button type="primary" size="large" icon={<FormOutlined />}>
                Заполнить анкету
              </Button>
            </div>
            <div
              style={{ width: "70%", margin: "0 auto", marginBottom: "20px" }}
            >
              <Divider>
                <h1>Как стать клинером в CLEAN MASTER</h1>
              </Divider>
              <BecomeACleaner />
            </div>
            <div className={styles.lightGrayDiv}>
              <Title>
                Просто откройте личный кабинет
                <br /> и управляйте своим расписанием
                <br /> и доходами
              </Title>
            </div>
            <div
              style={{ width: "70%", margin: "0 auto", marginBottom: "20px" }}
            >
              <Divider>
                <h1>Ответы на популярные вопросы</h1>
              </Divider>
              <Accordion />
            </div>
          </Row>
          <div className={styles.yellowDiv}>
            РОМА, ЗДЕСЬ ФОРМА РЕГИСТРАЦИИ КЛИНЕРА :)
          </div>
          <div className={styles.grayDiv}>
            ЗДЕСЬ КАКОЙ-ТО ФУТЕР ДЛЯ КЛИНЕРОВ :)
          </div>
        </Space>
      </ConfigProvider>
    </>
  );
}
