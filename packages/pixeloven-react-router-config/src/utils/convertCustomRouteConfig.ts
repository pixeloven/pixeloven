import { RouteConfig, RouteProps } from "../types";

/**
 * Convert custom route config to v4
 * @param routeConfig 
 * @param parentRoute 
 */
const convertRouteConfig = (
    routeConfig: RouteConfig[],
    parentRoute: string = "",
): RouteProps[] => {
    return routeConfig.map(route => {
        let pathResult = parentRoute;
        if (route.path) {
            pathResult = route.path(parentRoute).replace("//", "/");
        }
        return {
            component: route.component,
            exact: route.exact,
            fetchData: route.fetchData,
            path: pathResult ? pathResult : undefined,
            routes: route.routes
                ? convertRouteConfig(route.routes, pathResult)
                : [],
            statusCode: route.statusCode,
        };
    });
};

export default convertRouteConfig;
