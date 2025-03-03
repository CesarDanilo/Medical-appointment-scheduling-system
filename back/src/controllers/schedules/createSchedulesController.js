const { v4: uuidv4 } = require('uuid');  // Importa a função v4 para gerar UUIDs
const { Doctor, Schedules } = require("../../database/models");

const createSchedules = async (req, res, next) => {

    try {
        const data = req.body;

        // Verificação de campos obrigatórios
        if (!data.doctor_id || !data.start_time || !data.end_time || !data.is_available) {
            return res.status(400).json({
                msg: "Não foi possível gravar! Todos os campos obrigatórios (user_id, specialty, bio) precisam ser preenchidos.",
                data: req.body  // Enviando o conteúdo dos dados recebidos
            });
        }

        let result;

        // Usuário que vai ser relacionado como médico, se existe
        let doctor_id = await Doctor.findByPk(data.user_id);

        // Validando se o usuário existe ou não
        if (!doctor_id) {
            return res.status(400).send(`Usuário inserido não existe na base de dados! id: ${data.user_id}`);
        }

        // Gerar UUID para o id do médico
        const doctorId = uuidv4();
        data.id = doctorId;  // Atribui o UUID ao campo 'id'

        try {
            result = await Schedules.create(data);  // Cria o médico com o id gerado
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

module.exports = createSchedules;
