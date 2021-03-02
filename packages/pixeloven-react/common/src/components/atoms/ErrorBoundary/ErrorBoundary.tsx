import React from "react";

interface Props {
    children?: React.ReactNode;
    fallback?: React.ReactNode;
    onCatch?: (error?: Error, info?: object) => void;
}

interface State {
    error?: Error | false;
}

class ErrorBoundary extends React.Component<Props, State> {
    public static getDerivedStateFromError(error: Error) {
        return {
            error,
        };
    }

    constructor(props: Props) {
        super(props);
        this.state = {
            error: false,
        };
    }

    public componentDidCatch(error: Error, info?: object) {
        const { onCatch } = this.props;
        if (onCatch) {
            onCatch(error, info);
        }
        this.setState({
            error,
        });
    }

    public render() {
        const { children, fallback } = this.props;
        const { error } = this.state;
        if (error) {
            return fallback ? fallback : <React.Fragment />;
        }
        return children;
    }
}

export default ErrorBoundary;
