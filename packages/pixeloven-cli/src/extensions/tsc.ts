import { PixelOvenRunContext, TscExtension } from "../types";

export default (context: PixelOvenRunContext) => {
    const tsc: TscExtension = async (args: string[] = []) => {
        const { pixelOven } = context;
        const fileName = "tsconfig.json";
        const configPath = pixelOven.getConfigPath(fileName);
        if (configPath) {
            return pixelOven.run(
                ["tsc", "--pretty", "--project", configPath].concat(args),
            );
        }
        return pixelOven.run(["tsc", "--pretty"].concat(args));
    };
    context.tsc = tsc;
};
