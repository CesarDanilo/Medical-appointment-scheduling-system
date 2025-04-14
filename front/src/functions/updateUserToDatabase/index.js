import axios from "axios";

const updateUserToDatabase = async (userId, data) => {
    const url = "http://localhost:3001/user/"
    try {
        const response = await axios.put(`${url}/${userId}`, data);
        return response.status;
    } catch (error) {
        return error;
    }
}

export default updateUserToDatabase;