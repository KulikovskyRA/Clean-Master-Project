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
            <Space wrap size={16}>
              <div className={styles.cleanerAvatarDiv}>
                <Avatar size={150} icon={<UserOutlined />} />
                <Button type="default" size="small">
                  Загрузить фото
                </Button>
              </div>
            </Space>
            <Space>
              <CleanerInfo />
            </Space>
          </div>
          <CleanerOrdersTabs />
        </div>
      </ConfigProvider>
    </>
  );
};

export default Cleaner;
