import { Blog, Home, NoMatch } from "@shared/components/pages";
import { Default } from "@shared/components/templates";
// import ExampleActionTypes from "@shared/store/Example/Example.actions";
// import { Dispatch } from "redux";

/**
 * Defines routes for both client and server
 * @description Nested routes allow for pages to share templates.
 */
const routes = [
    {
        component: Default,
        exact: true,
        path: (parentPath: string) => `${parentPath}/`,
        routes: [
            {
                component: Home,
            },
        ],
    },
    {
        component: Default,
        path: (parentPath: string) => `${parentPath}/blog`,
        routes: [
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
            {
                component: Blog,
                path: (parentPath: string) => `${parentPath}/blog/:post`,
            },
        ],
    },
    {
        component: NoMatch,
        statusCode: 404,
    },
];

export default routes;
