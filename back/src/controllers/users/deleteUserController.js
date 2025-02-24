const { Users } = require("../../database/models");

const deleteUser = async (req, res) => {
    const id = req.params;

    try {

    } catch (error) { res.status(400).send(`Não foi possível fazer a operação: ${error}`) }
}

module.exports = deleteUser;