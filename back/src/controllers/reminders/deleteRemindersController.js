const { Reminders } = require("../../database/models");

const deleteReminders = async (req, res) => {
    const { id } = req.params;

    try {
        let result = await Reminders.findByPk(id);

        if (!result) { return res.status(500).send(`Reminders não encontrado com id ${id}`); }

        try {
            await Reminders.destroy({ where: { id } });
        } catch (error) { res.status(400).send(`Não foi possível deletar o Reminders: ${error}`) }

        return res.status(200).send(`Item deletado com súcesso! id: ${id}`);
    } catch (error) { res.status(400).send(`Não foi possível fazer a operação: ${error}`) }
}

module.exports = deleteReminders;