const { Users } = require("../../database/models");

const userControllers = async (req, res) => {
    try {
        const result = await Users.findAll({
            atributes: ["id", "name", "email", "password", "role", "createdAt", "updatedAt"]
        });
        return res.status(200).res.json({ data: result });
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
}

module.exports = userControllers;