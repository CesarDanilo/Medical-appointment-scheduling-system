'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Doctors extends Model {
        static associate(models) {
            // Doctors.hasMany(models.Pedido, { foreignKey: 'usuario_id' });
        }
    }

    Doctors.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        specialty: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        bio: {
            type: DataTypes.STRING(255),
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
        modelName: 'Doctors',
        tableName: 'doctors',
        timestamps: true // Habilita o gerenciamento automático de createdAt e updatedAt
    });

    return Doctors;
};