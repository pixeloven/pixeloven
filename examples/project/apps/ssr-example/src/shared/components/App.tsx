import { Routes, UniversalRouteProps } from "@pixeloven-react/routing";
import React from "react";

interface Props {
    routes: UniversalRouteProps[];
}

function App(props: Props) {
    const { routes } = props;
    return (
        <React.Fragment>
            <Routes as="switch" config={routes} />
        </React.Fragment>
    );
}

export default App;
