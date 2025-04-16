import axios from "axios";

const saveUserToDatabase = async (data, useIdUpdate) => {
    const baseUrl = "http://localhost:3001/user";
    try {
        if (useIdUpdate) {
            const response = await axios.put(`${baseUrl}/${useIdUpdate}`, data);
            return response.status === 200;
        } else {
            const response = await axios.post(`${baseUrl}/create-user`, data);
            return response.status === 201;
        }
    } catch (error) {
        console.error("Error saving user:", error);
        return false;
    }
}

export default saveUserToDatabase;