const { v4: uuidv4 } = require('uuid');
const { Appointment, AppointmentHistory } = require("../../database/models");

const createAppointmentHistory = async (req, res, next) => {
    try {
        const data = req.body;

        // Verificação de campos obrigatórios
        const requiredFields = ['appointment_id', 'diagnosis', 'prescription'];
        const missingFields = requiredFields.filter(field => !data[field]);

        if (missingFields.length > 0) {
            return res.status(400).json({
                msg: `Não foi possível gravar! Os seguintes campos obrigatórios precisam ser preenchidos: ${missingFields.join(', ')}`,
                data: req.body
            });
        }

        // Verifica se o appointment_id existe na base de dados
        const appointment = await Appointment.findByPk(data.appointment_id);

        if (!appointment) {
            return res.status(400).json({
                msg: `O agendamento inserido não existe na base de dados! id: ${data.appointment_id}`
            });
        }

        // Gerar UUID para o id do histórico de agendamento
        const appointmentHistoryId = uuidv4();
        data.id = appointmentHistoryId;

        // Tenta criar o histórico de agendamento
        let result;
        try {
            result = await AppointmentHistory.create(data);
        } catch (error) {
            return res.status(400).json({
                msg: "Não foi possível gravar o histórico de agendamento!",
                error: error.message
            });
        }

        return res.status(200).json({
            msg: "Histórico de agendamento gravado com sucesso!",
            data: result.dataValues
        });

    } catch (error) {
        return res.status(500).json({
            msg: "Erro interno no servidor",
            error: error.message
        });
    }
}

module.exports = createAppointmentHistory;