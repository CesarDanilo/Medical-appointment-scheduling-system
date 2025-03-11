'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Reminders extends Model {
        static associate(models) {
            // Reminders.hasMany(models.Pedido, { foreignKey: 'usuario_id' });
        }
    }
    Reminders.init({
        id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        appointment_id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            references: {
                model: 'appointments',
                key: 'id'
            }
        },
        sent_at: {
            type: DataTypes.TIME,
            allowNull: false
        },
        reminder_type: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    }, {
        sequelize,
        modelName: 'Reminders',
        tableName: 'reminders',
        timestamps: true // Habilita o gerenciamento automático de createdAt e updatedAt
    });

    return Reminders;
};