import React from "react";

interface Props {
    speed?: string;
    src?: string;
}

function Logo(props: Props) {
    const { speed, src } = props;
    const logoStyle = {
        animationDuration: speed || "20s",
    };
    return <img className="a-logo" src={src} style={logoStyle} />;
}

export default Logo;
