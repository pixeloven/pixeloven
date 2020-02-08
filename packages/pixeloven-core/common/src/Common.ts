/**
 * Get object keys
 * @param object
 * @param type
 *
 * @todo Make this more flexible so it can filter by 0,1, many
 */
function getKeys<T>(object: T, type = "number") {
    return Object.keys(object).filter(key => typeof object[key] === type);
}

/**
 * Cleanup and merge options
 * @param defaults
 * @param options
 *
 * @todo Should generalize and all any number of arguments
 */
function mergeOptions<T>(defaults: T, options: Partial<T>): T {
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

type DefinedObjKeys<T> = {
    [P in keyof T]: T[P] extends undefined ? never : P;
}[keyof T];
type NonEmptyObject<T, P extends DefinedObjKeys<T> = DefinedObjKeys<T>> = {
    [PP in P]: T[PP];
};

function removeEmpty<T>(input: Array<T | undefined>): T[];
function removeEmpty<T>(input: { [P in keyof T]: T[P] }): NonEmptyObject<T>;
function removeEmpty<T>(
    input: Array<T | undefined> | { [P in keyof T]: T[P] },
) {
    if (Array.isArray(input)) {
        return input.filter(item => !!item);
    }
    return Object.keys(input)
        .filter(key => !!input[key])
        .reduce((res, key) => Object.assign(res, { [key]: input[key] }), {});
}

export { getKeys, mergeOptions, removeEmpty };
