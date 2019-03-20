import { GluegunParameters } from "gluegun";

type ArgType = "default" | "withOptions";

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
    index = 0,
    type: ArgType = "default",
) {
    const args =
        parameters.array && parameters.array.length
            ? parameters.array.slice(index)
            : [];
    if (
        type === "withOptions" &&
        Array.isArray(parameters.raw) &&
        parameters.raw.length
    ) {
        const rawIndex = args.length
            ? parameters.raw.indexOf(args[0])
            : parameters.raw.indexOf(cmd);
        return parameters.raw.slice(rawIndex);
    }
    return args;
}

export default getArgList;
