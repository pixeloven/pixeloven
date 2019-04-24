import { Link } from "@shared/components";
import * as React from "react";
import favicon from "./favicon.ico";

/**
 * @todo DO THIS FOR SSR AS WELL... REMOVE public directory
 */
function Favicon() {
    return <Link href={favicon} rel="icon" />;
}

export default Favicon;
