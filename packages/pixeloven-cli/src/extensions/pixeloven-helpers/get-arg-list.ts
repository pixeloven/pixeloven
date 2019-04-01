import { GluegunParameters } from "gluegun";

interface GetArgListOptions {
    offset: number,
    type: "default" | "withOptions"
}

/**
 * Returns an arg list
 * @description Returns an arg list from the paramaters provided to the CLI.
 * If type eq "default"
 *      Then: pixeloven cmd arg --option would return ["arg"]
 * If type eq "withOptions"
 *      Then: pixeloven cmd arg --option would return ["arg", "--option"]
 *
 * @param cmd
 * @param parameters
 * @param index
 * @param type
 */
function getArgList(
    cmd: string,
    parameters: GluegunParameters,
    options: GetArgListOptions = {
        offset: 0,
        type: "default"
    }
) {
    const getArgs = () => {
        if (parameters.array && parameters.array.length) {
            const argIndex = parameters.array.indexOf(cmd) + options.offset;
            return parameters.array.slice(argIndex);
        }
        return [];
    }
    const getArgsWithOptions = () => {
        if (
            Array.isArray(parameters.raw) &&
            parameters.raw.length
        ) {
            const rawIndex = parameters.raw.indexOf(cmd) + options.offset;
            return parameters.raw.slice(rawIndex);
        }
        return [];
    }
    switch (options.type) {
        case "withOptions": {
            return getArgsWithOptions()
        }
        default: {
            return getArgs()
        }
    }
}

export default getArgList;
