/* tslint:disable no-any */
import { ConnectedComponentClass } from "react-redux";
import { match } from "react-router";
import {
    RouteComponentProps as DefaultRouteComponentProps,
    RouteProps as DefaultRouteProps,
} from "react-router-dom";
import { Dispatch } from "redux";

/**
 * @todo Need a better way to do this than to pass any
 */
type Params = any;

export type MatchType = "switch" | "default";

export interface MatchedRoutes {
    matched: match;
    route: RouteProps;
}

/**
 * @todo Need make this less dependent on redux
 */
export type RouteFetchDataFunction = (
    dispatch: Dispatch,
    ownProps: Params,
) => void;

export type RouteComponent<T = {}> =
    | React.ComponentType<DefaultRouteComponentProps<T>>
    | ConnectedComponentClass<object, DefaultRouteComponentProps<T>>;

export interface RouteComponentProps<T = {}>
    extends DefaultRouteComponentProps<T> {
    routes?: RouteProps[];
}

export interface RouteProps extends DefaultRouteProps {
    key?: number;
    component: RouteComponent<Params>;
    fetchData?: RouteFetchDataFunction;
    routes?: RouteProps[];
    statusCode?: number;
}

export type RouteResolvePath = (parentPath: string) => string;

export interface RouteConfig {
    component: RouteComponent<Params>;
    exact?: boolean;
    path?: RouteResolvePath | string;
    fetchData?: RouteFetchDataFunction;
    routes?: RouteConfig[];
    statusCode?: number;
}
