import { Typography, Tabs, Row, Space, ConfigProvider, Button } from 'antd';
const { TabPane } = Tabs;
const { Title, Text } = Typography;
import { useNavigate, Link } from 'react-router-dom';
import AdminTab2 from '../../components/AdminTab2/AdminTab2';
import AdminTab1 from '../../components/AdminTab1/AdminTab1';
import AdminTab3 from '../../components/AdminTab3/AdminTab3';
import AdminTab4 from '../../components/AdminTab4/AdminTab4';

const Admin = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: 'black',
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

      <Space
        direction="horizontal"
        style={{ width: '100%', justifyContent: 'center' }}
      >
        <Title>Работай, управляй, решай</Title>
      </Space>

      <Tabs defaultActiveKey="1" centered style={{ height: 220 }}>
        <TabPane tab={'Заказы'} key="tab1">
          <AdminTab1 />
        </TabPane>
        <TabPane tab={'Финансы'} key="tab2">
          <AdminTab2 />
        </TabPane>
        <TabPane tab={'Клинеры'} key="tab3">
          <AdminTab3 />
        </TabPane>
        <TabPane tab={'Клиенты'} key="tab4">
          <AdminTab4 />
        </TabPane>
      </Tabs>
    </ConfigProvider>
  );
};

export default Admin;
