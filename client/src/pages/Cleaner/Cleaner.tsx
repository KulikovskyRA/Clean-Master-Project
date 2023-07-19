import React from 'react';
import { Avatar, Button, ConfigProvider, Divider, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import CleanerOrdersTabs from '../../components/CleanerOrdersTabs/CleanerOrdersTabs';
import Navbar from '../../components/Navbar/Navbar';


import styles from "./CleanerStyles.module.css";
import CleanerInfo from "../../components/CleanerInfo/CleanerInfo";
import CleanerPhoto from "../../components/CleanerPhoto/CleanerPhoto";


const Cleaner: React.FC = () => {
  return (
    <>
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
          <Divider>
            <h1>Личный кабинет сотрудника</h1>
          </Divider>
          <div>
            <div className={styles.cleanerAvatarDiv}>
              <CleanerPhoto/>
            </div>
            <div className={styles.cleanerInfoDiv}>
              <CleanerInfo/>
            </div>
          </div>
          <CleanerOrdersTabs/>
        </div>
        <div className={styles.grayDiv}>
          ЗДЕСЬ КАКОЙ-ТО ФУТЕР ДЛЯ КЛИНЕРОВ :)
        </div>
      </ConfigProvider>
    </>
  );
};

export default Cleaner;
