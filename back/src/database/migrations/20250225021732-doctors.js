'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    'doctors', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      }
    }

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');

  }
};
