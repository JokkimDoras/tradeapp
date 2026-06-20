// src/services/authApi.ts
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "https://tradeapp-43tb.onrender.com";

interface UserDetails {
  id: string;
  email: string;
  full_name: string;
}

interface AuthBackendPayload {
  data: {
    access_token: string;
    refresh_token:string;
    expire_at:string;
    user: UserDetails;
  };
}

export async function loginUserApi(formData: any) {
  try {
    const response = await axios.post<AuthBackendPayload>(`${API_URL}/api/auth/login`, formData);
    const payload = response.data.data; 

    if (payload?.access_token) localStorage.setItem("token", payload.access_token);
    if(payload?.refresh_token) localStorage.setItem("refresh_token",payload.refresh_token)
    if(payload?.expire_at) localStorage.setItem('expire_at',payload.expire_at)
    return payload;
  } catch (err: any) {
    console.error("Critical Network Error on Login Channel:", err.response?.data || err.message);
    throw err; 
  } 
}

export async function registerUserApi(formData: any) {
  try {
    const response = await axios.post<AuthBackendPayload>(`${API_URL}/api/auth/register`, {
      email: formData.email,
      password: formData.password,
      full_name: formData.fullName, 
    });
    const payload = response.data.data;
console.log(payload)
    if (payload?.access_token) localStorage.setItem("token", payload.access_token);
    if (payload?.user?.full_name) localStorage.setItem("fullname", payload.user.full_name);
    if (payload?.user?.email) localStorage.setItem("email", payload.user.email);

    return payload;
  } catch (err: any) {
    console.error("Critical Network Error on Registration Channel:", err.response?.data || err.message);
    throw err;
  }
}

export default async function logOutUserApi(token: string) {
  try {
    await axios.post(`${API_URL}/api/auth/logout`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (err) {
    console.error("Backend cache cleanup process rejected:", err);
    throw err;
  }
}