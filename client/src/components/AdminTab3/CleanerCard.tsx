import React from 'react';
import { Button, Space, Descriptions, Card, Col, Row } from 'antd';
import { useState, useEffect } from 'react';

export default function CleanerCard({ cleaner }) {
  const [totalRating, setTotalRating] = useState(0);
  useEffect(() => {
    let count = 0;
    let divider = 0;
    cleaner.Orders.forEach((el) => {
      count += el.rating;
      divider += 1;
    });

    let totalRating;
    if (divider === 0) {
      totalRating = 0;
    } else {
      totalRating = count / divider;
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
      }}
    >
      <Row>
        <Col span={2}>
          <p>{`id: ${cleaner.id}`}</p>
        </Col>
        <Col span={5}>
          <p>{`${cleaner.surname} ${cleaner.name} ${cleaner.patrname}`}</p>
        </Col>

        <Col span={3}>
          <p>{`${cleaner.phoneNumber}`}</p>
        </Col>

        <Col span={4}>
          <p>{`Резиденство: ${cleaner.nation}`}</p>
        </Col>

        <Col span={5}>
          <p>Работает с питомцами: {cleaner.pets ? ' Да' : ' Нет'}</p>
        </Col>
        <Col>
          <p>{`Рейтинг: ${totalRating}`}</p>
        </Col>
      </Row>
    </Card>
  );
}

// export default CleanerCard;
