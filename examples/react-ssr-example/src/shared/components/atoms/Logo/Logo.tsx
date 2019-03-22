import * as React from "react";

import "./Logo.scss";

interface Props {
    speed?: string;
}

class AppLogo extends React.Component<Props> {
    public render() {
        const { speed } = this.props;
        const logoStyle = {
            animationDuration: speed || "20s",
        };

        return (
            <img
                className="a-logo"
                src={"/static/media/logo.svg"}
                style={logoStyle}
            />
        );
    }
}

export default AppLogo;
