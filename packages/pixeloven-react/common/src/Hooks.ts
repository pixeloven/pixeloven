/**
 * Common abstractions for react
 */
import React, { useEffect, useState } from "react";

/**
 * Check if window exists
 * @returns boolean
 */
function canUseWindow() {
    return typeof window !== "undefined";
}

export function useWindow(
    effect?: React.EffectCallback,
    deps: React.DependencyList = [],
) {
    const isClient = canUseWindow();
    const [hasWindow] = useState(isClient);

    useEffect(() => {
        if (effect && hasWindow) {
            effect();
        }
    }, deps);

    return hasWindow;
}

interface WindowSize {
    height?: number;
    width?: number;
}

export function useWindowSize(defaults: WindowSize = {}) {
    const isClient = canUseWindow();

    function getSize() {
        return isClient
            ? {
                  height: window.innerHeight,
                  width: window.innerWidth,
              }
            : defaults;
    }

    const [windowSize, setWindowSize] = useState(getSize);

    useWindow(() => {
        function handleResize() {
            setWindowSize(getSize());
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    });
    return windowSize;
}
