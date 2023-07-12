import React from 'react';
import { Avatar, Space, List, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import CleanerOrdersTabs from "../../components/CleanerOrdersTabs/CleanerOrdersTabs";

interface ICleanerData {
  id: number,
  name: string,
  surname: string,
  patronymic: string,
  phone: string,
  residency: string,
  petFriendly: true,
  ordersCompleted: number,
  ordersPlanned: number,
  rating: number,
  income: number
}

const cleanerData: ICleanerData = {
  id: 123,
  name: 'Наталья',
  surname: 'Абрикосова',
  patronymic: 'Вячеславовна',
  phone: '+998 94 720 2280',
  residency: 'Узбекистан',
  petFriendly: true,
  ordersCompleted: 18,
  ordersPlanned: 3,
  rating: 4.8,
  income: 1254000
};


const Cleaner: React.FC = () => {
  const listData = [
    `${cleanerData.name} ${cleanerData.patronymic} ${cleanerData.surname}`,
    `Контактный номер: ${cleanerData.phone}`,
    `ID: ${cleanerData.id}`, `Вы уже заработали: ${cleanerData.income} UZS`, `Ваш рейтинг: ${cleanerData.rating}`,
    `Выполнено уборок: ${cleanerData.ordersCompleted}`, `Запланировано уборок: ${cleanerData.ordersPlanned}`
  ];

  return (
    <>
      <h2>Личный кабинет клинера</h2>
      <div>
        <div>
          <Space direction="horizontal" size={16}>
            <Space wrap size={16}>
              <Avatar size={64} icon={<UserOutlined/>}/>
              <Button size="small">
              Загрузить фото
            </Button>
            </Space>
            <Space>
              <List
                size="small"
                dataSource={listData}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />

            </Space>
          </Space>
        </div>
      </div>

      <CleanerOrdersTabs/>

    </>
  );
};

export default Cleaner;

