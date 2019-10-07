import { Home, NoMatch } from "@shared/components/pages";
import { Default } from "@shared/components/templates";

/**
 * @todo Need to create a better unknown error page
 */
export const unknownErrorRoutes = [
    {
        component: Default,
        routes: [
            {
                component: NoMatch,
                statusCode: 500,
            },
        ],
    },
];

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
            // 404 Page
            {
                component: NoMatch,
                statusCode: 404,
            },
        ],
    },
];

export default routes;
