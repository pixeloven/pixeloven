import fs from "fs";
import { build, filesystem } from "gluegun";

/**
 * Run CLI
 * @param argv
 */
async function main(proc: NodeJS.Process) {
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
    const cwdPath = filesystem.path(proc.cwd(), "./node_modules", "@pixeloven");
    const cwdPathPlugins = filesystem.subdirectories(cwdPath);
    addPlugins(cwdPathPlugins);

    /**
     * Get plugins in the script path
     * @todo what if this and the above are the same? Need a better way to handle lerna cases.
     */
    const scriptPath = filesystem.path(
        __dirname,
        "../../../", // Back out of cli/dist/lib
    );
    const scriptPathPlugins = filesystem.subdirectories(scriptPath);
    addPlugins(scriptPathPlugins);

    /**
     * Create CLI and return context
     */
    const cli = builder
        .version()
        .help()
        .create();
    const context = await cli.run(proc.argv);
    return context;
}

export default main;
