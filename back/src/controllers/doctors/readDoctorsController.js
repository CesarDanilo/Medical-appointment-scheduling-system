const { Doctors } = require("../../database/models");
const { Op } = require("sequelize");

const doctorsControllers = async (req, res) => {
    try {
        const { id } = req.query;
        const where = {};

        // CRIANDO UM WHARE PARA TRAZER POR ID
        if (id) {
            where.id = {
                [Op.eq]: id
            }
        }

        const result = await Doctors.findAll({
            where,
            attributes: ["id", "user_id", "specialty", "bio", "createdAt", "updatedAt"]
        });

        return res.status(200).json({ data: result });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = doctorsControllers;