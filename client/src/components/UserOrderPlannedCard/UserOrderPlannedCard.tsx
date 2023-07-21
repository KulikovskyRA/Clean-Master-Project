import { useState } from "react";
import axios from "axios";
import { Avatar, Button, Card, Space, Modal, Form, Input, Select } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { futureDates, futureTimes } from "../OrderForm/orderdates.js";

const { VITE_URL } = import.meta.env;

const UserOrderPlannedCard = ({ orderData }) => {
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ isVisible, setIsVisible ] = useState(true);

  const dateOptions = futureDates.map((el) => ({
    value: `${el}`,
    label: el.toLocaleString("ru", {
      day: "numeric",
      month: "long",
      weekday: "long",
    }),
  }));

  const timeOptions = futureTimes.map((el) => ({ label: el, value: el }));

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const { id, address, OrderServices, info, price } = orderData;

  const [ cleaningTime, setCleaningTime ] = useState(orderData.cleaningTime);
  const date = new Date(cleaningTime);
  const endTime = new Date(date.getTime() + 3 * 60 * 60 * 1000);

  const onFinish = async (values) => {
    try {
      const res = await axios.put(`${VITE_URL}order/editorder`, {
        withCredentials: true,
        values,
        id,
      });
      if (res.status === 200) {
        setCleaningTime(res.data.cleaningTime);
        handleOk();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const cancelHandleOrder = async () => {
    console.log(`Я те удалю заказ! ${id}`);
    try {
      const res = await axios.delete(`${VITE_URL}order/cancelorder/${id}`, {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
    setIsVisible(false);
  };

  return (
    <div>
      {isVisible && (
        <Card
          title={`Заявка # ${id} (${date.toLocaleString("ru", {
            day: "numeric",
            month: "long",
            weekday: "long",
          })})`}
          style={{ width: "100%", border: "1px solid", position:"relative", marginBottom: "10px" }}
          headStyle={{ backgroundColor: "#B4C8DD" }}
        >
          <p>
            <b>Время уборки:</b>{" "}
            {date.toLocaleString("ru", {
              hour: "numeric",
              minute: "numeric",
            })}{" "}
            -{" "}
            {endTime.toLocaleString("ru", {
              hour: "numeric",
              minute: "numeric",
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
          </p>

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

          <p>
            <b>Комментарий к заказу:</b> {info}
          </p>
          <p>
            <b>Стоимость уборки:</b> {price} UZS
          </p>

          <div className="avatarDiv"
            style={{
              marginLeft: "76%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: "55%",
              transform: "translateY(-50%)"
            }}
          >
            <Avatar size={170} icon={<UserOutlined />} />
            <p>
              Ищем клинера
            </p>
          </div>

          <Space>
            <Button type="primary" onClick={showModal}>
              Перенести
            </Button>
            <Button type="default" onClick={cancelHandleOrder}>
              Отменить
            </Button>
          </Space>
          <Modal
            title={`Заявка # ${id} (${date.toLocaleString("ru", {
              day: "numeric",
              month: "long",
              weekday: "long",
            })})`}
            visible={isModalOpen}
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
                  defaultValue={date.toLocaleString("ru", {
                    day: "numeric",
                    month: "long",
                    weekday: "long",
                  })}
                  style={{ width: 120 }}
                  onChange={handleChange}
                  options={dateOptions}
                />
              </Form.Item>

              <Form.Item label="Время" name="time">
                <Select
                  defaultValue={date.toLocaleString("ru", {
                    hour: "numeric",
                    minute: "numeric",
                  })}
                  style={{ width: 120 }}
                  onChange={handleChange}
                  options={timeOptions}
                />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Перенести уборку
                </Button>
              </Form.Item>
            </Form>
          </Modal>

        </Card>
      )}
    </div>
  );
};

export default UserOrderPlannedCard;
