# @pixeloven/react-router-config

> Pixel Oven React router config.

See our website [pixeloven-react-router-config](https://github.com/pixeloven/pixeloven) for more information or the [issues](https://github.com/pixeloven/pixeloven) associated with this package.

## Install

Using npm:

```sh
npm install --save @pixeloven/react-router-config
```

or using yarn:

```sh
yarn add @pixeloven/react-router-config
```

## Usage
> Note this package has currently not been tested for native route configuration.

This packages was meant to help unify client and server route configurations. To start we should make sure that we split our code base into three sections to clearly designate each code path.

### Configuration
```
project
└── src
    ├── client
    ├── server
    └── shared
```
To start let's define our route configuration. Create a file `routes.{js,ts}` in the `shared` directory.
```
shared
└── routes.ts
```
In this file create we'll create our route definitions.
```javascript
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
                path: (parentPath: string) => `${parentPath}/`,
            },
        ],
    },
];

export default routes;

```

### Implementation 
Next let's implement our shared Routes component. In the example above we created a simple nested structure with **Default** as out `template` and **Home** as our `page`. First up we need to add out `Routes` component to our Application.
```javascript
import { Routes, RouteProps } from "@pixeloven/react-router-config";
import routes from "@shared/routes";

interface Props {
    routes: RouteProps[];
}

class App extends React.Component<Props> {
    public render(): React.ReactNode {
        return <Routes as="switch" config={routes} />
    }
}
```
Of course this next step is option but here to highlight that nested routes are supported. For this example we have defined a simple **Default** template that might have shared components common across our application.
```javascript
import { Routes, RouteComponentProps } from "@pixeloven/react-router-config";

class Default extends React.Component<RouteComponentProps> {
    public render() {
        return <Routes as="switch" config={routes} />
    }
}
```
Finally we arrive home with our simple little page.
```javascript
import { RouteComponentProps } from "@pixeloven/react-router-config";

class Home extends React.Component<RouteComponentProps> {
    public render() {
        return <div>I'm Home!</div>;
    }
}
```

### Integration 
On both the client and server side we should integrate our unified routes with our application like so.
```javascript
import { Router } from "@pixeloven/react-router-config";
import { App } from "@shared/components";
import routes from "@shared/routes";

//...

/**
 * Parent Path or sometimes called base path tells the config where all routes start.
 * Defaults to "/"
 */
const parentPath = "/example/";
const routeConfig = Router.getConfig(routes, parentPath);

<App routes={routeConfig} />

```
At this point it is up to your application structure to determine the best approach for this step. This configuration also adds some opinions about how to fetch data from the server side but doesn't offer up any requirements for how that data is then used. 

For example if we wanted to fetch data on the server side to push into our application state we might do something like the following.
```javascript
import { matchRoutes } from "@pixeloven/react-router-config";
import routes from "@shared/routes";

//...

const matchedRoutes =  Router.getMatches(routes, {
    as: "switch",
    path: req.path // Ex: Express request object
});
matchedRoutes.forEach(matchedRoute => {
    if (matchedRoute.route.fetchData) {
        matchedRoute.route.fetchData(
            store.dispatch,
            matchedRoute.matched.params,
        );
    }
});
```
Now in this example we are passing *dispatch* in for use to presumably dispatch actions for some side-effects. Currently this feature has a dependency on redux.