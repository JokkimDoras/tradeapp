import {  useState } from "react";
import logOutUserApi from "../services/authApi";
import { useNavigate } from "react-router";

export default function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate()



  const logout = async (token) => {
    setLoading(true); // 1. Turn on loading state here!
    try {
      await logOutUserApi(token);
    } catch (err) {
      console.error("'from useAuth' Server-side logout failed:", err.message);
      setError(err.message);
    } finally {
      localStorage.removeItem("token");
      setLoading(false);
      navigate('/login')
    }
  }; 

  return {
    loading,
    error,
    logout,
  };
}