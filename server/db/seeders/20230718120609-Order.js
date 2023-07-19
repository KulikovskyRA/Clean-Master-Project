'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Orders',
      [
        {
          info: 'Не использовать хлорку',
          address: 'Шота Руставели 45, кв. 8',
          cleaningTime: Sequelize.DataTypes.NOW().toString(),
          user_id: 1,
          cleaner_id: 3,
          price: 249000,
          done: false,
          rating: 0,
          createdAt: Sequelize.DataTypes.NOW().toString(),
          updatedAt: Sequelize.DataTypes.NOW().toString(),
        },
        {
          info: 'Подъезд 6, 2 этаж',
          address: 'ул. Ракат 17, кв. 57',
          cleaningTime: Sequelize.DataTypes.NOW().toString(),
          user_id: 2,
          cleaner_id: 3,
          price: 299000,
          done: false,
          rating: 0,
          createdAt: Sequelize.DataTypes.NOW().toString(),
          updatedAt: Sequelize.DataTypes.NOW().toString(),
        },
        {
          info: 'Собака не кусается',
          address: 'ул. Атнагулова 23, кв. 8',
          cleaningTime: Sequelize.DataTypes.NOW().toString(),
          user_id: 1,
          cleaner_id: 3,
          price: 299000,
          done: false,
          rating: 0,
          createdAt: Sequelize.DataTypes.NOW().toString(),
          updatedAt: Sequelize.DataTypes.NOW().toString(),
        },
        {
          info: 'Пожалуйста не звоните в звонок, ребенок спит',
          address: 'ул. Образцова 7, кв. 45',
          cleaningTime: Sequelize.DataTypes.NOW().toString(),
          user_id: 1,
          cleaner_id: undefined,
          price: 349000,
          done: false,
          rating: 0,
          createdAt: Sequelize.DataTypes.NOW().toString(),
          updatedAt: Sequelize.DataTypes.NOW().toString(),
        },
        {
          info: '',
          address: 'ул. Дочкина 48, кв. 131',
          cleaningTime: Sequelize.DataTypes.NOW().toString(),
          user_id: 1,
          cleaner_id: undefined,
          price: 299000,
          done: false,
          rating: 0,
          createdAt: Sequelize.DataTypes.NOW().toString(),
          updatedAt: Sequelize.DataTypes.NOW().toString(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Orders', null, {});
  },
};
