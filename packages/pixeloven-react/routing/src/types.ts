import { ConnectedComponentClass } from "react-redux";
import { match } from "react-router";
import { RouteComponentProps, RouteProps } from "react-router-dom";

/**
 * @todo Should remove the reliance on redux make types more generic
 * @todo need to expose react router through this package
 */
/* tslint:disable no-any */
type Params = any;

/* tslint:disable-next-line:ban-types */
export type FetchDataFunction = Function;

export type MatchType = "switch" | "default";

/**
 * @todo path should support Buffer | Url | string
 */
export interface MatchOptions {
    as?: MatchType;
    path: string;
}

export interface MatchedRoutes {
    matched: match;
    route: UniversalRouteProps;
}

/**
 * @todo parentPath should support Buffer | Url | string
 */
export type ResolvePathFunction = (parentPath: string) => string;

export interface UniversalRouteProps extends RouteProps {
    key?: number;
    component: UniversalRouteComponent<Params>;
    fetchData?: FetchDataFunction;
    routes?: UniversalRouteProps[];
    statusCode?: number;
}

export interface UniversalRouteComponentProps<T = {}>
    extends RouteComponentProps<T> {
    routes?: UniversalRouteProps[];
}

export type UniversalRouteComponent<T = {}> =
    | React.ComponentType<T>
    | React.ComponentType<UniversalRouteComponentProps<T>>
    | ConnectedComponentClass<any, UniversalRouteComponentProps<T>>;

export interface UniversalRouteConfig {
    component: UniversalRouteComponent<Params>;
    exact?: boolean;
    path?: ResolvePathFunction | string;
    fetchData?: FetchDataFunction;
    routes?: UniversalRouteConfig[];
    statusCode?: number;
}
/* tslint:enable no-any */
