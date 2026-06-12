import { useNavigate } from "react-router";
import { useEffect } from "react";

export default function DashBoard() {

    const navigate = useNavigate()
    // FIXED: Updated keys to match what you actually saved in Login.tsx
    const token = localStorage.getItem('token');
    const fullName = localStorage.getItem('full_name');
    const email = localStorage.getItem('email');
    const id = localStorage.getItem('id');
  
  
    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);
  
    return (
      <div className="min-h-screen bg-black text-white font-mono p-8">
        <h1>[ DASHBOARD_SECURE_NODE ]</h1>
        <p>Welcome back, {fullName}</p>
        <p>Operator Email: {email}</p>
      </div>
    );
  }
  