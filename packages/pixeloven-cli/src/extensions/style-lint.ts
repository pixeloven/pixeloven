import { PixelOvenRunContext } from "../types";

export type StyleLintExtension = (args?: string[]) => Promise<object>;

export default (context: PixelOvenRunContext) => {
    const stylelint = async (args: string[] = []) => {
        const { pixeloven, print } = context;
        const fileName = "stylelint.json";
        const configPath = pixeloven.getConfigPath(fileName);
        if (configPath) {
            return pixeloven.run(["stylelint", "--syntax", "scss", "--config", configPath].concat(args));
        } else {
            print.warning(
                `Unable to find "${fileName}" reverting to default configuration`,
            );
            return pixeloven.run(["stylelint", "--syntax", "scss"].concat(args));
        }
    };
    context.styleLint = stylelint;
};
