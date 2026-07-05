import { Navigate, Outlet } from "react-router";
import { useUser } from "../hooks/useUser";
import { getToken } from "../utils/auth";

export default function ProtectedRoute() {
  const userToken = getToken()
  const { user } = useUser()

  if (!user || !userToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}