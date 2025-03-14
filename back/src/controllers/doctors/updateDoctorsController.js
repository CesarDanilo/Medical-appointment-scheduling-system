const { Doctors } = require("../../database/models");

const updateDoctors = async (req, res, next) => {
    const { id } = req.params;

    try {
        const dados = req.body;

        // Tentar encontrar o usuário pelo id
        let result = await Doctors.findByPk(id);

        // Se o usuário não for encontrado, retornar erro
        if (!result) {
            return res.status(404).send(`Usuário não foi encontrado!`);
        }

        try {
            await Doctors.update(dados, { where: { id } });
        } catch (error) {
            const msg = 'Erro ao tentar Gravar!';
            const erro = error?.message;
            return res.status(400).json({ msg, erro });
        }

        result = await Doctors.findByPk(id);

        // Retornar sucesso com os dados atualizados
        return res.status(200).json({
            msg: "GRAVADO COM SUCESSO!",
            data: result.dataValues
        });

    } catch (error) {
        return res.status(400).send(`Não foi possível fazer o processo: ${error.message}`);
    }
}

module.exports = updateDoctors;
