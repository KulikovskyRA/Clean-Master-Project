'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Services',
      [
        {
          title: 'Количество комнат',
          singlePrice: 50000,
          default: true,
          single: false,
          createdAt: Sequelize.DataTypes.NOW().toString(),
          updatedAt: Sequelize.DataTypes.NOW().toString(),
        },
        {
          title: 'Количество санузлов',
          singlePrice: 30000,
          default: true,
          single: false,
          createdAt: Sequelize.DataTypes.NOW().toString(),
          updatedAt: Sequelize.DataTypes.NOW().toString(),
        },
        {
          title: 'Дома есть питомцы',
          singlePrice: 0,
          default: false,
          single: true,
          createdAt: Sequelize.DataTypes.NOW().toString(),
          updatedAt: Sequelize.DataTypes.NOW().toString(),
        },
        {
          title: 'Использовать гипоаллергенные средства',
          singlePrice: 20000,
          default: false,
          single: true,
          createdAt: Sequelize.DataTypes.NOW().toString(),
          updatedAt: Sequelize.DataTypes.NOW().toString(),
        },
        {
          title: 'Помыть окно (кол-во)',
          singlePrice: 25000,
          default: false,
          single: false,
          createdAt: Sequelize.DataTypes.NOW().toString(),
          updatedAt: Sequelize.DataTypes.NOW().toString(),
        },
        {
          title: 'Уборка балкона',
          singlePrice: 25000,
          default: false,
          single: true,
          createdAt: Sequelize.DataTypes.NOW().toString(),
          updatedAt: Sequelize.DataTypes.NOW().toString(),
        },
        {
          title: 'Помыть внутри холодильника',
          singlePrice: 15000,
          default: false,
          single: true,
          createdAt: Sequelize.DataTypes.NOW().toString(),
          updatedAt: Sequelize.DataTypes.NOW().toString(),
        },
        {
          title: 'Помыть духовку',
          singlePrice: 15000,
          default: false,
          single: true,
          createdAt: Sequelize.DataTypes.NOW().toString(),
          updatedAt: Sequelize.DataTypes.NOW().toString(),
        },
        {
          title: 'Помыть микроволновку',
          singlePrice: 10000,
          default: false,
          single: true,
          createdAt: Sequelize.DataTypes.NOW().toString(),
          updatedAt: Sequelize.DataTypes.NOW().toString(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Services', null, {});
  },
};
