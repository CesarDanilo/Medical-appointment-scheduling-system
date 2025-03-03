const { Schedules } = require("../../database/models");
const { Op } = require("sequelize");

const schedulesControllers = async (req, res) => {
    try {
        const { id } = req.query;
        const where = {};

        // CRIANDO UM WHARE PARA TRAZER POR ID
        if (id) {
            where.id = {
                [Op.eq]: id
            }
        }

        const result = await Schedules.findAll({
            where,
            attributes: ["id", "doctor_id", "start_time", "end_time", "is_available", "createdAt", "updatedAt"]
        });

        return res.status(200).json({ data: result });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = schedulesControllers;