import fs from "fs";
import { build, filesystem } from "gluegun";

async function main(argv: string[]) {
    const pixelOvenPath = filesystem.path(
        process.cwd(),
        "./node_modules",
        "@pixeloven",
    );
    const plugins = filesystem.subdirectories(pixelOvenPath);
    const builder = build()
        .brand("pixeloven")
        .src(__dirname);
    /**
     * Adding plugins
     * @description We need to do it this way because we might have a sym link in our path.
     */
    plugins.forEach(plugin => {
        builder.plugin(filesystem.path(fs.realpathSync(plugin), "./dist/lib"));
    });
    const cli = builder.version().create();

    const context = await cli.run(argv);
    return context;
}

export default main;
