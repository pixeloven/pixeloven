import { AddonGhPagesRunContext } from "../types";

export default {
    name: "gh-pages",
    run: async (context: AddonGhPagesRunContext) => {
        const { parameters, pixelOven, ghPages } = context;
        const argList =
            parameters.array && parameters.array.length
                ? parameters.array.slice(1)
                : [];
        switch (parameters.first) {
            case "build": {
                const results = await ghPages(argList);
                pixelOven.exit(
                    "Github Pages",
                    results.status,
                    `Success! Opening doc-ing bay. :)\n`,
                );
                break;
            }
            default: {
                pixelOven.invalidArgument();
                break;
            }
        }
    },
};
