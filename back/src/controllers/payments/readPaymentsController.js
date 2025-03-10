const { Appointments } = require("../../database/models");
const { Op } = require("sequelize");

const appointmentsControllers = async (req, res) => {
    try {
        const { id } = req.query;
        const where = {};

        // CRIANDO UM WHARE PARA TRAZER POR ID
        if (id) {
            where.id = {
                [Op.eq]: id
            }
        }

        const result = await Appointments.findAll({
            where,
            attributes: ["id", "patient_id", "schedule_id", "status", "createdAt", "notes", "updatedAt"]
        });

        return res.status(200).json({ data: result });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = appointmentsControllers;