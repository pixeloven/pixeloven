import { PixelOvenRunContext } from "../types";

export type JestExtension = (args?: string[]) => Promise<number>;

export default (context: PixelOvenRunContext) => {
    const jest = async (args: string[] = []) => {
        const { pixeloven, print } = context;
        const fileName = "jest.json";
        const configPath = pixeloven.getConfigPath(fileName);
        if (configPath) {
            print.info(`Configuration file found ${configPath}`);
            return pixeloven.runBin(
                "jest",
                [
                    "--maxWorkers",
                    "2",
                    "--env",
                    "jsdom",
                    "--config",
                    configPath,
                ].concat(args),
            );
        } else {
            print.warning(
                `Unable to find "${fileName}" reverting to default configuration`,
            );
            return pixeloven.runBin(
                "jest",
                ["--maxWorkers", "2", "--env", "jsdom"].concat(args),
            );
        }
    };
    context.jest = jest;
};
