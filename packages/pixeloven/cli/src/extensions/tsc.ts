import { PixelOvenToolbox, TscExtension } from "../types";

/**
 * @todo Import ts instead of calling bin?
 */
export default (toolbox: PixelOvenToolbox) => {
    const tsc: TscExtension = async (args: string[] = []) => {
        const { pixelOven } = toolbox;
        const fileName = "tsconfig.json";
        const configPath = pixelOven.getConfigPath(fileName);
        if (configPath) {
            return pixelOven.run(
                ["tsc", "--pretty", "--project", configPath].concat(args),
            );
        }
        return pixelOven.run(["tsc", "--pretty"].concat(args));
    };
    toolbox.tsc = tsc;
};
