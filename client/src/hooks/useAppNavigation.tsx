import { useNavigate } from "react-router"
import { ROUTE_MAP } from "../config/routes"

export default function useAppNavigation() {
    const navigate = useNavigate()

    const appNavigation = (module: keyof typeof ROUTE_MAP) => {
            const path = ROUTE_MAP[module].BASE
        

        navigate(path)
    }

    return appNavigation
}