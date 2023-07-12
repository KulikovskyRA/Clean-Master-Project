'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      'Admins',
      [
        {
          email: 'adminboba@biba.ru',
          password:
            '$2b$10$ZVPQs5Yfp6Xlq4dBiNYwQe8hGB62PKwIz0VWd1yuxi5qbAqanTanm',
          adminName: 'adminboba',
          createdAt: Sequelize.DataTypes.NOW().toString(),
          updatedAt: Sequelize.DataTypes.NOW().toString(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Admins', null, {});
  },
};
