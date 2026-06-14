// src/hooks/useAuth.ts
import { useState } from "react";
import { useNavigate } from "react-router";
import logOutUserApi, { loginUserApi, registerUserApi } from "../services/authApi";

export default function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [fullname, setFullname] = useState<string | null>(() => localStorage.getItem("fullname"));
  
  const navigate = useNavigate();

  const login = async (formData: any) => {
    setLoading(true);
    setError(null);
    try {
      const payload = await loginUserApi(formData);
      
      setToken(payload.access_token);
      setFullname(payload.user.full_name);
      
      navigate("/dashboard");
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
      
      setToken(payload.access_token);
      setFullname(payload.user.full_name);
      
      navigate("/dashboard");
    } catch (err: any) {
      const errMsg = err.response?.data?.message || "REGISTRATION_FAILED: Invalid identity data.";
      setError(errMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (currentToken: string) => {
    setLoading(true);
    try {
      await logOutUserApi(currentToken);
    } catch (err: any) {
      console.error("Hook runtime message: Server-side route invalidation bypassed.", err.message);
    } finally {
      // Storage registers wiped clean safely
      localStorage.removeItem("token");
      localStorage.removeItem("fullname");
      
      setToken(null);
      setFullname(null);
      
      setLoading(false);
      navigate("/login");
    }
  }; 

  return {
    token,
    fullname, 
    loading,
    error,
    login,
    register,
    logout,
  };
}