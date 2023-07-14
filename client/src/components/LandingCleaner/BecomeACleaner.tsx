import { Steps } from 'antd'
import React from 'react'

export default function BecomeACleaner() {
  return (
    <Steps
    direction="horizontal"
    current={0}
    items={[
      {
        title: 'Заполните анкету',
        description: 'рассажите немного о себе и оставьте контактный номер телефона',
        status: 'process',
      },
      {
        title: 'Пройдите тренинг',
        description: 'выберите время для визита в офис и пройдите инструктаж',
        status: 'process',
      },
      {
        title: 'Принимайте заказы',
        description: 'управляйте своими уборками самостоятельно в личном кабинете',
        status: 'process',
      },
    ]}
  />
  )
}
