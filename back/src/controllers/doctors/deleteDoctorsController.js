const { Doctors } = require("../../database/models");

const deleteDoctors = async (req, res) => {
    const { id } = req.params;

    try {
        let result = await Doctors.findByPk(id);

        if (!result) { return res.status(500).send(`Usuario não encontrado com id ${id}`); }

        try {
            await Doctors.destroy({ where: { id } });
        } catch (error) { res.status(400).send(`Não foi possível deletar o usuario: ${error}`) }

        return res.status(200).send(`Item deletado com súcesso! id: ${id}`);
    } catch (error) { res.status(400).send(`Não foi possível fazer a operação: ${error}`) }
}

module.exports = deleteDoctors;