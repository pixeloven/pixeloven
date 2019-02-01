import { RouteConfig, RouteProps } from "../types";

/**
 * Convert custom route config to v4
 * @todo Add support for path to be a string instead of a function
 * @param routeConfig
 * @param parentRoute
 */
const convertRouteConfig = (
    routeConfig: RouteConfig[],
    parentRoute: string = "",
): RouteProps[] => {
    return routeConfig.map(route => {
        const path = route.path
            ? route.path(parentRoute).replace("//", "/")
            : parentRoute;
        const routes =
            route.routes && route.routes.length
                ? convertRouteConfig(route.routes, path)
                : undefined;
        const results = {
            ...route,
            path,
            routes,
        };
        Object.keys(results).forEach(key => {
            if (!results[key]) {
                delete results[key];
            }
        });
        return results;
    });
};

export default convertRouteConfig;
