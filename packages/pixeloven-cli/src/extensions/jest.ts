import { JestExtension, PixelOvenToolbox } from "../types";

/**
 * @todo Need to restructure these to make them more testable
 * @todo we should also use jest directly instead of running in another process
 */
export default (context: PixelOvenToolbox) => {
    const jest: JestExtension = async (args: string[] = []) => {
        const { pixelOven } = context;
        const fileName = "jest.json";
        const configPath = pixelOven.getConfigPath(fileName);
        const cmd = ["jest"];
        if (configPath) {
            return pixelOven.run(
                cmd
                    .concat(["--config", configPath])
                    .concat(args),
            );
        }
        return pixelOven.run(cmd.concat(args));
    };
    context.jest = jest;
};
