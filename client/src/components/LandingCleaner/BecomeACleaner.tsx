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
        description: 'Рассажите немного о себе и оставьте контактный номер телефона',
        status: 'process',
      },
      {
        title: 'Пройдите тренинг',
        description: 'Выберите время для визита в офис и пройдите инструктаж',
        status: 'process',
      },
      {
        title: 'Принимайте заказы',
        description: 'Вы готовы! Управляйте своими заказами самостоятельно в личном кабинете',
        status: 'process',
      },
    ]}
  />
  )
}
