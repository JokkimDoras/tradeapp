import axios from "axios";

export default async function logOutUserApi(token) {
    try {
         await axios.post(
            'http://localhost:8000/auth/logout', {}, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
    } catch (err) {
        console.error("Backend logout failed:", err);
    }

}




