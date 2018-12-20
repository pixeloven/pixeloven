import { RouteComponentProps, RouteProps } from "@shared/router";
import * as React from "react";
import { Route as DefaultRoute } from "react-router-dom";

/**
 * Wraps react router <Route> for rendering nested routes and components
 * @description Also handles static context for reporting status codes back to the client
 * @param Component
 * @param exact
 * @param path
 * @param rest
 * @constructor
 */
const Route = (props: RouteProps) => {
    const { component: Component, exact, path, strict, ...otherProps } = props;
    const render = (componentProps: RouteComponentProps) => {
        if (componentProps.staticContext && props.statusCode) {
            componentProps.staticContext.statusCode = props.statusCode;
        }
        return <Component {...componentProps} {...otherProps} />;
    };
    return (
        <DefaultRoute
            exact={exact}
            path={path}
            strict={strict}
            render={render}
        />
    );
};

export default Route;
