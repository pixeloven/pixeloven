#!/usr/bin/env node
import "./bootstrap/production";

import main from "./main";

/**
 * Execute CLI
 */
main(process.argv);
