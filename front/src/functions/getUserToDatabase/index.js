import axios from "axios";

const getUserToDatabase = async (userId = 0) => {
    const url = "http://localhost:3001/user/"
    try {
        const response = await axios.get(`${url}/?id=${userId}`);
        return response.data;
    } catch (error) {
        return error;
    }
}

export default getUserToDatabase;