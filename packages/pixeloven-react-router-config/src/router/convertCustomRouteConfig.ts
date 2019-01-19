import { RouteConfig, RouteProps } from "./types";

/**
 * @param customRouteConfig
 * @param parentRoute
 *
 * @todo Remove path function in favor of just using config in router.ts?
 */
const convertCustomRouteConfig = (
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
                ? convertCustomRouteConfig(route.routes, pathResult)
                : [],
            statusCode: route.statusCode,
        };
    });
};

export default convertCustomRouteConfig;
