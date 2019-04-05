import { JestExtension, PixelOvenRunContext } from "../types";

/**
 * @todo Need to restructure these to make them more testable
 */
export default (context: PixelOvenRunContext) => {
    const jest: JestExtension = async (args: string[] = []) => {
        const { pixelOven } = context;
        const fileName = "jest.json";
        const configPath = pixelOven.getConfigPath(fileName);
        const cmd = ["jest"];
        if (configPath) {
            return pixelOven.run(
                cmd
                    .concat(["--config", configPath, "--env=jsdom"])
                    .concat(args),
            );
        }
        return pixelOven.run(cmd.concat(["--env=jsdom"]).concat(args));
    };
    context.jest = jest;
};
