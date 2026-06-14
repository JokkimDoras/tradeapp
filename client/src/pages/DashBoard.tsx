import SideBar from "../component/SideBar";
import useAuth from "../hooks/useAuth";

export default function DashBoard() {
  const { loading, error, logout } = useAuth();

  const handleLogout = () => {
    const userToken = localStorage.getItem("token");
    logout(userToken);
  };
  const fullName = localStorage.getItem("fullname");
  return (
    <div className="flex min-h-screen bg-[#121212] text-white font-mono p-8">
      <div className="w-50">
        <SideBar />
      </div>
      <div>
        <h1 className="text-xl font-bold mb-4">[ DASHBOARD_SECURE_NODE ]</h1>
        <div className="space-y-2 mb-6">
          <p>Welcome back, {fullName || "Operator"}</p>
          {/* <p>Operator Email: {email}</p>
          <p>Operator ID: {id}</p> */}
        </div>

        <button
          onClick={handleLogout}
          className="bg-white text-black font-bold px-4 py-2 rounded hover:bg-gray-200 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
