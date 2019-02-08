import { PixelOvenRunContext } from "../types";

export type TypeDocExtension = (args?: string[]) => Promise<number>;

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
            return pixeloven.runBin(
                "typedoc",
                [
                    "--options",
                    typedocConfigPath,
                    "--tsconfig",
                    tsconfigConfigPath,
                ].concat(args),
            );
        } else {
            return pixeloven.runBin("typedoc", args);
        }
    };
    context.typeDoc = typeDoc;
};
