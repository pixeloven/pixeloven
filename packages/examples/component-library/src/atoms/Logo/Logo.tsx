import React from "react";
import logo from "./Logo.svg";

import "./Logo.scss";

interface Props {
    speed?: string;
    src?: string;
}

function Logo(props: Props) {
    const { speed, src } = props;
    const logoStyle = {
        animationDuration: speed || "20s",
    };
    return <img className="a-logo" src={src ? src : logo} style={logoStyle} />;
}

export default Logo;
