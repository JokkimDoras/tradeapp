import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const userToken = localStorage.getItem("token");

  if (!userToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}