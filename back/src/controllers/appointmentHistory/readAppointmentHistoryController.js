const { AppointmentHistory } = require("../../database/models");  // Importa o modelo 'AppointmentHistory' para interagir com a tabela 'AppointmentHistory'
const { Op } = require("sequelize");  // Importa o operador 'Op' do Sequelize para realizar operações de comparação

// Função para buscar agendamentos de médicos com base em filtros
const AppointmentHistoryControllers = async (req, res) => {
    try {
        const { id } = req.query;  // Desestrutura os parâmetros 'id' e 'doc_id' da query string da requisição
        const where = {};  // Cria um objeto 'where' vazio que será usado para armazenar os filtros de busca

        // Verifica se foi passado o parâmetro 'id' na query e adiciona ao filtro 'where'
        if (id) {
            where.id = {
                [Op.eq]: id  // O operador 'Op.eq' compara se o 'id' é igual ao valor fornecido
            };
        }

        // Realiza a consulta no banco de dados usando os filtros de 'where' criados
        const result = await AppointmentHistory.findAll({
            where,  // Aplica os filtros de busca
            attributes: ["id", "appointment_id", "diagnosis", "prescription", "createdAt", "updatedAt"]  // Define quais atributos (colunas) do agendamento devem ser retornados
        });

        // Retorna os resultados encontrados com status 200
        return res.status(200).json({ data: result });
    } catch (error) {
        // Se ocorrer algum erro, retorna uma resposta com status 400 e a mensagem de erro
        return res.status(400).json({ error: error.message });
    }
};

module.exports = AppointmentHistoryControllers;  // Exporta a função para ser usada em outros lugares
