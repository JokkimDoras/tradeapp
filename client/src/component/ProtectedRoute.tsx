import { Navigate, Outlet } from "react-router";
import { useUser } from "../hooks/useUser";

export default function ProtectedRoute() {
  const userToken = localStorage.getItem("token");
  const { user } = useUser()

  if (!user || !userToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}