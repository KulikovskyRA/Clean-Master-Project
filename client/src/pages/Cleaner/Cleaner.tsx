import React from 'react';
import { Avatar, Button, ConfigProvider, Divider, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import CleanerOrdersTabs from '../../components/CleanerOrdersTabs/CleanerOrdersTabs';
import Navbar from '../../components/Navbar/Navbar';

import { useNavigate, Link } from 'react-router-dom';

import styles from './CleanerStyles.module.css';
import CleanerInfo from '../../components/CleanerInfo/CleanerInfo';
import CleanerPhoto from '../../components/CleanerPhoto/CleanerPhoto';
import CleanerFooter from '../../components/CleanerFooter/CleanerFooter';

const Cleaner: React.FC = () => {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: 'black',
            fontSize: 15,
            colorLink: 'black',
            colorLinkActive: 'black',
            colorLinkHover: 'gray',
          },
        }}
      >
        <Space
          direction="horizontal"
          style={{
            width: '100%',
            justifyContent: 'center',
            paddingTop: '15px',
          }}
        >
          <Link to="/">
            <Button type="link">На главную</Button>
          </Link>
        </Space>
        <div
          style={{
            width: '80%',
            margin: '0 auto',
            marginBottom: '50px',
            marginTop: '-30px',
          }}
        >
          <Divider>
            <h1>Личный кабинет сотрудника</h1>
          </Divider>
          <div>
            <div className={styles.cleanerAvatarDiv}>
              <CleanerPhoto />
            </div>
            <div className={styles.cleanerInfoDiv}>
              <CleanerInfo />
            </div>
          </div>
          <CleanerOrdersTabs />
        </div>
        <CleanerFooter />
      </ConfigProvider>
    </>
  );
};

export default Cleaner;
