'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Patients extends Model {
        static associate(models) {
            // Doctors.hasMany(models.Pedido, { foreignKey: 'usuario_id' });
        }
    }
    Patients.init({
        id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        date_for_birth: {
            type: DataTypes.DATE,
            allowNull: false
        },
        gender: {
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
        modelName: 'Patients',
        tableName: 'patients',
        timestamps: true // Habilita o gerenciamento automático de createdAt e updatedAt
    });

    return Patients;
};