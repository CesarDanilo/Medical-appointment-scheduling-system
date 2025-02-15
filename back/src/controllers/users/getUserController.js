const { Users } = require("../../database/models");

const userControllers = async (req, res) => {
    try {
        const result = await Users.findAll({
            attributes: ["id", "name", "email", "password", "role", "createdAt", "updatedAt"] // Corrigido "atributes" para "attributes"
        });
        return res.status(200).json({ data: result }); // Corrigido "res.json" para "json"
    } catch (error) {
        return res.status(400).json({ error: error.message }); // Corrigido "erro" para "error" (boa prática)
    }
};

module.exports = userControllers;