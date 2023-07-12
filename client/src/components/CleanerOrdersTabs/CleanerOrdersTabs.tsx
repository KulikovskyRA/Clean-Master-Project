import * as React from 'react';

import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import CleanerOrdersPlannedList from '../CleanerOrdersPlannedList/CleanerOrdersPlannedList';
import CleanerOrdersAvailableList from '../CleanerOrdersAvailableList/CleanerOrdersAvailableList';

const CleanerOrdersTabs = () => {

  const tabsItems: TabsProps['items'] = [ {
    key: '1',
    label: `Мои уборки`,
    children: <CleanerOrdersPlannedList/>
  }, {
    key: '2',
    label: `Доступные заявки`,
    children: <CleanerOrdersAvailableList/>
  } ];

  return (
    <Tabs
      defaultActiveKey="1"
      centered
      items={tabsItems}
    />
  );
};

export default CleanerOrdersTabs;
