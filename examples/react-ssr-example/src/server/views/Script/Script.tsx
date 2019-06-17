import React from "react";

interface ScriptProps {
    src: string | string[];
}

/**
 * Renders Script tags from an array
 * @param props
 */
function Script(props: ScriptProps) {
    if (typeof props.src === "string") {
        return <script type="text/javascript" src={props.src} defer={true} />;
    }
    const files = props.src
        ? props.src.map((src, index) => (
              <script
                  key={index}
                  type="text/javascript"
                  src={src}
                  defer={true}
              />
          ))
        : undefined;
    return <React.Fragment>{files}</React.Fragment>;
}

export default Script;
