/**
 * Cleanup and merge options
 * @todo Should generalize
 * @param defaults
 * @param options
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

type DefinedObjKeys<T> = ({ [P in keyof T]: T[P] extends undefined ? never : P })[keyof T];
type NonEmptyObject<T, P extends DefinedObjKeys<T> = DefinedObjKeys<T>> = { [PP in P]: T[PP] };

function removeEmpty<T>(input: Array<T | undefined>): T[];
function removeEmpty<T>(input: { [P in keyof T]: T[P] }): NonEmptyObject<T>;
function removeEmpty<T>(input: Array<T | undefined> | { [P in keyof T]: T[P] }) {
    if (Array.isArray(input)) {
        return input.filter((item) => !!item);
    }
    return Object.keys(input)
        .filter(key => !!input[key])
        .reduce((res, key) => Object.assign(res, { [key]: input[key] }), {} );
}

export {
    mergeOptions,
    removeEmpty
}