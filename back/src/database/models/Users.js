'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Users extends Model {
        static associate(models) {
            // Users.hasMany(models.Pedido, { foreignKey: 'usuario_id' });
        }
    }
    Users.init({
        id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        cpf: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        role: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                isIn: [['paciente', 'médico', 'admin']]
            }
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    }, {
        sequelize,
        modelName: 'Users',
        tableName: 'users',
        timestamps: true // Habilita o gerenciamento automático de createdAt e updatedAt
    });

    return Users;
};