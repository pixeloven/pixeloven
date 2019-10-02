/**
 * Cleanup and merge options
 * @param defaults
 * @param options
 */
export function mergeOptions<T>(defaults: T, options: Partial<T>): T {
    Object.keys(options).forEach(key => {
        if (options[key] === undefined) {
            delete options[key];
        }
    });
    return {
        ...defaults,
        ...options,
    };
}
