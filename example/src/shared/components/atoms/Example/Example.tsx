import * as React from "react";

interface Props {
    example?: string;
}

interface State {
    example?: string;
}

class Example extends React.Component<Props, State> {
    public render(): React.ReactNode {
        const { example } = this.props;
        return example ? <div>{example}</div> : undefined;
    }
}

export default Example;
