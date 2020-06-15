import { logger } from "@pixeloven-core/logger";
import CircularDependencyPlugin from "circular-dependency-plugin";

interface CircularDependencyOptions {
    circularDepCheck?: "warn" | "error";
    limitCyclesDetected: number;
}

export function createCircularDependencyPlugin(
    options: CircularDependencyOptions = {
        limitCyclesDetected: 3,
    },
) {
    let numCyclesDetected = 0;
    let numCyclesDisplayed = 0;
    if (options.circularDepCheck) {
        return new CircularDependencyPlugin({
            // exclude detection of files based on a RegExp
            exclude: /node_modules/,
            onStart() {
                numCyclesDetected = 0;
                numCyclesDisplayed = 0;
            },
            onDetected({ paths }) {
                if (numCyclesDetected < options.limitCyclesDetected) {
                    // compilation.warnings.push(new Error(`circular dependency ${paths.join(" -> ")}`));
                    logger.warn(`circular dependency ${paths.join(" -> ")}`);
                    numCyclesDisplayed++;
                }
                numCyclesDetected++;
            },
            onEnd() {
                if (numCyclesDetected > options.limitCyclesDetected) {
                    // compilation.warnings.push(new Error(`${numCyclesDetected - numCyclesDisplayed} additional circular dependencies with a total of ${numCyclesDetected} detected`));
                    if (options.circularDepCheck === "warn") {
                        logger.warn(
                            `${
                                numCyclesDetected - numCyclesDisplayed
                            } additional circular dependencies with a total of ${numCyclesDetected} detected`,
                        );
                    } else {
                        logger.error(
                            `${
                                numCyclesDetected - numCyclesDisplayed
                            } additional circular dependencies with a total of ${numCyclesDetected} detected`,
                        );
                    }
                }
            },
        });
    }
    return;
}
