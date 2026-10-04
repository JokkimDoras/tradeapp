import { generatePath } from "react-router"

export const ROUTE_MAP = {
  LOGIN: { BASE: "/login" },
  REGISTER: { BASE: "/register" },
  ACCOUNT_SELECTOR: { BASE: "/account-selector" },
  PROFILE: { BASE: "/profile" },
  SETTING: { BASE: "/setting" },
  DASHBOARD: { BASE: "/dashboard/:accId" },
  HISTORY: { BASE: "/history/:accId" },
  STRATEGIES: { BASE:'/strategies'},
  NEWS:{ BASE:'/news'},
  JOURNAL:{ BASE:'/journal'}
  
} as const

type ExtractParams<T extends string> =
  T extends `${string}:${infer Param}/${infer Rest}`
    ? { [K in Param | keyof ExtractParams<Rest>]: string }
    : T extends `${string}:${infer Param}`
      ? { [K in Param]: string }
      : never

type RouteParams<T extends keyof typeof ROUTE_MAP> =
  ExtractParams<(typeof ROUTE_MAP)[T]["BASE"]>

export const getRoute = <T extends keyof typeof ROUTE_MAP>(
  module: T,
  params?: RouteParams<T>
) => {
  const path = ROUTE_MAP[module].BASE

  if (!params) return path

  return generatePath(path, params)
}