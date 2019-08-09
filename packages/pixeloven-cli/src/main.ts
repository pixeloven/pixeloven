import fs from "fs";
import { build, filesystem } from "gluegun";

/**
 * Run CLI
 * @param argv
 */
async function main(argv: string[]) {
    /**
     * Create CLI builder
     */
    const builder = build()
        .brand("pixeloven")
        .src(__dirname);

    /**
     * Add plugins
     * @param plugins
     */
    function addPlugins(plugins: string[]) {
        plugins.forEach(plugin => {
            if (plugin.includes("cli-addon")) {
                builder.plugin(
                    filesystem.path(fs.realpathSync(plugin), "./dist/lib"),
                );
            }
        });
    }

    /**
     * Get plugins in the callers path
     */
    const callingPath = filesystem.path(
        process.cwd(),
        "./node_modules",
        "@pixeloven",
    );
    const callingPathPlugins = filesystem.subdirectories(callingPath);
    addPlugins(callingPathPlugins);

    /**
     * Get plugins in the script path
     */
    const scriptPath = filesystem.path(
        __dirname,
        "../../", // Back out of dist/lib
        "./node_modules",
        "@pixeloven",
    );
    const scriptPathPlugins = filesystem.subdirectories(scriptPath);
    addPlugins(scriptPathPlugins);

    /**
     * Create CLI and return context
     */
    const cli = builder.version().create();
    const context = await cli.run(argv);
    return context;
}

export default main;
