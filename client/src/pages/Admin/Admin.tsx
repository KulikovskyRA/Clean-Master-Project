import React from 'react';

import { Divider, Radio, Typography, Tabs } from 'antd';
const { TabPane } = Tabs;
const { Title } = Typography;
import type { RadioChangeEvent } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import AdminTab2 from '../../components/AdminTab2/AdminTab2';
import AdminTab1 from '../../components/AdminTab1/AdminTab1';

const Admin = () => {
  return (
    <div>
      <Title>Работай, контролируй</Title>
      <Tabs defaultActiveKey="1" centered style={{ height: 220 }}>
        <TabPane tab={'Заказы'} key="tab1">
          <AdminTab1 style={{ paddingLeft: '200px', textAlign: 'start' }} />
        </TabPane>
        <TabPane tab={'Финансы'} key="tab2">
          <AdminTab2 />
        </TabPane>
        <TabPane tab={'Клинеры'} key="tab3">
          {' '}
          ауцацуа
        </TabPane>
        <TabPane tab={'Клиенты'} key="tab4">
          {' '}
          уцауца
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Admin;
