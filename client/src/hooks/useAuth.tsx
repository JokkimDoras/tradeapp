import { useState } from "react";
import { useNavigate } from "react-router";
import logOutUserApi, { loginUserApi, registerUserApi } from "../services/authApi";
import { useUser } from "./useUser";
import { clearAuth } from "../utils/auth";


export default function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useUser(); 
  const navigate = useNavigate();

  const login = async (formData: any) => {
    setLoading(true);
    setError(null);
    try {
      const payload = await loginUserApi(formData);
       
      setUser((prev) => ({
        ...prev,
        ...payload.user
      }));

      navigate("/account-selector");
    } catch (err: any) {
      const errMsg = err.response?.data?.message || "AUTHENTICATION_FAILED: Access denied.";
      setError(errMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData: any) => {
    setLoading(true);
    setError(null);
    try {
      const payload = await registerUserApi(formData);
      
      setUser((prev) => ({
        ...prev,
        full_name:payload.user?.full_name
      }))
      localStorage.setItem("token", payload.access_token);
      
      navigate("/account-selector");
    } catch (err: any) {
      const errMsg = err.response?.data?.message || "REGISTRATION_FAILED: Invalid identity data.";
      setError(errMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (currentToken: string | null) => {
    setLoading(true);
    try {
      await logOutUserApi(currentToken);
    } catch (err: any) {
      console.error("Hook runtime message: Server-side route invalidation bypassed.", err.message);
    } finally {
      // Storage registers wiped clean safely
      clearAuth()
      setUser((prev) => ({
        ...prev,
        full_name:''
      }));
      
      setLoading(false);
      navigate("/login");
    }
  }; 

  return {
    loading,
    error,
    login,
    register,
    logout,
  };
}

// const googleLogin = async() => {

// }