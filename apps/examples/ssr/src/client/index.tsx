import React from "react";
import * as ReactDOM from "react-dom";

import {BrowserRouter, Routing} from "@pixeloven-react/routing";

import App from "@shared/components/App";
import routeConfig from "@shared/routes";

import "@shared/styles/core/core.scss";

/**
 * Define root mounting point
 */
const root = document.getElementById("root");

/**
 * Get route config
 * @note process.env.PUBLIC_PATH is replaced by the webpack build. However ideally we bring this form the window instead.
 */
const publicPath = process.env.PUBLIC_PATH || "/";
const routes = Routing.getConfig(routeConfig, publicPath);
/**
 * Wrap application with container, router and store
 */
function AppWrapper() {
    return (
        <BrowserRouter>
            <App routes={routes} />
        </BrowserRouter>
    );
}
/**
 * When using hot module replacement we need to use the render method
 * otherwise errors may occur in development.
 */
/* tslint:disable no-string-literal */
const renderMethod = module["hot"] ? ReactDOM.render : ReactDOM.hydrate;
renderMethod(<AppWrapper />, root);

/**
 * Register service workers
 */
if (module["hot"]) {
    module["hot"].accept();
}
/* tslint:enable no-string-literal */
