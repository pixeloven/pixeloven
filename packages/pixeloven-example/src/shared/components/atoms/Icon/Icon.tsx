import classNames from "classnames";
import * as React from "react";

import "./Icon.scss";

interface Props {
    className?: string;
    iconName: string;
    iconType: string;
    isLarge?: boolean;
    isBeforeText?: boolean;
    isAfterText?: boolean;
}

class Icon extends React.Component<Props> {
    public render() {
        const {
            className,
            iconName,
            iconType,
            isAfterText,
            isBeforeText,
            isLarge,
        } = this.props;
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
                <use
                    href={`/static/media/${iconType}-icons.svg#${iconType}-${iconName}`}
                />
            </svg>
        );
    }
}

export default Icon;
