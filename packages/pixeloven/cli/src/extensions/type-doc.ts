import { resolvePath } from "@pixeloven-core/filesystem";
import { PixelOvenToolbox, TypeDocExtension } from "../types";

const typeDocFileName = "typedoc.json";
const tsconfigFileName = "tsconfig.json";

export default (context: PixelOvenToolbox) => {
    const typeDoc: TypeDocExtension = async (args: string[] = []) => {
        const { print, pixelOven } = context;
        const typeDocConfigPath = resolvePath(typeDocFileName, false);
        const tsconfigConfigPath = resolvePath(tsconfigFileName, false);
        if (typeDocConfigPath && tsconfigConfigPath) {
            return pixelOven.run(
                [
                    "typedoc",
                    "--options",
                    typeDocConfigPath,
                    "--tsconfig",
                    tsconfigConfigPath,
                ].concat(args),
            );
        }
        print.warning(
            `Unable to find either "${typeDocConfigPath}" or "${tsconfigConfigPath}" reverting to default configuration`,
        );
        return pixelOven.run(["typedoc"].concat(args));
    };
    context.typeDoc = typeDoc;
};
