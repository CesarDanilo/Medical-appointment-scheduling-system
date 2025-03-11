'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'payments', {

      id: {
        type: Sequelize.STRING(255),
        allowNull: false,
        primaryKey: true
      },
      appointment_id: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      amout: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      payment_method: {
        type: Sequelize.STRING(250),
        allowNull: false
      },
      status: {
        type: Sequelize.STRING(250),
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
    await queryInterface.dropTable('payments');

  }
};
