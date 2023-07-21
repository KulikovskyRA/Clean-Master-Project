import {
  Typography,
  Card,
  Row,
  Modal,
  Input,
  Checkbox,
  Button,
  Form,
  Col,
  Space,
} from 'antd';
const { Title, Text } = Typography;
import StatCard from './StatCard';

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

  const onFinish = async (values: any) => {
    const responseNew: Response = await fetch(
      import.meta.env.VITE_URL + 'service/new',
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(values),
      }
    );
    if (responseNew.ok) {
      const resNew = await responseNew.json();
      // console.log(resNew);
      setExtra((prev) => [...prev, resNew]);
    }

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
      <StatCard />
      <Card
        title="Услуги:"
        style={{
          marginLeft: '26%',
          marginTop: '10px',
          marginRight: '26%',
          border: '1px solid',
        }}
        headStyle={{ backgroundColor: '#EFEBEB' }}
      >
        <Row>
          <Col span={10}>
            <Title level={5} style={{ marginTop: 0 }}>
              Базовые:
            </Title>

            {defaults.map((def) => (
              <Row key={`def${def.id}`}>
                <Text>{`${def.title}: ${def.singlePrice} UZS     `}</Text>
                <EditOutlined
                  style={{ marginLeft: '3px' }}
                  onClick={() => showModal(def)}
                />
              </Row>
            ))}
            <Space
              style={{
                marginTop: '12px',
              }}
            >
              <Button onClick={handleСreateOpen}>Добавить услугу!</Button>
            </Space>
          </Col>
          <Col>
            <Title level={5} style={{ marginTop: 0 }}>
              Дополнительные:
            </Title>
            {extra.map((ex) => (
              <Row key={`ex${ex.id}`}>
                <Text>{`${ex.title}${ex.single ? '*' : ''}: ${
                  ex.singlePrice
                } UZS`}</Text>
                <EditOutlined
                  style={{ marginLeft: '3px' }}
                  onClick={() => showModal(ex)}
                />
                <DeleteOutlined
                  style={{ marginLeft: '3px' }}
                  onClick={() => handleDelete(ex.id)}
                />
              </Row>
            ))}
          </Col>
        </Row>
      </Card>
      <div style={{ height: '40px' }}></div>

      <Modal
        title="Изменение услуги:"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          name="price"
          onChange={handleChangePrice}
          style={{ width: 450, marginBottom: 10 }}
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

      <Modal
        title="Cоздать услугу:"
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
            <Input
              allowClear
              // name="title"
              placeholder="Введите название услуги!"
              // value={inputsCreate.title}
              // onChange={handleInputsCreate}
            />
          </Form.Item>

          <Form.Item
            name="price"
            rules={[{ required: true, message: 'Введите цену!' }]}
          >
            <Input
              allowClear
              // name="price"
              placeholder="Введите цену:"
              // value={inputsCreate.price}
              // onChange={handleInputsCreate}
            />
          </Form.Item>

          <Form.Item name="singleImp" valuePropName="checked">
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
