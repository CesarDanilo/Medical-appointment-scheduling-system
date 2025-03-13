const { Reminders, Appointments } = require("../../database/models");

const updateReminders = async (req, res, next) => {
    const { id } = req.params;

    try {
        const dados = req.body;

        // Verifica se o appointment_id está presente no corpo da requisição
        if (!dados.appointment_id) {
            return res.status(400).send("O campo 'appointment_id' é obrigatório.");
        }

        // Tentar encontrar o lembrete pelo id
        let reminder = await Reminders.findByPk(id);
        if (!reminder) {
            return res.status(404).send("Lembrete não encontrado!");
        }

        // Tentar encontrar o compromisso pelo appointment_id
        const appointment = await Appointments.findByPk(dados.appointment_id);
        if (!appointment) {
            return res.status(404).send("Compromisso não encontrado!");
        }

        // Atualizar o lembrete
        try {
            await Reminders.update(dados, { where: { id } });
        } catch (error) {
            const msg = 'Erro ao tentar gravar!';
            const erro = error?.message;
            return res.status(400).json({ msg, erro });
        }

        // Buscar o lembrete atualizado
        const updatedReminder = await Reminders.findByPk(id);

        // Retornar sucesso com os dados atualizados
        return res.status(200).json({
            msg: "GRAVADO COM SUCESSO!",
            data: updatedReminder.dataValues
        });

    } catch (error) {
        return res.status(400).send(`Não foi possível completar o processo: ${error.message}`);
    }
}

module.exports = updateReminders;