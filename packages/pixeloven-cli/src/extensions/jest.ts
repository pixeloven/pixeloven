import { JestExtension, PixelOvenRunContext } from "../types";

export default (context: PixelOvenRunContext) => {
    const jest: JestExtension = async (args: string[] = []) => {
        const { pixelOven } = context;
        const fileName = "jest.json";
        const configPath = pixelOven.getConfigPath(fileName);
        const cmd = ["jest"].concat(args);
        if (configPath) {
            return pixelOven.run(cmd.concat([
                "--config",
                configPath,
                "--env=jsdom"
            ]));
        }
        return pixelOven.run(cmd.concat([
            "--env=jsdom"
        ]));
    };
    context.jest = jest;
};
