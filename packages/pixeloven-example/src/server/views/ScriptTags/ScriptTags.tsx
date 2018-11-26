import * as React from "react";

interface ScriptProps {
    sources?: string[] | undefined;
}

/**
 * Renders Script tags from an array
 * @param props
 */
const ScriptTags = (props: ScriptProps) => {
    const files = props.sources
        ? props.sources.map((src, index) => (
              <script key={index} type="text/javascript" src={src} />
          ))
        : undefined;
    return <React.Fragment>{files}</React.Fragment>;
};

export default ScriptTags;
