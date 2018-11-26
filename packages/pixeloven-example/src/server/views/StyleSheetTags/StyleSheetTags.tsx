import * as React from "react";

interface StyleSheetProps {
    hrefs?: string[] | undefined;
}

/**
 * Renders Style sheet tags from an array
 * @param props
 */
const StyleSheetTags = (props: StyleSheetProps) => {
    const files = props.hrefs
        ? props.hrefs.map((href, index) => (
              <link key={index} rel="stylesheet" type="text/css" href={href} />
          ))
        : undefined;
    return <React.Fragment>{files}</React.Fragment>;
};

export default StyleSheetTags;
