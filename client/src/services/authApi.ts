import axios from "axios";

const API_URL = 'https://tradeapp-43tb.onrender.com';

export default async function logOutUserApi(token:string) {
    try {
         await axios.post(
            `${API_URL}/auth/logout`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
    } catch (err) {
        console.error("Backend logout failed:", err);
    }

}




