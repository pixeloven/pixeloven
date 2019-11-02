import { Link } from "@shared/components/atoms/Link";
import React from "react";
import favicon from "./favicon.ico";

function Favicon() {
    return <Link href={favicon} rel="icon" />;
}

export default Favicon;
