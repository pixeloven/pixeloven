import { Home } from "@shared/components/pages/Home";
import { NoMatch } from "@shared/components/pages/NoMatch";
import { Default } from "@shared/components/templates/Default";
import { ExampleActionTypes } from "@shared/store/Example/types";
import { Dispatch } from "redux";

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
                fetchData: (dispatch: Dispatch) => {
                    dispatch({
                        payload: "example",
                        type: ExampleActionTypes.GET_EXAMPLE_IN_PROGRESS,
                    });
                },
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
