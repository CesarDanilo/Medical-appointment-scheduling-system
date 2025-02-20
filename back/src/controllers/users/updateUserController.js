const { Users } = require("../../database/models");

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        let result = await Users.findByPk(id);

        if (!result) { return res.status(400).send(`Usuario não foi encontrado!`) }

        try {
            await Users.update(data, { where: { id } });
        } catch (error) { return res.status(400).send(`Não foi possivel atulizar: ${error}`) };

        result = await Users.findByPk(id);
        return res.status(200).json({ msg: `GRAVADO COM SÚCESSO!`, dados: result.dataValues });

    } catch (error) { return res.status(400).send(`Não foi possivel fazer o processo: ${error}`) }
}

module.exports = updateUser;