import { useLocation } from "react-router"

export function useBreadCrumbs() {
   const { pathname } = useLocation()
    const path = pathname.split('/').filter(Boolean)
    return path
}