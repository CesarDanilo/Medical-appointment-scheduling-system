'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'reminders', {

      id: {
        type: Sequelize.STRING(255),
        allowNull: false,
        primaryKey: true
      },
      appointment_id: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      sent_at: {
        type: Sequelize.TIME,
        allowNull: false
      },
      reminder_type: {
        type: Sequelize.STRING(100),
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
    await queryInterface.dropTable('reminders');
  }
};
