import * as React from "react";
import { SwitchProps } from "react-router";
import { Switch } from "react-router-dom";
import { RouteProps } from "../../../router";
import { Route } from "../../atoms";

export interface RenderRoutesProps {
    routes: RouteProps[];
    componentProps?: object;
    switchProps?: SwitchProps;
}

/**
 * @todo Need to better define
 * @param param0
 */
const RenderRoutes = (props: RenderRoutesProps) => {
    const { routes, componentProps, switchProps } = props;
    return (
        <Switch {...switchProps}>
            {routes.map((route, key) => (
                <Route key={key} {...route} {...componentProps} />
            ))}
        </Switch>
    );
};

export default RenderRoutes;
