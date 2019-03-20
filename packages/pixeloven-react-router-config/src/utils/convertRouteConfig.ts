import { normalizeUrl } from "@pixeloven/core";
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
        let path = parentRoute;
        if (route.path) {
            path = typeof route.path === "function" 
                ? normalizeUrl(route.path(parentRoute))
                : route.path;
        }
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
