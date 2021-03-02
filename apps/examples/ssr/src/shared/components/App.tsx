import React from "react";

import {ErrorBoundary} from "@pixeloven-react/common";
import {Routes, UniversalRouteProps} from "@pixeloven-react/routing";

interface AppProps {
    routes?: UniversalRouteProps[];
}

function App(props: AppProps) {
    const {routes} = props;
    return (
        <ErrorBoundary fallback={<div>Something Bad Happened</div>} onCatch={console.error}>
            {routes ? <Routes as="switch" config={routes} /> : <div>Don't forget to pass in some routes...</div>}
        </ErrorBoundary>
    );
}

export default App;
