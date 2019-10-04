import { JestExtension, PixelOvenToolbox } from "../types";

/**
 * @todo Can we import and use jest as a library instead of running it's CLI?
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
