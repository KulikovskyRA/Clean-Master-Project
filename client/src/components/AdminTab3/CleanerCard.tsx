import { Card, Col, Row, Typography } from 'antd';
const { Text } = Typography;
import { useState, useEffect } from 'react';

export default function CleanerCard({ cleaner }) {
  const [totalRating, setTotalRating] = useState(0);
  useEffect(() => {
    let count = 0;
    let divider = 0;

    const ordersDone = cleaner.Orders.filter((el) => el.rating !== null);
    console.log(ordersDone);

    ordersDone.forEach((el) => {
      count += el.rating;
    });

    let totalRating;
    if (!ordersDone.length) {
      totalRating = 0;
    } else {
      totalRating = count / ordersDone.length;
    }

    setTotalRating(totalRating);
  }, []);

  return (
    <Card
      size="small"
      style={{
        marginLeft: '10%',
        textAlign: 'start',
        marginRight: '10%',
        marginBottom: '10px',
        paddingLeft: '1%',
      }}
    >
      <Row>
        <Col span={2}>
          <Text strong>{`id:\u00A0`}</Text>
          <Text>{`${cleaner.id}`}</Text>
        </Col>
        <Col span={7}>
          <Text>{`${cleaner.surname} ${cleaner.name} ${cleaner.patrname}`}</Text>
        </Col>

        <Col span={3}>
          <Text>{`${cleaner.phoneNumber}`}</Text>
        </Col>

        <Col span={5}>
          <Text strong>{`Гражданство:\u00A0`} </Text>
          <Text>{`${cleaner.nation}`}</Text>
        </Col>

        <Col span={5}>
          <Text strong>{`Работает с питомцами:\u00A0`}</Text>
          <Text>{cleaner.pets ? ' Да' : ' Нет'}</Text>
        </Col>
        <Col>
          <Text strong>{`Рейтинг:\u00A0`}</Text>
          <Text>{`${totalRating}`}</Text>
        </Col>
      </Row>
    </Card>
  );
}
