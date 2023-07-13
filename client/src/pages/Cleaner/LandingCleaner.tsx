import React from "react";
import { Button, Col, Divider, Row, Space, Steps, Typography } from "antd";
import Accordion from "../../components/LandingCleaner/Accordion";
import styles from "./LandingCleanerStyles.module.css";
import WeOffer from "../../components/LandingCleaner/WeOffer";
import BecomeACleaner from "../../components/LandingCleaner/BecomeACleaner";

const { Title } = Typography;

export default function LandingCleaner() {
  return (
    <>
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        <div className={styles.cleanerHeaderDiv}>
          <Title level={4}>ИЩЕМ СПЕЦИАЛИСТОВ ПО УБОРКЕ</Title>
          <Title>
            Надёжный доход <br /> и удобное расписание
          </Title>
          <Button>Заполните анкету</Button>
        </div>
        <div
          style={{ width: "70%", margin: "0 auto", marginBottom: "20px" }}
        >
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
            <Button id="btn_lk_footer">Заполнить анкету</Button>
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
           Просто откройте личный кабинет<br /> и управляйте своим расписанием и доходами
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
    </>
  );
}
