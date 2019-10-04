import { RouteComponentProps, Routes } from "@pixeloven-react/routing";
import React from "react";

function App(props: RouteComponentProps) {
    const { routes } = props;
    return (
        <React.Fragment>
            {routes && <Routes as="switch" config={routes} />}
        </React.Fragment>
    );
}

export default App;
