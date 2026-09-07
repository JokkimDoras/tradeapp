import { Outlet } from "react-router";
import AnalyticsProvider from "./context/AnalyticsContext";
import { AuthProvider } from "./context/UserContext";

export default function AppProvider () {
    return (
        <AuthProvider>
            <AnalyticsProvider>
                <Outlet />
            </AnalyticsProvider>
        </AuthProvider>
    )
}