import { ConnectedComponentClass } from "react-redux";
import {
    RouteComponentProps as DefaultRouteComponentProps,
    RouteProps as DefaultRouteProps,
} from "react-router-dom";
import { Dispatch } from "redux";

/**
 * @todo Need a better way to do this than to pass any
 */
/* tslint:disable no-any */
type Params = any;
// Params extends { [K in keyof Params]?: string
/* tslint:enable no-any */

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
}

export type RouteResolvePath = (parentPath: string) => string;

export interface RouteConfig {
    component: RouteComponent<Params>;
    exact?: boolean;
    key?: number;
    path?: RouteResolvePath;
    fetchData?: RouteFetchDataFunction;
    routes?: RouteConfig[];
    statusCode?: number;
}
