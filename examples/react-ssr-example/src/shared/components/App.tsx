import { RouteProps, Routes } from "@pixeloven/react-router-config";
import React from "react";
import { Helmet } from "react-helmet";

interface Props {
    routes: RouteProps[];
}

interface State {
    hasError?: boolean;
}

/**
 * Wrap application with router and implement react helmet
 */
class App extends React.Component<Props, State> {
    /**
     * Sets an error boundary in case errors in the application aren't handled properly
     * @param error
     */
    public static getDerivedStateFromError(error: Error) {
        return { hasError: true };
    }

    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    public render(): React.ReactNode {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }
        return (
            <React.Fragment>
                <Helmet titleTemplate="%s | React App" />
                <Routes config={this.props.routes} />
            </React.Fragment>
        );
    }
}

export default App;
