import { generatePath, useNavigate } from "react-router"
import { ROUTE_MAP } from "../config/routes"


type ExtractParams<T extends string> =
  T extends `${string}:${infer Param}/${infer Rest}`
    ? { [K in Param | keyof ExtractParams<Rest>]: string }
    : T extends `${string}:${infer Param}`
      ? { [K in Param]: string }
      : {}

type RouteParams<T extends keyof typeof ROUTE_MAP> =
  ExtractParams<(typeof ROUTE_MAP)[T]["BASE"]>

export function useAppNavigation() {
  const navigate = useNavigate()

  function appNavigation<T extends keyof typeof ROUTE_MAP>(
    module: T,
    params?: RouteParams<T>
  ) {
    let path:string = ROUTE_MAP[module].BASE

    if (params) {
      path = generatePath(path, params)
    }

    navigate(path)
  }

  return appNavigation
}