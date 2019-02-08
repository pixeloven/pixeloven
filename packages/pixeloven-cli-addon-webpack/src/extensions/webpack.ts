import { AddonWebpackRunContext } from "../types";

export type WebpackExtension = (args?: string[]) => Promise<number>;

export default (context: AddonWebpackRunContext) => {
    const webpack = async (args: string[] = []) => {
        return 0;
    };
    context.webpack = webpack;
};
