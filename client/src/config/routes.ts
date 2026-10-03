export const ROUTE_MAP = {
    LOGIN:{ BASE : '/login' },
    REGISTER:{ BASE:'/register'}
}


export const getRoute = (module:keyof typeof ROUTE_MAP) => {
     return ROUTE_MAP[module].BASE 
    // return ROUTE_MAP[module][sub]
} 