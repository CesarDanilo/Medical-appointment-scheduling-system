import axios from "axios";

const API_BASE_URL = "http://localhost:3001/user";

const handleDeleteUser = async (userId) => {
    try {
        if (!userId) {
            throw new Error("ID do usuário não fornecido");
        }

        const response = await axios.delete(`${API_BASE_URL}/${userId}`);

        if (response.status === 200) {
            return { success: true, message: "Usuário deletado com sucesso!" };
        }

        throw new Error(`Erro ao deletar usuário: Status ${response.status}`);
    } catch (error) {
        console.error("Erro na função handleDeleteUser:", error);

        return {
            success: false,
            message: error.response?.data?.message ||
                error.message ||
                "Erro desconhecido ao deletar usuário",
            error: error.response?.data || error
        };
    }
};

export default handleDeleteUser;