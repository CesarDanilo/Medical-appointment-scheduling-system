const { Remainders } = require("../../database/models");
const { Op } = require("sequelize");

const remaindersControllers = async (req, res) => {
    try {
        const { id } = req.query;
        const where = {};

        // CRIANDO UM WHARE PARA TRAZER POR ID
        if (id) {
            where.id = {
                [Op.eq]: id
            }
        }

        const result = await Remainders.findAll({
            where,
            attributes: ["id", "appointment_id", "sent_at", "reminder_type", "createdAt", "updatedAt"]
        });

        return res.status(200).json({ data: result });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = remaindersControllers;