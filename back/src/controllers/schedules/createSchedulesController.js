const { v4: uuidv4 } = require('uuid');  // Importa a função v4 para gerar UUIDs
const { Doctors, Schedules } = require("../../database/models");

const createSchedules = async (req, res, next) => {

    try {
        const data = req.body;

        // Verificação de campos obrigatórios
        if (!data.doctors_id || !data.start_time || !data.end_time || !data.is_available) {
            return res.status(400).json({
                msg: `Não foi possível gravar! Todos os campos obrigatórios  precisam ser preenchidos, ${data.doctors_id}, ${data.start_time}, ${data.end_time}, ${data.is_available}`,
                data: req.body  // Enviando o conteúdo dos dados recebidos
            });
        }

        let result;

        // Usuário que vai ser relacionado como médico, se existe
        let doctors_id = await Doctors.findByPk(data.doctors_id);

        // Validando se o usuário existe ou não
        if (!doctors_id) {
            return res.status(400).send(`Usuário inserido não existe na base de dados! id: ${data.user_id}`);
        }

        // Gerar UUID para o id do médico
        const doctorsId = uuidv4();
        data.id = doctorsId;  // Atribui o UUID ao campo 'id'

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
