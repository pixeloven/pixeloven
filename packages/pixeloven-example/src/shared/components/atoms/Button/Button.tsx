import classNames from "classnames";
import React, { Component } from "react";

import "./Button.scss";

interface Props {
    children: string;
    className?: string;
    href?: string;
    isDisabled?: boolean;
    isFullWidth?: boolean;
    isHollow?: boolean;
    isUnstyled?: boolean;
    tabIndex?: number;
}

export default class Button extends Component<Props> {
    public render() {
        const {
            children,
            className,
            href,
            isDisabled,
            isFullWidth,
            isHollow,
            isUnstyled,
            tabIndex,
        } = this.props;
        const buttonClasses = classNames(className, {
            "a-button": true,
            "a-button--disabled": isDisabled && !isUnstyled,
            "a-button--full-width": isFullWidth && !isUnstyled,
            "a-button--hollow": isHollow,
            "a-button--unstyled": isUnstyled,
        });
        const TagName = href ? "a" : "button";

        return (
            <TagName
                className={buttonClasses}
                disabled={!href && isDisabled}
                href={href}
                tabIndex={tabIndex}
            >
                {children}
            </TagName>
        );
    }
}
