import config from "@client/config";
import { Router } from "@pixeloven-react/routing";
import { App } from "@shared/components";
import routeConfig from "@shared/routes";
import React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "@shared/styles";

/**
 * Define root mounting point
 */
const root = document.getElementById("root");

/**
 * Get route config
 */
const routes = Router.getConfig(routeConfig, config.publicPath);
/**
 * Wrap application with container, router and store
 */
const AppWrapper = () => (
    <BrowserRouter>
        <App routes={routes} />
    </BrowserRouter>
);

/**
 * When using hot module replacement we need to use the render method
 * otherwise errors may occur in development.
 */
const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
renderMethod(<AppWrapper />, root);

/**
 * Register service workers
 */
if (module.hot) {
    module.hot.accept();
}
