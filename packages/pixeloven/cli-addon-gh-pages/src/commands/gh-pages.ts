import { AddonGhPagesToolbox } from "../types";

export default {
    description: "GitHub publishing addon",
    name: "gh-pages",
    run: async (context: AddonGhPagesToolbox) => {
        let statusCode = 0;
        const { parameters, print, ghPages } = context;
        const { path } = parameters.options;
        switch (parameters.first) {
            case "build": {
                statusCode = await ghPages(path);
                if (statusCode) {
                    print.error("Failed to deploy");
                    statusCode = 1;
                } else {
                    print.success(`Success! Opening doc-ing bay. :)\n`);
                }
                break;
            }
            default: {
                print.error(`Invalid argument provided`);
                statusCode = 1;
                break;
            }
        }
        process.exit(statusCode);
    },
};
