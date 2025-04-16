const { Users } = require("../../database/models");
const { v4: uuidv4 } = require("uuid");

const createUser = async (req, res, next) => {

    try {
        const data = req.body;

        // Verificação de campos obrigatórios
        if (!data.name || !data.email || !data.password || !data.cpf || !data.role) {
            return res.status(400).json({
                msg: "Não foi possível gravar! Todos os campos obrigatórios (name, email, password, role) precisam ser preenchidos.",
                data: req.body  // Enviando o conteúdo dos dados recebidos
            });
        }

        const userId = uuidv4();
        data.id = userId;

        let result;

        try {
            // Tentando criar o usuário no banco de dados
            result = await Users.create(data);
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

module.exports = createUser;
