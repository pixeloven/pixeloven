import { normalizeUrl } from "@pixeloven/core";
import { RouteConfig, RouteProps } from "../../types";

/**
 * Map custom route config to react router v4 RouteProps
 * @param routeConfig
 * @param parentRoute
 */
function getConfig (
    routeConfig: RouteConfig[],
    parentRoute: string = "",
): RouteProps[] {
    return routeConfig.map(route => {
        let path = parentRoute;
        if (route.path) {
            path =
                typeof route.path === "function"
                    ? normalizeUrl(route.path(parentRoute))
                    : route.path;
        }
        const routes =
            route.routes && route.routes.length
                ? getConfig(route.routes, path)
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

export default getConfig;
