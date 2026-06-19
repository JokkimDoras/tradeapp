import axios from "axios";
import { getToken } from "../utils/auth";

const API_URL = import.meta.env.VITE_API_URL

const token = getToken();

export async function getAnalyticsDataApi() {

    try {
        const response = await axios.get(`${API_URL}/api/trades/dashboard/stats`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (err) {
        throw err
    }

}