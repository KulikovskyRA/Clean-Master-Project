import { Typography, Card, Row } from 'antd';
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
        marginLeft: '30%',
        marginRight: '30%',
      }}
    >
      <Row>
        <Text>{`Общее количество заказов: ${data.allNumber}`}</Text>
      </Row>
      <Row>
        <Text>{`Количество выполненных заказов: ${data.doneNumber}`}</Text>
      </Row>

      <Row>
        <Text>{`Оборот: ${data.oborot}`}</Text>
      </Row>
      <Row>
        <Text>{`Выплаты клинерам: ${data.cleanerSalary}`}</Text>
      </Row>
      <Row>
        <Text>{`Чистая прибыль: ${data.money}`}</Text>
      </Row>
    </Card>
  );
};

export default StatCard;
