import React from "react";
import { Avatar, Space, Button, ConfigProvider, Divider } from "antd";
import { UserOutlined } from "@ant-design/icons";
import CleanerOrdersTabs from "../../components/CleanerOrdersTabs/CleanerOrdersTabs";

import styles from "./CleanerStyles.module.css";
import CleanerInfo from "../../components/CleanerInfo/CleanerInfo";

const Cleaner: React.FC = () => {
  return (
    <>
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
          <Divider>
            <h1>Личный кабинет сотрудника</h1>
          </Divider>
          <div>
            <div className={styles.cleanerAvatarDiv}>
              <Avatar size={150} icon={<UserOutlined />} />
              <Button type="default" size="small">
                Загрузить фото
              </Button>
            </div>
            <div className={styles.cleanerInfoDiv}>
              <CleanerInfo />
            </div>
          </div>
          <CleanerOrdersTabs />
        </div>
      <div className={styles.grayDiv}>
            ЗДЕСЬ КАКОЙ-ТО ФУТЕР ДЛЯ КЛИНЕРОВ :)
          </div>
      </ConfigProvider>

    </>
  );
};

export default Cleaner;
