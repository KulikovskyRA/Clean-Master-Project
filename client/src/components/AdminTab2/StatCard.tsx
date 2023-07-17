import { Typography, Card } from 'antd';
const { Title } = Typography;
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
    <Card>
      <Title level={5}>{`Общее количество заказов: ${data.allNumber}`}</Title>
      <Title
        level={5}
      >{`Количество выполненных заказов: ${data.doneNumber}`}</Title>
      <Title level={5}>{`Оборот: ${data.oborot}`}</Title>
      <Title level={5}>{`Выплаты клинерам: ${data.cleanerSalary}`}</Title>
      <Title level={4}>{`Чистая прибыль: ${data.money}`}</Title>
    </Card>
  );
};

export default StatCard;
