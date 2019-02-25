import { PixelOvenRunContext } from "../types";

export type TscExtension = (args?: string[]) => Promise<object>;

export default (context: PixelOvenRunContext) => {
    const tsc = async (args: string[] = []) => {
        const { pixeloven, print } = context;
        const fileName = "tsconfig.json";
        const configPath = pixeloven.getConfigPath(fileName);
        if (configPath) {
            print.info(`Configuration file found ${configPath}`);
            return pixeloven.run(["tsc", "--pretty", "--project", configPath].concat(args));
        } else {
            print.warning(
                `Unable to find "${fileName}" reverting to default configuration`,
            );
            return pixeloven.run(["tsc", "--pretty"].concat(args));
        }
    };
    context.tsc = tsc;
};
