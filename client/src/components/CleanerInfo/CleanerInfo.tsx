import { Descriptions, Divider } from "antd";
import React from "react";

interface ICleanerData {
  id: number;
  name: string;
  surname: string;
  patronymic: string;
  phone: string;
  residency: string;
  petFriendly: true;
  ordersCompleted: number;
  ordersPlanned: number;
  rating: number;
  income: number;
}

const cleanerData: ICleanerData = {
  id: 123,
  name: "Наталья",
  surname: "Абрикосова",
  patronymic: "Вячеславовна",
  phone: "+998 94 720 2280",
  residency: "Узбекистан",
  petFriendly: true,
  ordersCompleted: 18,
  ordersPlanned: 3,
  rating: 4.8,
  income: 1254000,
};

export default function CleanerInfo() {
  return (
    <>
      <Divider orientation="left" orientationMargin="0">
        <h4>Карточка сотрудника</h4>
      </Divider>
      <Descriptions
        layout="vertical"
        bordered="true"
        column={7}
        contentStyle={{ fontWeight: "bold" }}
      >
        <Descriptions.Item label="Ф.И.О">
          {cleanerData.name} {cleanerData.patronymic} {cleanerData.surname}
        </Descriptions.Item>
        <Descriptions.Item label="ID">{cleanerData.id}</Descriptions.Item>
        <Descriptions.Item label="Номер телефона">
          {cleanerData.phone}
        </Descriptions.Item>
        <Descriptions.Item label="Гражданство">Узбекистан</Descriptions.Item>
        <Descriptions.Item label="Выполнено уборок">
          {cleanerData.ordersCompleted}
        </Descriptions.Item>
        <Descriptions.Item label="Запланировано уборок">
          {cleanerData.ordersPlanned}
        </Descriptions.Item>
        <Descriptions.Item label="Доход">
          {cleanerData.income} UZS
        </Descriptions.Item>
      </Descriptions>
    </>
  );
}
