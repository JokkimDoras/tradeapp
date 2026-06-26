import { createBrowserRouter, RouterProvider } from "react-router";
import LandingPage from "./pages/LandingPage.tsx"; 
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import DashBoard from "./pages/DashBoard.tsx"; 
import ProtectedRoute from "./component/ProtectedRoute.tsx";
import DashboardLayout from "./component/DashboardLayout.tsx";
import History from "./pages/History.tsx";
import Strategies from "./pages/Strategies.tsx";
import TradeJournal from "./pages/TradeJournal.tsx";
import Profile from "./pages/Profile.tsx";
import Settings from "./pages/Settings.tsx";
import { AuthProvider } from "./context/UserContext.tsx";
import { Toaster } from "sonner";
import Analytics from "./pages/Analytics.tsx";
import TradeDetails from "./pages/TradeDetails.tsx";
import News from "./pages/News.tsx";
import AnalyticsProvider from "./context/AnalyticsContext.tsx";
import AccountSelector from "./pages/AcoountSelector.tsx";
import Calendar from "./pages/Calendar.tsx";


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
    // Layer 1: Security Shield (Protects all child nodes)
    element: <ProtectedRoute />, 
    children: [
      {
        // Layer 2: Visual Frame Layout (Holds the Sidebar frame)
        element: <DashboardLayout />,
        children: [
          {
            path: "/dashboard/:id",
            element: <DashBoard />
          },
          {
            path: "/profile",
            element: <Profile />
          },
          {
            path: "/setting",
            element: <Settings />
          },
          {
            path:'/history/:id',
            element:<History/>
          },
          {
            path:'/strategies',
            element:<Strategies/>
          },
          {
            path:'/journal',
            element:<TradeJournal/>
          },
          {
            path:'/analytics',
            element:<Analytics/>
          },
          {
            path:'/trade/:id',
            element:<TradeDetails/>
          },
          {
            path:'/news',
            element:<News/>
          },
          {
            path:'/account-selector',
            element:<AccountSelector/>
          },
          {
            path:'/calendar/:id',
            element:<Calendar/>
          }
          
        ]
      }
    ]
  }
]);

export default function App() {
  return(
    <>
    <Toaster/>
<AuthProvider>
  <AnalyticsProvider>
  <RouterProvider router={router} />
  </AnalyticsProvider>
</AuthProvider>
    </>
  );
}