import { PixelOvenRunContext, TypeDocExtension } from "../types";

export default (context: PixelOvenRunContext) => {
    const { pixelOven } = context;

    const typeDoc: TypeDocExtension = async (args: string[] = []) => {
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
