'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'appointments', {

      id: {
        type: Sequelize.STRING(255),
        allowNull: false,
        primaryKey: true
      },
      patient_id: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      schedule_id: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      status: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('appointments');
  }
};
