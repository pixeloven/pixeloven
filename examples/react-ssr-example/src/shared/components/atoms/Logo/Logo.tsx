import * as React from "react";
import logo from "./logo.svg";

import "./Logo.scss";

interface Props {
    speed?: string;
}

function Logo(props: Props) {
    const { speed } = props;
    const logoStyle = {
        animationDuration: speed || "20s",
    };
    return <img className="a-logo" src={logo} style={logoStyle} />;
}

export default Logo;
