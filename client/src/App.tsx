import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { AuthProvider } from "./context/UserContext.tsx";
import { Toaster } from "sonner";
import AnalyticsProvider from "./context/AnalyticsContext.tsx";
import AccountSelector from "./pages/AcoountSelector.tsx";
import LandingPage from "./pages/LandingPage.tsx";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import DashBoard from "./pages/DashBoard.tsx";
import NotFound from "./pages/404.tsx";
import ProtectedRoute from "./component/ProtectedRoute.tsx";
import DashboardLayout from "./component/DashboardLayout.tsx";
const History = lazy(() => import("./pages/History.tsx"));
const Strategies = lazy(() => import("./pages/Strategies.tsx"));
const TradeJournal = lazy(() => import("./pages/TradeJournal.tsx"));
const Profile = lazy(() => import("./pages/Profile.tsx"));
const Settings = lazy(() => import("./pages/Settings.tsx"));
const Analytics = lazy(() => import("./pages/Analytics.tsx"));
const TradeDetails = lazy(() => import("./pages/TradeDetails.tsx"));
const News = lazy(() => import("./pages/News.tsx"));
const Calendar = lazy(() => import("./pages/Calendar.tsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
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
            element: <DashBoard />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/setting",
            element: <Settings />,
          },
          {
            path: "/history/:id",
            element: (
              <Suspense fallback={<h1>Loading...</h1>}>
                <History />
              </Suspense>
            ),
          },
          {
            path: "/strategies",
            element: (
              <Suspense fallback={<h1>Loading...</h1>}>
                <Strategies />
              </Suspense>
            ),
          },
          {
            path: "/journal",
            element: (
              <Suspense fallback={<h1>Loading</h1>}>
                <TradeJournal />,
              </Suspense>
            ),
          },
          {
            path: "/analytics/:id",
            element: (
              <Suspense fallback={<h1>Loading</h1>}>
                <Analytics />,
              </Suspense>
            ),
          },
          {
            path: "/account/:id/trade/:id",
            element: (
              <Suspense fallback={<h1>Loading</h1>}>
                <TradeDetails />,
              </Suspense>
            ),
          },
          {
            path: "/news",
            element: (
              <Suspense fallback={<h1>Loading</h1>}>
                <News />,
              </Suspense>
            ),
          },
          {
            path: "/account-selector",
            element: <AccountSelector />,
          },
          {
            path: "/calendar/:id",
            element: (
              <Suspense fallback={<h1>Loading</h1>}>
                <Calendar />,
              </Suspense>
            ),
          },
          {
            path: "*",
            element: <NotFound />,
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return (
    <>
      <Toaster />
      <AuthProvider>
        <AnalyticsProvider>
          <RouterProvider router={router} />
        </AnalyticsProvider>
      </AuthProvider>
    </>
  );
}
