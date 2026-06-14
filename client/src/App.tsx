// src/App.tsx
import { createBrowserRouter, RouterProvider } from "react-router";
import LandingPage from "./pages/LandingPage.tsx"; 
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import DashBoard from "./pages/DashBoard.tsx"; 
import ProtectedRoute from "./component/ProtectedRoute.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    element: <ProtectedRoute />, 
    children: [
      {
        path: "/dashboard",
        element: <DashBoard />
      }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}