import * as React from 'react';
import { Avatar, Button, Card, Space, Select, Modal, Form } from 'antd';
import { futureDates, futureTimes } from '../OrderForm/orderdates.js';
import { useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import OrderAsses from '../OrderAsses/OrderAsses';
import { UserOutlined } from '@ant-design/icons';

const { VITE_URL } = import.meta.env;

const UserOrderCompletedCard: React.FC = ({ orderData }) => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const { id, address, cleaningTime, OrderServices, info, price } = orderData;
  const date = new Date(cleaningTime);
  const endTime = new Date(date.getTime() + 3 * 60 * 60 * 1000);

  const dateOptions = futureDates.map((el) => {
    return {
      value: `${el}`,
      label: el.toLocaleString('ru', {
        day: 'numeric',
        month: 'long',
        weekday: 'long',
      }),
    };
  });

  const timeOptions = futureTimes.map((el, i) => ({ label: el, value: el }));

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showRatingModal = () => {
    setIsRatingModalOpen(true);
  };

  const handleRatingOk = () => {
    setIsRatingModalOpen(false);
  };

  const handleRatingCancel = () => {
    setIsRatingModalOpen(false);
  };

  const onFinish = async (values: any) => {
    try {
      const res = await axios.post(
        `${VITE_URL}order/repeatorder`,
        { values, OrderServices, address, info },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        handleOk();
        navigate(0);
      }
    } catch (error) {
      console.log(error);
    }
    console.log(values, OrderServices);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <Card
      title={`Заявка # ${id} (${date.toLocaleString('ru', {
        day: 'numeric',
        month: 'long',
        weekday: 'long',
      })})`}
      style={{
        width: '100%',
        marginBottom: '10px',
        border: '1px solid',
        position: 'relative',
      }}
      headStyle={{ backgroundColor: '#EFEBEB' }}
    >
      <p>
        <b>Время уборки:</b>{' '}
        {date.toLocaleString('ru', {
          hour: 'numeric',
          minute: 'numeric',
        })}{' '}
        -{' '}
        {endTime.toLocaleString('ru', {
          hour: 'numeric',
          minute: 'numeric',
        })}
      </p>
      <p>
        <b>Адрес:</b>
        {`${address}`}
      </p>
      <p>
        <b>Основные услуги:</b>
        <ul>
          {OrderServices.filter((el) => el.Service.default === true).map(
            (el, i) => (
              <li key={i}>
                {el.Service.title} {el.amount}
              </li>
            )
          )}
        </ul>

        {OrderServices.length !== 0 && (
          <>
            <b>Дополнительные услуги:</b>

            <ul>
              {OrderServices.filter(
                (el) =>
                  el.Service.single === false && el.Service.default === false
              ).map((el, i) => (
                <li key={i}>
                  {el.Service.title} {el.amount}
                </li>
              ))}

              {OrderServices.filter(
                (el) =>
                  el.Service.single === true && el.Service.default === false
              ).map((el, i) => (
                <li key={i}>{el.Service.title}</li>
              ))}
            </ul>
          </>
        )}
      </p>
      <p>
        <b>Комментарий к заказу:</b> {info}
      </p>
      <p>
        <b>Стоимость уборки:</b> {price} UZS
      </p>

      <div
        className="avatarDiv"
        style={{
          marginLeft: '76%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: '55%',
          transform: 'translateY(-50%)',
        }}
      >
        {orderData.Cleaner ? (
          <>
            {orderData.Cleaner?.img ? (
              <Avatar
                size={170}
                src={`http://localhost:3500/uploads/${orderData.Cleaner.img}`}
              />
            ) : (
              <Avatar size={170} icon={<UserOutlined />} />
            )}
            <p>{orderData.Cleaner.name}</p>
          </>
        ) : (
          <>
            <Avatar size={170} icon={<UserOutlined />} />
          </>
        )}
      </div>

      <Space>
        <Button type="primary" size="medium" onClick={showModal}>
          Повторить уборку
        </Button>
        <Button type="default" size="medium" onClick={showRatingModal}>
          Оценить
        </Button>
      </Space>
      <Modal
        title={`Заявка # ${id} (${date.toLocaleString('ru', {
          day: 'numeric',
          month: 'long',
          weekday: 'long',
        })})`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="Дата" name="date">
            <Select
              defaultValue={date.toLocaleString('ru', {
                day: 'numeric',
                month: 'long',
                weekday: 'long',
              })}
              style={{ width: 250 }}
              onChange={handleChange}
              options={dateOptions}
            />
          </Form.Item>

          <Form.Item label="Время" name="time">
            <Select
              defaultValue={date.toLocaleString('ru', {
                hour: 'numeric',
                minute: 'numeric',
              })}
              style={{ width: 120 }}
              onChange={handleChange}
              options={timeOptions}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Повторить уборку
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title={`Заявка # ${id} (${date.toLocaleString('ru', {
          day: 'numeric',
          month: 'long',
          weekday: 'long',
        })})`}
        open={isRatingModalOpen}
        onOk={handleRatingOk}
        onCancel={handleRatingCancel}
      >
        <OrderAsses id={id} />
      </Modal>
    </Card>
  );
};

export default UserOrderCompletedCard;
