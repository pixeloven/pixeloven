import { ConnectedComponentClass } from "react-redux";
import {
    RouteComponentProps as DefaultRouteComponentProps,
    RouteProps as DefaultRouteProps,
} from "react-router-dom";
import { Dispatch } from "redux";

interface Params { 
    [key: string]: object | number | string 
};
/**
 * @todo Need make this not dependent on redux
 */
export type RouteFetchDataFunction = (
    callback: Dispatch,
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
    path?: RouteResolvePath;
    fetchData?: RouteFetchDataFunction;
    routes?: RouteConfig[];
    statusCode?: number;
}
