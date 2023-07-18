import React from 'react';

import {
  Button,
  Form,
  Input,
  Typography,
  Select,
  Row,
  Col,
  ConfigProvider,
  Divider,
} from 'antd';
const { Title, Text } = Typography;

const CleanerFooter = () => {
  return (
    <div
      style={{
        backgroundColor: '#262626',
        color: '#9ca09f',
        height: '30vh',
        paddingLeft: '15%',
        paddingRight: '15%',
        paddingBottom: '1.4%',
      }}
    >
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: 'black',
            fontSize: 18,
            colorTextBase: 'gray',
            colorLink: 'white',
            colorLinkActive: 'white',
            colorLinkHover: 'gray',
          },
        }}
      >
        <Row>
          <Title level={5}>Информация:</Title>
        </Row>
        <Row>
          <Button type="link" style={{ paddingLeft: 0 }}>
            На главную
          </Button>
          <Button type="link">Контакты</Button>
          <Button type="link">Вопросы и ответы</Button>
          <Button type="link">Вакансии</Button>
          <Button type="link">Документы</Button>
        </Row>
        <Divider style={{ borderTop: '1px solid gray' }} />
        <Row>
          <Text style={{ fontSize: '15px' }}>
            Начиная использовать Сервис (его отдельные функциональности), вы
            принимаете Пользовательское соглашение и соглашаетесь c Политикой
            конфиденциальности.
          </Text>
        </Row>
        <Row>
          <Text style={{ fontSize: '15px' }}>© 2023, CLEANMASTER</Text>
        </Row>
      </ConfigProvider>
    </div>
  );
};

export default CleanerFooter;
