import * as React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import UserOrderPlannedList from "../UserOrderPlannedList/UserOrderPlannedList";
import UserOrderComplitedList from "../UserOrderComplitedList/UserOrderComplitedList";

const UserOrdersTabs = () => {

  const tabsItems: TabsProps['items'] = [ {
    key: '1',
    label: `Ближайшие`,
    children: <UserOrderPlannedList/>
  }, {
    key: '2',
    label: `Выполненные`,
    children: <UserOrderComplitedList/>
  } ];

  return (
    <Tabs
      defaultActiveKey="1"
      centered
      items={tabsItems}
    />
  );
};

export default UserOrdersTabs;
