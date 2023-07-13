'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      info: {
        type: Sequelize.TEXT,
      },
      address: {
        type: Sequelize.STRING,
      },
      cleaningTime: {
        type: Sequelize.DATE,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Users',
          },
          key: 'id',
        },
        onDelete: 'cascade',
        allowNull: true,
      },
      cleaner_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Cleaners',
          },
          key: 'id',
        },
        onDelete: 'cascade',
        allowNull: true,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      done: {
        type: Sequelize.BOOLEAN,
      },
      rating: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  },
};
