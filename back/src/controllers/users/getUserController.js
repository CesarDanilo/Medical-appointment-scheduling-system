const { Users } = require("../../database/models");
const { Op } = require("sequelize");

const userControllers = async (req, res) => {
    try {
        const { name } = req.query;
        const where = {};

        // CRIANDO UM WHARE PARA TRAZER POR NOME
        if (name) {
            where.name = {
                [Op.iLike]: `%${name}%`
            }
        }

        const result = await Users.findAll({
            where,
            attributes: ["id", "name", "email", "password", "role", "createdAt", "updatedAt"]
        });

        return res.status(200).json({ data: result });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = userControllers;