import {
  Typography,
  Card,
  Row,
  Modal,
  Input,
  Checkbox,
  Switch,
  Button,
  Form,
} from 'antd';
const { Title, Text } = Typography;
import StatCard from './StatCard';
// import ServiceRox from './ServiceRox';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { useState, useEffect } from 'react';

const AdminTab2 = () => {
  const [defaults, setDefaults] = useState([]);
  const [extra, setExtra] = useState([]);

  useEffect(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      (async function (): Promise<void> {
        const res: Response = await fetch(
          import.meta.env.VITE_URL + 'service/all',
          {
            credentials: 'include',
          }
        );
        if (res.ok) {
          const allServices = await res.json();
          const defaults = allServices.filter((el) => el.default);
          const extra = allServices.filter((el) => !el.default);
          setDefaults(defaults);
          setExtra(extra);
        }
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  //! Модалка изменения
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [service, setService] = useState(0);
  const [inputValues, setInputValues] = useState({});

  const showModal = (service) => {
    setIsModalOpen(true);
    setService(service);
    setInputValues({});
  };

  const handleOk = async () => {
    const res: Response = await fetch(
      import.meta.env.VITE_URL + `service/${service.id}`,
      {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(inputValues),
      }
    );
    if (res.ok) {
      const resultService = await res.json();
      console.log(resultService);
      if (service.default) {
        setDefaults((prev) => {
          const newDefs = prev.map((d) => {
            if (d.id === service.id) {
              return { ...resultService };
            }
            return d;
          });
          return newDefs;
        });
      } else {
        setExtra((prev) => {
          const newEx = prev.map((ex) => {
            if (ex.id === service.id) {
              return { ...resultService };
            }
            return ex;
          });
          return newEx;
        });
      }
    }
    setIsModalOpen(false);
    setService({});
    setInputValues({});
  };

  const handleChangePrice = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(inputValues);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setService({});
    setInputValues({});
  };

  const handleDelete = async (id) => {
    const res: Response = await fetch(
      import.meta.env.VITE_URL + `service/${id}`,
      {
        method: 'DELETE',
        credentials: 'include',
      }
    );
    if (res.ok) {
      setExtra((prev) => prev.filter((el) => el.id !== id));
    }
  };

  //! Модалка создания

  const onFinish = (values: any) => {
    console.log('Success:', values);
    setIsModalСreateOpen(false);
  };

  const [isModalСreateOpen, setIsModalСreateOpen] = useState(false);

  const handleСreateCancel = () => {
    setIsModalСreateOpen(false);
  };

  const handleСreateOpen = () => {
    setIsModalСreateOpen(true);
  };

  return (
    <>
      <Modal
        title="Изменение услуги:"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          name="price"
          onChange={handleChangePrice}
          style={{ width: 450 }}
          placeholder="Введите цену"
          value={inputValues.price}
        />

        {!service.default && (
          <>
            <Input
              name="title"
              onChange={handleChangePrice}
              style={{ width: 450 }}
              placeholder="Измените название услуги(если нужно)"
              value={inputValues.title}
            />
          </>
        )}
      </Modal>

      <Row
        align="middle"
        justify="space-evenly"
        style={{
          marginLeft: '15%',
          textAlign: 'start',
          marginRight: '15%',
        }}
      >
        <StatCard />

        <Card>
          <Title level={2}>Услуги:</Title>
          <Title level={4}>Базовые:</Title>

          {defaults.map((def) => (
            <Row key={`def${def.id}`}>
              <Text>{`${def.title}: ${def.singlePrice} UZS     `}</Text>
              <EditOutlined onClick={() => showModal(def)} />;
            </Row>
          ))}

          <Title level={4}>Дополнительные:</Title>
          {extra.map((ex) => (
            <Row key={`ex${ex.id}`}>
              <Text>{`${ex.title}: ${ex.singlePrice} UZS     `}</Text>
              <EditOutlined onClick={() => showModal(ex)} />;
              <DeleteOutlined onClick={() => handleDelete(ex.id)} />
            </Row>
          ))}

          <Button onClick={handleСreateOpen}>Добавить услугу!</Button>
        </Card>
      </Row>

      <Modal
        title="Cоздать услугу"
        open={isModalСreateOpen}
        onCancel={handleСreateCancel}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="title"
            rules={[{ required: true, message: 'Введите название услуги:' }]}
          >
            <Input placeholder="Введите название услуги!" />
          </Form.Item>

          <Form.Item
            name="price"
            rules={[{ required: true, message: 'Введите цену!' }]}
          >
            <Input placeholder="Введите цену:" />
          </Form.Item>

          <Form.Item name="single" valuePropName="checked">
            <Checkbox>Cделать единичной услугой:</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AdminTab2;
