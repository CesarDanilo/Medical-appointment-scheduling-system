'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Payments extends Model {
        static associate(models) {
            // Doctors.hasMany(models.Pedido, { foreignKey: 'usuario_id' });
        }
    }
    Payments.init({
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
                model: 'appointment',
                key: 'id'
            }
        },
        amout: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        payment_method: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        status: {
            type: DataTypes.STRING(250),
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
        modelName: 'Payments',
        tableName: 'payments',
        timestamps: true // Habilita o gerenciamento automático de createdAt e updatedAt
    });

    return Payments;
};