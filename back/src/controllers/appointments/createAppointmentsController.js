const { v4: uuidv4 } = require('uuid');  // Importa a função v4 para gerar UUIDs
const { Patients, Schedules, Appointments } = require("../../database/models");

const createAppointments = async (req, res, next) => {

    try {
        const data = req.body;

        // Verificação de campos obrigatórios
        if (!data.patient_id || !data.schedule_id || !data.status, !data.notes) {
            return res.status(400).json({
                msg: "Não foi possível gravar! Todos os campos obrigatórios (user_id, specialty, bio) precisam ser preenchidos.",
                data: req.body  // Enviando o conteúdo dos dados recebidos
            });
        }

        let result;

        let patients = await Patients.findByPk(data.patient_id);
        let schedule = await Schedules.findByPk(data.schedule_id);

        if (!patients) {
            return res.status(400).send(`Patients inserido não existe na base de dados! id: ${data.patients_id}`);
        }
        if (!schedule) {
            return res.status(400).send(`schedule inserido não existe na base de dados! id: ${data.schedule_id}`);
        }

        // Gerar UUID para o id do médico
        const appointmentsId = uuidv4();
        data.id = appointmentsId;  // Atribui o UUID ao campo 'id'

        try {
            result = await Appointments.create(data);  // Cria o médico com o id gerado
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

module.exports = createAppointments;
