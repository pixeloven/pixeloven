import { Route } from "@shared/components/atoms";
import routes from "@shared/routes";
import React from "react";
import { Helmet } from "react-helmet";
import { Switch } from "react-router-dom";

interface State {
    hasError?: boolean;
}

/**
 * Wrap application with router and implement react helmet
 */
class App extends React.Component<{}, State> {
    /**
     * Sets an error boundary in case errors in the application aren't handled properly
     * @param error
     */
    public static getDerivedStateFromError(error: Error) {
        return { hasError: true };
    }

    constructor(props: {}) {
        super(props);
        this.state = { hasError: false };
    }

    public render(): React.ReactNode {
        const mappedRoutes = routes.map((route, index) => (
            <Route key={index} {...route} />
        ));
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }
        return (
            <React.Fragment>
                <Helmet titleTemplate="%s | React App" />
                <Switch>{mappedRoutes}</Switch>
            </React.Fragment>
        );
    }
}

export default App;
