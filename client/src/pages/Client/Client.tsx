import * as React from "react";
import styles from "./ClientStyles.module.css";

import { Button, Space, ConfigProvider, Divider } from "antd";
import UserOrdersTabs from "../../components/UserOrdersTabs/UserOrdersTabs";

import { Typography } from "antd";

const { Title } = Typography;

const { VITE_URL } = import.meta.env;

interface IUserData {
  name: string;
  phone: string;
  email: string;
}

const userData: IUserData = {
  name: "Акакий",
  phone: "+998 94 720 2212",
  email: "puk@example.com",
};

const Client: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "black",
          fontSize: 15,
        },
      }}
    >
      <div
        style={{
          width: "80%",
          margin: "0 auto",
          marginBottom: "50px",
          marginTop: "50px",
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
      <div className={styles.grayDiv}>ФУТЕР</div>
    </ConfigProvider>
  );
};

export default Client;
