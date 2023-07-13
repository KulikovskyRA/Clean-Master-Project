import { Row, Col } from 'antd'
import React from 'react'

export default function WeOffer() {
  return (
    <Row gutter={[16, 16]}>
    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
        <div>
          <h2>Быстрый доход</h2>
          <p>Вы получаете заработанные деньги за выполнение заказа сразу после окончания уборки</p>
        </div>
      </Col>
      <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
      <div>
          <h2>Удобное расписание</h2>
          <p>Работайте в удобные для вас дни и время, берите только те заказы, которые готовы выполнить </p>
        </div>
      </Col>
      <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
      <div>
          <h2>Много заказов</h2>
          <p>У нас более 10 тысяч активных клиентов, поэтому всегда есть заказы </p>
        </div>
      </Col>
    </Row>
  )
}
