const { Patients } = require("../../database/models");

const deletePatients = async (req, res) => {
    const { id } = req.params;

    try {
        let result = await Patients.findByPk(id);

        if (!result) { return res.status(500).send(`Patients não encontrado com id ${id}`); }

        try {
            await Patients.destroy({ where: { id } });
        } catch (error) { res.status(400).send(`Não foi possível deletar o Patients: ${error}`) }

        return res.status(200).send(`Item deletado com súcesso! id: ${id}`);
    } catch (error) { res.status(400).send(`Não foi possível fazer a operação: ${error}`) }
}

module.exports = deletePatients;