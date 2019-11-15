# Routes Molecule component

Routes takes a config array of "UniversalRouteProps" and renders a react router `<Switch />` that contains `<Routes />` referencing the components in the configuration.

## Source
```js

const TestComponent = () => {
    return <div>testing</div>
}

const routes = [{
    component: TestComponent,
    path: "/test",
}];

<Routes as="switch" config={routes} />
```




