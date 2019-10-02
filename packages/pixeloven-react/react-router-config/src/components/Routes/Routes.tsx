import React from "react";
import { Route, Switch } from "react-router-dom";
import { MatchType, RouteProps } from "../../types";
import { Status } from "../Status";

export interface RoutesProps {
    as?: MatchType;
    config: RouteProps[];
}

/**
 * Creates Routes
 * @param props RoutesProps
 */
function Routes(props: RoutesProps) {
    const { as, config } = props;
    const routes = config.map((route, key) => (
        <Route
            key={key}
            exact={route.exact}
            path={route.path}
            strict={route.strict}
            render={componentProps => (
                <Status
                    statusCode={route.statusCode}
                    staticContext={componentProps.staticContext}
                >
                    <route.component {...componentProps} {...route} />
                </Status>
            )}
        />
    ));
    if (as === "switch") {
        return <Switch>{routes}</Switch>;
    }
    return <React.Fragment>{routes}</React.Fragment>;
}

export default Routes;
