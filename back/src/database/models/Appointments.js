'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Appointments extends Model {
        static associate(models) {
            // Appointments.hasMany(models.Pedido, { foreignKey: 'usuario_id' });
        }
    }
    Appointments.init({
        id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        patient_id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            references: {
                model: 'patients',
                key: 'id'
            }
        },
        schedule_id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            references: {
                model: 'schedules',
                key: 'id'
            }
        },
        status: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        notes: {
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
        modelName: 'Appointments',
        tableName: 'appointments',
        timestamps: true // Habilita o gerenciamento automático de createdAt e updatedAt
    });

    return Appointments;
};