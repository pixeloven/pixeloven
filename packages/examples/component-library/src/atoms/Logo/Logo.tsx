import classNames from "classnames";
import React from "react";
import logo from "./Logo.svg";

import "./Logo.scss";

interface Props {
    /** (optional) Class names */
    className?: string;
    /** (optional) Speed of animation */
    speed?: string;
}

/**
 * React example logo component
 * @param props
 */
function Logo(props: Props) {
    const { className, speed } = props;
    return (
        <img
            className={classNames("a-logo", className)}
            src={logo}
            style={{
                animationDuration: speed,
            }}
        />
    );
}

Logo.defaultProps = {
    speed: "20s",
};

export default Logo;
