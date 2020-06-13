import React from "react";
import {Helmet} from "react-helmet";

import {UniversalRouteComponentProps} from "@pixeloven-react/routing";

function Home(props: UniversalRouteComponentProps) {
    return (
        <React.Fragment>
            <Helmet>
                <title>Home Page</title>
                <meta name="description" content="Home page and stuff" />
            </Helmet>
            <p>Hello world</p>
        </React.Fragment>
    );
}

export default Home;
