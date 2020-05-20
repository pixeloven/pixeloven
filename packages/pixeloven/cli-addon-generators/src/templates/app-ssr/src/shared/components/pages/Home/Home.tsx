import React from "react";
import { Helmet } from "react-helmet";

import { UniversalRouteComponentProps } from "@pixeloven-react/routing";

class Home extends React.Component<UniversalRouteComponentProps> {
    public render(): React.ReactNode {
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
}

export default Home;
