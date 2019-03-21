import { matchPath } from "react-router";
import { MatchedRoutes, RouteProps } from "../../types";

/**
 * Copied form Router.computeRootMatch(pathname) version 4.4.0-beta
 * Type definitions don't cover this and not available in the version of react router we use
 * @param pathname
 */
const computeRootMatch = (pathname: string) => {
    return {
        isExact: pathname === "/",
        params: {},
        path: "/",
        url: "/",
    };
};

/**
 * Matches a path to a set of route definitions. 
 * @description Works similar to how a switch works 
 * @param routes 
 * @param pathname 
 * @param matches 
 * 
 * @todo Scope whether root match might need to be whatever public path instead of always "/"
 * @todo Should we handle setting statusCode here if possible
 * @todo Should have a setting to act like a <switch> so that it only matches the first?
 * @todo If a server knows a statusCode ahead of time (like failed api response) we should be able to do matching on both status and path
 */
function getMatches(
    routes: RouteProps[],
    pathname: string,
    matches: MatchedRoutes[] = [],
) {
    routes.forEach(route => {
        const matched = route.path
            ? matchPath(pathname, route)
            : matches.length
            ? matches[matches.length - 1].matched // use parent match
            : computeRootMatch(pathname); // use default "root" match
        if (matched) {
            matches.push({ route, matched });
            if (route.routes) {
                getMatches(route.routes, pathname, matches);
            }
        }
        return matched;
    });
    return matches;
};

export default getMatches;
