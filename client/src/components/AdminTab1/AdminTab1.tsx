import React from 'react';

import moment from 'moment';
// moment(el.createdAt).format('YYYY-MM-DD HH:mm:ss')

const dbOrders = [
  {
    id: 1,
    address: 'xyz',
    ordertime: '2023-07-08 10:51:49.612 +0300',
    user: 'Anna',
    cleaner: 'Alexa',
    price: 228,
    rooms: 3,
    bathroooms: 2,
    done: false,
    score: 0,
  },
  {
    id: 2,
    address: 'wfdwefwf',
    ordertime: '2023-05-02 10:51:49.612 +0300',
    user: 'Biba',
    cleaner: 'Boba',
    price: 555,
    rooms: 1,
    bathroooms: 4,
    done: true,
    score: 3,
  },
  {
    id: 3,
    address: 'xfregergegz',
    ordertime: '2023-01-08 10:51:49.612 +0300',
    user: 'Pasha',
    cleaner: 'Masha',
    price: 1055,
    rooms: 4,
    bathroooms: 1,
    done: true,
    score: 2.3,
  },
  {
    id: 4,
    address: '44',
    ordertime: '2023-05-02 10:51:49.612 +0300',
    user: 'Biba',
    cleaner: 'Boba',
    price: 555,
    rooms: 1,
    bathroooms: 4,
    done: true,
    score: 3,
  },
];
import { Button, Space, Descriptions, Card } from 'antd';

import { Divider } from 'antd';

const AdminTab1 = () => {
  return (
    <>
      {dbOrders.map((order) => (
        <>
          <Space style={{ paddingLeft: '200px', textAlign: 'start' }}>
            <Descriptions
              title={moment(order.ordertime).format(' HH:mm:ss    DD.MM.YYYY')}
              size="small"
            >
              <Descriptions.Item label="User">{order.user}</Descriptions.Item>
              <Descriptions.Item label="Cleaner">
                {order.user}
              </Descriptions.Item>
              <Descriptions.Item label="Telephone">
                1810000000
              </Descriptions.Item>
              <Descriptions.Item label="Live">
                Hangzhou, Zhejiang
              </Descriptions.Item>
              <Descriptions.Item label="Remark">
                <Button type="text">Text Button</Button>
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
              </Descriptions.Item>
            </Descriptions>
          </Space>
          <Divider />
        </>
      ))}
    </>
  );
};

export default AdminTab1;
