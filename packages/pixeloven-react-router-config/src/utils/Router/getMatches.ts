import { matchPath } from "react-router";
import { MatchedRoutes, MatchType, RouteProps } from "../../types";

interface MatchOptions {
    as?: MatchType;
    path: string; // TODO we should make this PathLike??
}

/**
 * Copied form Router.computeRootMatch(pathname) version 4.4.0-beta
 * Type definitions don't cover this and not available in the version of react router we use
 * @param path
 */
function computeRootMatch(path: string) {
    return {
        isExact: path === "/",
        params: {},
        path: "/",
        url: "/",
    };
}

/**
 * Matches a path to a set of route definitions.
 * @description Works similar to how a switch works
 * @param routes
 * @param pathname
 * @param matches
 *
 * @todo We should have this be generator and return an iterator object?
 * 
 * @todo Scope whether root match might need to be whatever public path instead of always "/"
 * @todo Should we handle setting statusCode here if possible
 * @todo Should have a setting to act like a <switch> so that it only matches the first?
 * @todo If a server knows a statusCode ahead of time (like failed api response) we should be able to do matching on both status and path
 */
function getMatches(
    routes: RouteProps[],
    options: MatchOptions = {
        as: "default",
        path: "/",
    },
    matches: MatchedRoutes[] = [],
    level = 0,
) {
    let levelMatchCount = 0;
    for (const route of routes) {
        /**
         * We want to mimic a switch and skip after the first match
         */
        if (options.as === "switch" && levelMatchCount) {
            continue;
        }
        const matched = route.path
            ? matchPath(options.path, route)
            : matches.length
            ? matches[matches.length - 1].matched // use parent match
            : computeRootMatch(options.path); // use default "root" match
        if (matched) {
            matches.push({ route, matched });
            if (route.routes) {
                getMatches(route.routes, options, matches, ++level);
            }
            ++levelMatchCount;
        }
    }
    return matches;
}

export default getMatches;
