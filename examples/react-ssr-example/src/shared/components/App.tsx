import { RouteProps, Routes } from "@pixeloven/react-router-config";
import React from "react";
import { Helmet } from "react-helmet";

interface Props {
    routes: RouteProps[];
}

function App(props: Props) {
    const { routes } = props;
    return (
        <React.Fragment>
            <Helmet titleTemplate="%s | React App" />
            <Routes as="switch" config={routes} />
        </React.Fragment>
    );
}

export default App;
