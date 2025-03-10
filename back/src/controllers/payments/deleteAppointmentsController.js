const { Appointments } = require("../../database/models");

const deleteAppointments = async (req, res) => {
    const { id } = req.params;

    try {
        let result = await Appointments.findByPk(id);

        if (!result) { return res.status(500).send(`Doctor não encontrado com id ${id}`); }

        try {
            await Appointments.destroy({ where: { id } });
        } catch (error) { res.status(400).send(`Não foi possível deletar o Doctor: ${error}`) }

        return res.status(200).send(`Item deletado com súcesso! id: ${id}`);
    } catch (error) { res.status(400).send(`Não foi possível fazer a operação: ${error}`) }
}

module.exports = deleteAppointments;