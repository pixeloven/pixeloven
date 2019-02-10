import { PixelOvenRunContext } from "../types";

export type StyleLintExtension = (args?: string[]) => Promise<number>;

export default (context: PixelOvenRunContext) => {
    const stylelint = async (args: string[] = []) => {
        const { pixeloven, print } = context;
        const fileName = "stylelint.json";
        const configPath = pixeloven.getConfigPath(fileName);
        if (configPath) {
            print.info(`Configuration file found ${configPath}`);
            return pixeloven.runBin(
                "stylelint",
                ["--syntax", "scss", "--config", configPath].concat(args),
            );
        } else {
            print.warning(
                `Unable to find "${fileName}" reverting to default configuration`,
            );
            return pixeloven.runBin(
                "stylelint",
                ["--syntax", "scss"].concat(args),
            );
        }
    };
    context.styleLint = stylelint;
};
