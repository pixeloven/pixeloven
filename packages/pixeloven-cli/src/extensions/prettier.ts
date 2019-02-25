import { PixelOvenRunContext, PrettierExtension } from "../types";

export default (context: PixelOvenRunContext) => {
    const { pixelOven } = context;

    const prettier: PrettierExtension = async (args: string[] = []) => {
        const fileName = "prettier.json";
        const configPath = pixelOven.getConfigPath(fileName);
        if (configPath) {
            return pixelOven.run(
                ["prettier", "--write", "--config", configPath].concat(args),
            );
        }
        return pixelOven.run(["prettier", "--write"].concat(args));
    };
    context.prettier = prettier;
};
