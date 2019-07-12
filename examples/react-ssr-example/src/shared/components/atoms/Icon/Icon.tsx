import classNames from "classnames";
import React from "react";

import icons from "./ui-icons.svg";

import "./Icon.scss";

interface Props {
    className?: string;
    iconName: string;
    iconType: string;
    isLarge?: boolean;
    isBeforeText?: boolean;
    isAfterText?: boolean;
}

function Icon(props: Props) {
    const {
        className,
        iconName,
        iconType,
        isAfterText,
        isBeforeText,
        isLarge,
    } = props;
    const iconClasses = classNames(className, {
        "a-icon": true,
        "a-icon--after-text": isAfterText,
        "a-icon--before-text": isBeforeText,
        "a-icon--large": isLarge,
    });
    return (
        <svg
            height="1.1875em"
            width="1.1875em"
            viewBox="0 0 19 19"
            className={iconClasses}
        >
            <use href={`${icons}#${iconType}-${iconName}`} />
        </svg>
    );
}

export default Icon;
