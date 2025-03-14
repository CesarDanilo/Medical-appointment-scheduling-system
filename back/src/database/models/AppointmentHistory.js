'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class AppointmentHistory extends Model {
        static associate(models) {
            // AppointmentHistory.hasMany(models.Pedido, { foreignKey: 'usuario_id' });
        }
    }
    AppointmentHistory.init({
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
        diagnosis: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        prescription: {
            type: DataTypes.TEXT,
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
        modelName: 'AppointmentHistory',
        tableName: 'appointmentHistory',
        timestamps: true // Habilita o gerenciamento automático de createdAt e updatedAt
    });

    return AppointmentHistory;
};