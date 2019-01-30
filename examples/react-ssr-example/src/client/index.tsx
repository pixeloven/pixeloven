import { config } from "@client/config";
import { register } from "@client/serviceWorkers";
import App from "@shared/App";
import { convertCustomRouteConfig } from "@shared/router";
import routeConfig from "@shared/routes";
import { configureStore } from "@shared/store";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "../shared/styles/core/core.scss";

/**
 * Define root mounting point
 */
const root = document.getElementById("root");

/**
 * Get route config
 */
const routes = convertCustomRouteConfig(routeConfig, config.basePath);
/**
 * Wrap application with container, router and store
 */
const AppWrapper = () => (
    <Provider store={configureStore(true)}>
        <BrowserRouter>
            <App routes={routes} />
        </BrowserRouter>
    </Provider>
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
register();

if (module.hot) {
    module.hot.accept();
}
