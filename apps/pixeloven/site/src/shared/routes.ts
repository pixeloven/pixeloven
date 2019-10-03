import { Home } from "@shared/components/pages";
import { Default } from "@shared/components/templates";

/**
 * Defines routes for both client and server
 * @description Nested routes allow for pages to share templates.
 */
const routes = [
    {
        component: Default,
        routes: [
            // Home Page
            {
                component: Home,
                exact: true,
                path: "/",
            },
        ],
    },
];

export default routes;
