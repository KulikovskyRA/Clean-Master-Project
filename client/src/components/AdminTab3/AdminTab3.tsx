import React from 'react';

import { Button, Space, Descriptions, Card, Col, Row } from 'antd';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';

const dbCleaners = [
  {
    id: 1,
    email: 'abiba@gamil.com',
    name: 'Abiba',
    surname: 'Abibova',
    patrname: 'Abibovna',
    birthdate: new Date('2023-07-08 10:51:49.612 +0300'),
    phoneNumber: 89289289289,
    password: 'Abibaword',
    residency: 'Uzbek',
    likesAnimals: true,
  },
  {
    id: 12,
    email: 'ab0ba@gamil.com',
    name: 'Ab0ba',
    surname: 'Ab0bova',
    patrname: 'Ab0bovna',
    birthdate: new Date('2023-07-08 10:51:49.612 +0300'),
    phoneNumber: 83223223220,
    password: 'Ab0baword',
    residency: 'Uzbek',
    likesAnimals: false,
  },
  {
    id: 13,
    email: '12345@gamil.com',
    name: '12345',
    surname: '12345va',
    patrname: '12345vna',
    birthdate: new Date('2023-07-08 10:51:49.612 +0300'),
    phoneNumber: 82282282288,
    password: '12345word',
    residency: 'Uzbek',
    likesAnimals: true,
  },
];

const AdminTab3 = () => {
  const [cleaners, setCleaners] = useState([]);

  useEffect(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      (async function (): Promise<void> {
        const resCleanerList: Response = await fetch(
          import.meta.env.VITE_URL + 'cleaner',
          {
            credentials: 'include',
          }
        );

        if (resCleanerList.ok) {
          const resultCL = await resCleanerList.json();
          console.log(resultCL);
          setCleaners(resultCL);
        }
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      {dbCleaners.map((cleaner) => (
        <Card
          key={`cleaner${cleaner.id}`}
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
              <p>{`Резиденство: ${cleaner.residency}`}</p>
            </Col>

            <Col span={5}>
              <p>
                Работает с питомцами: {cleaner.likesAnimals ? ' Да' : ' Нет'}
              </p>
            </Col>
            <Col>
              <p>Рейтинг: (берется с заказов)</p>
            </Col>
          </Row>
        </Card>
      ))}
    </>
  );
};

export default AdminTab3;
