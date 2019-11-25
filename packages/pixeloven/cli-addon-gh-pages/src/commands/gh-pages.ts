import { AddonGhPagesToolbox } from "../types";

export default {
    name: "gh-pages",
    run: async (context: AddonGhPagesToolbox) => {
        const { parameters, print, pixelOven, ghPages } = context;
        const { path } = parameters.options;
        switch (parameters.first) {
            case "build": {
                const statusCode = await ghPages(path);
                if (statusCode) {
                    print.error("failed to deploy");
                    pixelOven.exit("Github Pages", statusCode);
                } else {
                    pixelOven.exit(
                        "Github Pages",
                        0,
                        `Success! Opening doc-ing bay. :)\n`,
                    );
                }
                break;
            }
            default: {
                pixelOven.invalidArgument();
                break;
            }
        }
    },
};
