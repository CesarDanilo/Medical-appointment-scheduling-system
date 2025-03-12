const { v4: uuidv4 } = require('uuid');  // Importa a função v4 para gerar UUIDs
const { Reminders, Appointments } = require("../../database/models");

const createReminders = async (req, res, next) => {

    try {
        const data = req.body;

        // Verificação de campos obrigatórios
        if (!data.appointments_id || !data.sent_at || !data.reminder_type) {
            return res.status(400).json({
                msg: "Não foi possível gravar! Todos os campos obrigatórios (user_id, specialty, bio) precisam ser preenchidos.",
                data: req.body  // Enviando o conteúdo dos dados recebidos
            });
        }

        let result;

        let appointments = await Appointments.findByPk(data.appointments_id);

        if (!appointments) {
            return res.status(400).send(`Appointments inserido não existe na base de dados! id: ${data.appointments_id}`);
        }
        // Gerar UUID para o id do médico
        const RemindersId = uuidv4();
        data.id = RemindersId;  // Atribui o UUID ao campo 'id'

        try {
            result = await Reminders.create(data);  // Cria o médico com o id gerado
        } catch (error) {
            const msg = "Não foi possível tentar gravar!";
            const erro = error?.message;
            return res.status(400).json({ msg, erro });
        }

        return res.status(200).json({ msg: "GRAVADO COM SUCESSO", data: result.dataValues });

    } catch (error) {
        return res.status(400).send(`Não foi possível fazer a operação: ${error}`);
    }
}

module.exports = createReminders;
