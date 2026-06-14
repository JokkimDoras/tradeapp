// src/component/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const userToken = localStorage.getItem("token");

  // If the browser storage lacks an auth token string, instantly bounce them out
  if (!userToken) {
    return <Navigate to="/login" replace />;
  }

  // If validation passes, smoothly render the matching layout route content
  return <Outlet />;
}