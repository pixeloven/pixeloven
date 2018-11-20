import * as React from "react";
import {
    match,
    Route as DefaultRoute,
    RouteComponentProps as DefaultRouteComponentProps,
    RouteProps as DefaultRouteProps,
} from "react-router-dom";

export interface RouteComponentProps extends DefaultRouteComponentProps {
    routes?: RouteProps[];
}

export interface RouteProps extends DefaultRouteProps {
    component: new (props: RouteComponentProps) => React.Component<
        RouteComponentProps
    >;
    loadData?: (match: match) => Promise<void>;
    statusCode?: number;
}

/**
 * Wraps react router <Route> for rendering nested routes and components
 * @description Also handles static context for reporting status codes back to the client
 * @param Component
 * @param exact
 * @param path
 * @param rest
 * @constructor
 */
const Route = ({ component: Component, exact, path, ...rest }: RouteProps) => {
    const render = (props: RouteComponentProps) => {
        if (props.staticContext) {
            props.staticContext.statusCode =
                rest.statusCode || props.staticContext.statusCode || 200;
        }
        return <Component {...props} {...rest} />;
    };
    return <DefaultRoute exact={exact} path={path} render={render} />;
};

export default Route;
