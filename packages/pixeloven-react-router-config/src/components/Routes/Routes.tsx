import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { RouteProps } from "../../types";
import { Status } from "../Status";

export interface RoutesProps {
    config: RouteProps[];
}

/**
 * @param props
 */
const Routes = (props: RoutesProps) => {
    const { config } = props;
    return (
        <Switch>
            {config.map((route, key) => (
                <Route
                    key={key}
                    exact={route.exact}
                    path={route.path}
                    strict={route.strict}
                    render={componentProps => {
                        return (
                            <Status
                                statusCode={route.statusCode}
                                staticContext={componentProps.staticContext}
                            >
                                <route.component
                                    {...componentProps}
                                    {...route}
                                />
                            </Status>
                        );
                    }}
                />
            ))}
        </Switch>
    );
};

export default Routes;
