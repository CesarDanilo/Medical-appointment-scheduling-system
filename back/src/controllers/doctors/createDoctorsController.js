const { Doctors } = require("../../database/models");

const createDoctors = async (req, res, next) => {

    try {
        const data = req.body;

        // Verificação de campos obrigatórios
        if (!data.user_id || !data.specialty || !data.bio) {
            return res.status(400).json({
                msg: "Não foi possível gravar! Todos os campos obrigatórios (name, email, password, role) precisam ser preenchidos.",
                data: req.body  // Enviando o conteúdo dos dados recebidos
            });
        }
        
        let result;

        try {
            let doctors_id = await Doctors.findByPk(data.user_id);

            if (!doctors_id) {
                res.status(400).send(`usuario inserido não existe na base de dados! ${data.user_id}`)
            }

            result = await Doctors.create(data);
        } catch (error) {
            const msg = "Não foi possível tentar gravar!";
            const erro = error?.message;
            return res.status(400).json({ msg, erro });
        }

        // Resposta com sucesso
        return res.status(200).json({ msg: "GRAVADO COM SUCESSO", data: result.dataValues });

    } catch (error) {
        return res.status(400).send(`Não foi possível fazer a operação: ${error}`);
    }
}

module.exports = createDoctors;
