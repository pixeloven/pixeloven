import { ConnectedComponentClass } from "react-redux";
import { match } from "react-router";
import { RouteComponentProps, UniversalRouteProps } from "react-router-dom";
import { Dispatch } from "redux";

/**
 * @todo Should remove the reliance on redux make types more generic
 * @todo need to expose react router through this package
 */
/* tslint:disable no-any */
type Params = any;

export type FetchDataFunction = (dispatch: Dispatch, ownProps: Params) => void;

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
    route: UniversalUniversalRouteProps;
}

/**
 * @todo parentPath should support Buffer | Url | string
 */
export type ResolvePathFunction = (parentPath: string) => string;

export interface UniversalUniversalRouteProps extends UniversalRouteProps {
    key?: number;
    component: UniversalRouteComponent<Params>;
    fetchData?: FetchDataFunction;
    routes?: UniversalUniversalRouteProps[];
    statusCode?: number;
}

export interface UniversalRouteComponentProps<T = {}>
    extends RouteComponentProps<T> {
    routes?: UniversalUniversalRouteProps[];
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
