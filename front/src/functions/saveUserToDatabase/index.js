import axios from "axios";

const saveUserToDatabase = async (data) => {
    const url = "http://localhost:3001/user/create-user"
    try {
        const response = await axios.post(url, data);

    } catch (error) {

    }
}

export default saveUserToDatabase;