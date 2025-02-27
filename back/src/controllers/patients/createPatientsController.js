const { Patients } = require("../../database/models");

const createPatients = async (req, res, next) => {

    try {
        const data = req.body;

        // Verificação de campos obrigatórios
        if (!data.user_id || !data.date_for_birth || !data.gender) {
            return res.status(400).json({
                msg: "Não foi possível gravar! Todos os campos obrigatórios (name, email, password, role) precisam ser preenchidos.",
                data: req.body  // Enviando o conteúdo dos dados recebidos
            });
        }

        let result;

        // Usuario que vai ser relacionado como medico se existe recebendo na variavel 
        let Patients_id = await Patients.findByPk(data.user_id);

        // Validando se usuarios existe ou não
        if (!Patients_id) { return res.status(400).send(`usuario inserido não existe na base de dados! id: ${data.user_id}`) }

        try {
            result = await Patients.create(data);
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

module.exports = createPatients;
