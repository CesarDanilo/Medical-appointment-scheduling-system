const { Users } = require("../../database/models");

const createUser = async (req, res) => {
    try {
        const data = req.body;
        let result;

        try {
            result = await Users.create(data);
        } catch (error) {
            const msg = "não foi possivel tentar gravar!";
            const erro = error?.message;
            return res.status(400).json({ msg, erro })
        }

        return res.status(200).json({ msg: "GRAVADO COM SÚCESSO", data: result.dataValues });

    } catch (error) {
        return res.status(400).send(`Não foi possivel fazer a operação: ${error}`)
    }
}

module.exports = createUser;