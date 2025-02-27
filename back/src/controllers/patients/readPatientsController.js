const { Patients } = require("../../database/models");
const { Op } = require("sequelize");

const PatientsControllers = async (req, res) => {
    try {
        const { id } = req.query;
        const where = {};

        // CRIANDO UM WHARE PARA TRAZER POR ID
        if (id) {
            where.id = {
                [Op.eq]: id
            }
        }

        const result = await Patients.findAll({
            where,
            attributes: ["id", "user_id", "date_for_birth", "gender", "createdAt", "updatedAt"]
        });

        return res.status(200).json({ data: result });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = PatientsControllers;