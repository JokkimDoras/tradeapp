import { useNavigate } from "react-router";
import { useEffect } from "react";
import axios from "axios";

export default function DashBoard() {

    const navigate = useNavigate();
    
    // Grabbing stored credentials
    const token = localStorage.getItem('token')
    const fullName = localStorage.getItem('full_name');
    const email = localStorage.getItem('email');
    const id = localStorage.getItem('id');

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);


    const handleLogout = async () => {
        try {
            // 1. Alert your backend to invalidate the session in Supabase
            const response = await axios.post('http://localhost:8000/auth/logout', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log("Backend response:", response);
        } catch (err) {
            // Log the error, but don't trap the user in the dashboard if the server is down
            console.error("Backend logout failed:", err);
        } finally {
            // 2. FIXED: Clear all specific keys by their string names
            localStorage.removeItem('token')
            localStorage.removeItem('full_name');
            localStorage.removeItem('email');
            localStorage.removeItem('id');
          

            // ALTERNATIVE: If you aren't storing anything else important in your app, 
            // you can just use: localStorage.clear();

            // 3. Navigate away to login screen
            navigate('/login')
        }
    };
  
    return (
        <div className="min-h-screen bg-black text-white font-mono p-8">
            <h1 className="text-xl font-bold mb-4">[ DASHBOARD_SECURE_NODE ]</h1>
            <div className="space-y-2 mb-6">
                <p>Welcome back, {fullName || 'Operator'}</p>
                <p>Operator Email: {email}</p>
                <p>Operator ID: {id}</p>
            </div>
            
            <button 
                onClick={handleLogout} 
                className="bg-white text-black font-bold px-4 py-2 rounded hover:bg-gray-200 transition-colors"
            >
                Logout
            </button>
        </div>
    );
}