import * as React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import UserOrderPlannedList from '../UserOrderPlannedList/UserOrderPlannedList';
import UserOrderCompletedList from '../UserOrderCompletedList/UserOrderCompletedList';
import UserInfo from '../UserInfo/UserInfo';

const UserOrdersTabs = () => {
  const tabsItems: TabsProps['items'] = [
    {
      key: '1',
      label: `Запланированные уборки`,
      children: <UserOrderPlannedList />,
    },
    {
      key: '2',
      label: `История заказов`,
      children: <UserOrderCompletedList />,
    },
    {
      key: '3',
      label: `Данные профиля`,
      children: <UserInfo />,
    },
  ];

  return (
    <Tabs
      style={{ color: 'black' }}
      defaultActiveKey="1"
      centered
      items={tabsItems}
    />
  );
};

export default UserOrdersTabs;
