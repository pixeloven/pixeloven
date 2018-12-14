# RenderRoutes Molecule component

RenderRoutes takes a route configuration array "RouteProps" and renders a react router `<Switch />` that contains `<Routes />` referencing the components in the configuration.

## Source
```js

const TestComponent = () => {
    return <div>testing</div>
}

const routes = [{
    component: TestComponent,
    path: "/test",
}];

<RenderRoutes routes={routes} />
```




