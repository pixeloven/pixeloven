import { PixelOvenToolbox, TypeDocExtension } from "../types";

export default (context: PixelOvenToolbox) => {
    const typeDoc: TypeDocExtension = async (args: string[] = []) => {
        const { pixelOven } = context;
        const typeDocFileName = "typedoc.json";
        const tsconfigFileName = "tsconfig.json";
        const typeDocConfigPath = pixelOven.getConfigPath(typeDocFileName);
        const tsconfigConfigPath = pixelOven.getConfigPath(tsconfigFileName);
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
        return pixelOven.run(["typedoc"].concat(args));
    };
    context.typeDoc = typeDoc;
};
