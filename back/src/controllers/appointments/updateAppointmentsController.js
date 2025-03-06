const { Appointments } = require("../../database/models");

const updateAppointments = async (req, res, next) => {
    const { id } = req.params;

    try {
        const dados = req.body;

        // Tentar encontrar o usuário pelo id
        let result = await Appointments.findByPk(id);

        // Se o usuário não for encontrado, retornar erro
        if (!result) {
            return res.status(404).send(`Usuário não foi encontrado!`);
        }

        try {
            await Appointments.update(dados, { where: { id } });
        } catch (error) {
            const msg = 'Erro ao tentar Gravar!';
            const erro = error?.message;
            return res.status(400).json({ msg, erro });
        }

        result = await Appointments.findByPk(id);

        // Retornar sucesso com os dados atualizados
        return res.status(200).json({
            msg: "GRAVADO COM SUCESSO!",
            data: result.dataValues
        });

    } catch (error) {
        return res.status(400).send(`Não foi possível fazer o processo: ${error.message}`);
    }
}

module.exports = updateAppointments;
