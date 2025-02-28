'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Schedules extends Model {
        static associate(models) {
            // Schedules.hasMany(models.Pedido, { foreignKey: 'usuario_id' });
        }
    }
    Schedules.init({
        id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        doctor_id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            references: {
                model: 'doctors',
                key: 'id'
            }
        },
        start_time: {
            type: DataTypes.TIME,
            allowNull: false
        },
        end_time: {
            type: DataTypes.TIME,
            allowNull: false
        },
        is_available: {
            type: DataTypes.BOOLEAN,
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
        modelName: 'Schedules',
        tableName: 'schedules',
        timestamps: true // Habilita o gerenciamento automático de createdAt e updatedAt
    });

    return Schedules;
};