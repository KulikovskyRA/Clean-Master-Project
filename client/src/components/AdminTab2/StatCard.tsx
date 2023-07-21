import { Typography, Card, Row, Col } from 'antd';
const { Title, Text } = Typography;
import { useState, useEffect } from 'react';

const StatCard = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      (async function (): Promise<void> {
        const response: Response = await fetch(
          import.meta.env.VITE_URL + 'order/tab2',
          {
            credentials: 'include',
          }
        );
        if (response.ok) {
          const result = await response.json();
          setData(result);
        }
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <Card
      title="Данные по заказам:"
      style={{
        marginLeft: '26%',
        marginRight: '26%',
      }}
    >
      <Row>
        <Col span={10}>
          <Row>
            <Text strong>{`Общее количество заказов:\u00A0`}</Text>
            <Text>{`${data.allNumber}`}</Text>
          </Row>
          <Row>
            <Text strong>{`Количество выполненных заказов:\u00A0`}</Text>
            <Text>{`${data.doneNumber}`}</Text>
          </Row>
        </Col>
        <Col span={10}>
          <Row>
            <Text strong>{`Оборот:\u00A0`}</Text>
            <Text>{`${data.oborot} UZS`}</Text>
          </Row>
          <Row>
            <Text strong>{`Выплаты клинерам:\u00A0`}</Text>
            <Text>{`${data.cleanerSalary} UZS`}</Text>
            <Title level={5}>{`Чистая прибыль: ${data.money} UZS`}</Title>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default StatCard;
