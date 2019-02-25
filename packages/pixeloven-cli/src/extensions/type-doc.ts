import { PixelOvenRunContext } from "../types";

export type TypeDocExtension = (args?: string[]) => Promise<object>;

export default (context: PixelOvenRunContext) => {
    const typeDoc = async (args: string[] = []) => {
        const { pixeloven, print } = context;
        const typedocFileName = "typedoc.json";
        const tsconfigFileName = "tsconfig.json";
        const typedocConfigPath = pixeloven.getConfigPath(typedocFileName);
        if (typedocConfigPath) {
            print.info(`Configuration file found ${typedocConfigPath}`);
        } else {
            print.warning(
                `Unable to find "${typedocFileName}" reverting to default configuration`,
            );
        }
        const tsconfigConfigPath = pixeloven.getConfigPath(tsconfigFileName);
        if (tsconfigConfigPath) {
            print.info(`Configuration file found ${tsconfigConfigPath}`);
        } else {
            print.warning(
                `Unable to find "${tsconfigConfigPath}" reverting to default configuration`,
            );
        }
        if (typedocConfigPath && tsconfigConfigPath) {
            return pixeloven.run(
                [
                    "typedoc",
                    "--options",
                    typedocConfigPath,
                    "--tsconfig",
                    tsconfigConfigPath,
                ].concat(args),
            );
        } else {
            return pixeloven.run(["typedoc"].concat(args));
        }
    };
    context.typeDoc = typeDoc;
};
