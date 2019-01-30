import { Blog, Home, NoMatch } from "@shared/components/pages";
import { Default } from "@shared/components/templates";
// import { Dispatch } from "redux";

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
                path: (parentPath: string) => `${parentPath}/`,
            },
            // Blog Main
            {
                component: Blog,
                exact: true,
                // fetchData: (
                //     dispatch: Dispatch,
                //     params: BlogPageParams,
                // ): void => {
                //     dispatch({
                //         payload: "posts",
                //         type: ExampleActionTypes.GET_EXAMPLE_IN_PROGRESS,
                //     });
                // },
                path: (parentPath: string) => `${parentPath}/blog`,
            },
            // Blog Page
            {
                component: Blog,
                exact: true,
                path: (parentPath: string) => `${parentPath}/blog/:post`,
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
